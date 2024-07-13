import React from "react";

import type {
  Control,
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodErrors } from "@/lib/errors/zod-errors";

type TControlledFormFileInput<TFormSchema extends FieldValues> = {
  control: Control<TFormSchema>;
  name: Path<TFormSchema>;
  label: string;
  accept?: string;
  maxSize?: number;
  setValue: UseFormSetValue<TFormSchema>;
  setError: UseFormSetError<TFormSchema>;
  clearErrors: UseFormClearErrors<TFormSchema>;
};

export default function ControlledFormFileInput<
  TFormSchema extends FieldValues,
>({
  control,
  name,
  label,
  accept,
  maxSize = 1_000_000, // 1MB
  setValue,
  setError,
  clearErrors,
}: TControlledFormFileInput<TFormSchema>) {
  function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      clearErrors(name);

      console.log("FILE TYPE", file.type);
      console.log(accept);
      if (!accept?.includes(file.type)) {
        setError(name, { type: "custom", message: zodErrors.file.invalid });
        return;
      }

      if (file.size >= maxSize) {
        setError(name, { type: "custom", message: zodErrors.file.maxSize(5) });
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const fileAsBase64 = reader.result?.toString();

        if (fileAsBase64) {
          // @ts-expect-error NON SENSE TS ERROR
          setValue(name, fileAsBase64, { shouldValidate: true });
        }
      };
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="py-3">
          <div className="flex items-center gap-x-1">
            <FormLabel className="text-xl">{label}</FormLabel>
          </div>
          <div className="h-1" />
          <FormControl>
            <Input
              type="file"
              className="cursor-pointer placeholder:italic"
              accept={accept}
              onChange={onUpload}
            />
          </FormControl>
          <FormMessage className="leading-none" />
        </FormItem>
      )}
    />
  );
}
