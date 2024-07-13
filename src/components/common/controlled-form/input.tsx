import React from "react";

import type { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type TControlledFormInput<TFormSchema extends FieldValues> = {
  control: Control<TFormSchema>;
  name: Path<TFormSchema>;
  label: string;
  placeholder: string;
};

export default function ControlledFormInput<TFormSchema extends FieldValues>({
  name,
  label,
  placeholder,
  control,
}: TControlledFormInput<TFormSchema>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="py-3">
          <div className="flex items-center gap-x-1">
            <FormLabel className="text-xl">{label}</FormLabel>
          </div>
          <div className="h-1" />
          <FormControl>
            <Input
              placeholder={placeholder}
              className="placeholder:italic"
              {...field}
            />
          </FormControl>
          <FormMessage className="leading-none" />
        </FormItem>
      )}
    />
  );
}
