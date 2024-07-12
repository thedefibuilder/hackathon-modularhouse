import React from "react";

import type { createSchema } from "@/lib/schemas";
import type { useForm } from "react-hook-form";
import type { z } from "zod";
import ControlledFormInput from "./common/controlled-form/input";

type TCustomizeFormProps = {
  form: ReturnType<typeof useForm<z.infer<typeof createSchema>>>;
};

export default function CustomizeForm({ form }: TCustomizeFormProps) {
  return (
    <div>
      <ControlledFormInput
        control={form.control}
        label="Name"
        name="customizeArgs.name"
        placeholder="Enter the name of your token"
      />

      <ControlledFormInput
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
