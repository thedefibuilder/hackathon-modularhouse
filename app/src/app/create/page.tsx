"use client";

import React from "react";

import { createSchema, type TCreateSchema } from "@/lib/schemas";

import { zodResolver } from "@hookform/resolvers/zod";

import { EFeatureName, getFeatureConfig } from "@/lib/features";
import FeaturesSelect from "@/components/features-select";
import { useForm } from "react-hook-form";

export default function Create() {
  const form = useForm<TCreateSchema>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      features: new Set([EFeatureName.ERC20_BASE]),
    },
  });
  const activeFeatures = form.watch("features");

  const toggleFeature = (featureName: EFeatureName) => {
    const feature = getFeatureConfig(featureName);
    if (!feature) return;

    const featureSetCopy = new Set(activeFeatures);
    if (activeFeatures.has(featureName)) {
      featureSetCopy.delete(featureName);
      feature.exclusiveSet?.forEach((f) => featureSetCopy.delete(f));
    } else {
      featureSetCopy.add(featureName);
      feature.exclusiveSet?.forEach((f) => featureSetCopy.delete(f));
      feature.inclusiveSet?.forEach((f) => featureSetCopy.add(f));
    }

    form.setValue("features", featureSetCopy);
  };

  return (
    <main className="mt-20 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <FeaturesSelect
        activeFeatures={[...activeFeatures]}
        toggleFeature={toggleFeature}
      />
    </main>
  );
}
