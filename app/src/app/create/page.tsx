"use client";
import React, { useState } from "react";

import { EFeatureName } from "@/lib/features";
import FeaturesSelect from "@/components/features-select";

export default function Create() {
  const [activeFeatures, setActiveFeatures] = useState<EFeatureName[]>([
    EFeatureName.ERC20_BASE,
  ]);

  const toggleFeature = (featureName: EFeatureName) => {
    setActiveFeatures((prev) => {
      if (prev.includes(featureName)) {
        return prev.filter((name) => name !== featureName);
      }
      return [...prev, featureName];
    });
  };

  return (
    <main className="mt-20 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <FeaturesSelect
        activeFeatures={activeFeatures}
        toggleFeature={toggleFeature}
      />
    </main>
  );
}
