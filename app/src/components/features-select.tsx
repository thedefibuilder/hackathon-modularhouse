import React from "react";

import type { EFeatureName } from "@/lib/features";

import { CircleCheckBig } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { features } from "@/lib/features";
import { cn } from "@/lib/utils";

type TFeaturesSelectProps = {
  activeFeatures: EFeatureName[];
  toggleFeature: (featureName: EFeatureName) => void;
};

export default function FeaturesSelect({
  activeFeatures,
  toggleFeature,
}: TFeaturesSelectProps) {
  const isFeatureActive = (featureName: EFeatureName) =>
    activeFeatures.includes(featureName);

  return (
    <div className="rounded-[16px] border border-border p-4">
      <h2 className="pl-2 text-2xl font-bold">Token Features</h2>
      <div className="h-6" />
      <ul className="flex flex-wrap gap-5">
        {features.map((feature) => (
          <li
            key={feature.name}
            className={cn(
              "min-w-1/2 flex flex-[1_0_calc(31.333%-10px)] flex-col items-start gap-y-2.5 whitespace-normal rounded-3xl border-2 px-6 py-2.5",
              {
                "border-card-foreground bg-card": isFeatureActive(feature.name),
              },
            )}
          >
            <div className="h-2" />
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex gap-3">
                <feature.icon
                  className={cn([
                    "h-7 w-7 shrink-0",
                    isFeatureActive(feature.name) && "text-accent-foreground",
                  ])}
                />
                <span className="text-lg font-medium">{feature.name}</span>
              </div>
              <div className="flex items-center gap-4 md:flex-col">
                <Switch
                  id={feature.name}
                  checked={isFeatureActive(feature.name)}
                  onClick={() => toggleFeature(feature.name)}
                  className={cn([
                    "data-[state=checked]:bg-accent-foreground lg:bg-primary lg:hover:border-card-foreground lg:hover:bg-card",
                    "md:order-0 order-1",
                  ])}
                />
              </div>
            </div>
            <div className="h-1" />
            <span className="min-h-10 text-left text-sm text-muted-foreground">
              {feature.description}
            </span>
            {feature.required && (
              <span
                className={cn([
                  "flex items-center gap-2 rounded border border-border px-2 py-1",
                  isFeatureActive(feature.name)
                    ? "bg-card-foreground"
                    : "bg-card",
                ])}
              >
                <CircleCheckBig className="h-4 w-4" />
                <p>Required</p>
              </span>
            )}
            <div className="h-2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
