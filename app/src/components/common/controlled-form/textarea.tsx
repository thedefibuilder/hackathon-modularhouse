import React from "react";

import type { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type TControlledFormTextarea<TFormSchema extends FieldValues> = {
  control: Control<TFormSchema>;
  name: Path<TFormSchema>;
  label: string;
  placeholder: string;
};

export default function ControlledFormTextarea<
  TFormSchema extends FieldValues,
>({ name, label, placeholder, control }: TControlledFormTextarea<TFormSchema>) {
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
            <Textarea
              placeholder={placeholder}
              className="max-h-80 placeholder:italic"
              {...field}
            />
          </FormControl>
          <FormMessage className="leading-none" />
        </FormItem>
      )}
    />
  );
}
