"use client";

import React from "react";

import { createSchema, type TCreateSchema } from "@/lib/schemas";

import { zodResolver } from "@hookform/resolvers/zod";

import { EFeatureName, getFeatureConfig } from "@/lib/features";
import FeaturesSelect from "@/components/features-select";
import { useForm } from "react-hook-form";
import { Step, Stepper, useStepper } from "@/components/stepper";
import { createRoutes, ECreateRoutes } from "@/lib/routes";
import { Container } from "@/components/common/grid";
import { Button } from "@/components/ui/button";

export default function Create() {
  const { nextStep } = useStepper();
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
    <Container variant="fluid">
      <div className="h-10" />

      <Stepper initialStep={0} steps={createRoutes}>
        {createRoutes.map((stepProps, index) => (
          <Step key={stepProps.name} index={index} {...stepProps}>
            <div className="h-10" />
            <div className="flex h-screen flex-col items-center justify-center space-y-5">
              {stepProps.name === ECreateRoutes.Customize && (
                <div>Customize</div>
              )}

              {stepProps.name === ECreateRoutes.Features && (
                <FeaturesSelect
                  activeFeatures={[...activeFeatures]}
                  toggleFeature={toggleFeature}
                />
              )}

              {stepProps.name === ECreateRoutes.Deploy && <div>Deploy</div>}

              {stepProps.name === ECreateRoutes.Review && <div>Review</div>}

              {stepProps.name !== ECreateRoutes.Review && (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              )}
            </div>
          </Step>
        ))}
      </Stepper>
    </Container>
  );
}
