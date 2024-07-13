import React from "react";

import type { createSchema } from "@/lib/schemas";
import type { useForm } from "react-hook-form";
import type { z } from "zod";
import ControlledFormInput from "./common/controlled-form/input";
import ControlledFormTextarea from "./common/controlled-form/textarea";
import ControlledFormFileInput from "./common/controlled-form/file";

type TCustomizeFormProps = {
  form: ReturnType<typeof useForm<z.infer<typeof createSchema>>>;
};

export default function CustomizeForm({ form }: TCustomizeFormProps) {
  return (
    <div className="w-2/3">
      <ControlledFormFileInput
        control={form.control}
        label="Logo"
        name="customizeArgs.logo"
        accept="image/jpeg"
        setValue={form.setValue}
        setError={form.setError}
        clearErrors={form.clearErrors}
      />

      <ControlledFormTextarea
        control={form.control}
        label="Description"
        name="customizeArgs.description"
        placeholder="Enter the description of your token"
      />

      <ControlledFormInput
        control={form.control}
        label="X"
        name="customizeArgs.twitterUrl"
        placeholder="https://x.com/oogabooga"
      />

      <ControlledFormInput
        control={form.control}
        label="Telegram"
        name="customizeArgs.telegramUrl"
        placeholder="https://t.me/oogabooga"
      />

      <ControlledFormInput
        control={form.control}
        label="Discord"
        name="customizeArgs.discordUrl"
        placeholder="https://discord.com/invite/oogabooga"
      />

      <ControlledFormInput
        control={form.control}
        label="Website"
        name="customizeArgs.websiteUrl"
        placeholder="https://oogabooga.com"
      />
    </div>
  );
}
