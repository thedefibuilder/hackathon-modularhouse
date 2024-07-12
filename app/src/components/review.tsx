import React from "react";

import type { createSchema } from "@/lib/schemas";
import type { useForm } from "react-hook-form";
import type { z } from "zod";
import { ReviewSection } from "./review-section";
import ButtonSpinner from "./common/button-spinner";

type TReviewProps = {
  form: ReturnType<typeof useForm<z.infer<typeof createSchema>>>;
  triggerCreate: () => void;
  isCreating: boolean;
};

export default function Review({
  form,
  triggerCreate,
  isCreating,
}: TReviewProps) {
  const formValues = form.getValues();

  const reviewSections = [
    {
      title: "Customize",
      values: formValues.customizeArgs,
    },
    {
      title: "Features",
      values: { features: [...formValues.features] },
    },
    {
      title: "Deploy",
      values: formValues.deployArgs,
    },
  ];

  return (
    <div className="w-2/3">
      {reviewSections.map((section) => (
        <ReviewSection
          key={JSON.stringify(section.values)}
          title={section.title}
          keyValuePair={section.values}
        />
      ))}
      <div className="h-8" />

      <ButtonSpinner
        onClick={triggerCreate}
        className="mb-8 h-14 w-full bg-purple-500 text-xl"
        isLoading={isCreating}
        defaultContent="Confirm"
        loadingContent="Creating..."
        isDisabled={!form.formState.isValid}
      />
    </div>
  );
}
