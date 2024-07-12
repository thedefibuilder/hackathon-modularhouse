"use client";

import React from "react";

import { createSchema, type TCreateSchema } from "@/lib/schemas";

import { zodResolver } from "@hookform/resolvers/zod";

import { EFeatureName, getFeatureConfig } from "@/lib/features";
import FeaturesSelect from "@/components/features-select";
import { FormProvider, useForm } from "react-hook-form";
import { Step, Stepper } from "@/components/stepper";
import { createRoutes, ECreateRoutes } from "@/lib/routes";
import { Container } from "@/components/common/grid";
import CustomizeForm from "@/components/customize-form";
import DeployForm from "@/components/deploy-form";
import Review from "@/components/review";

export default function Create() {
  const [isCreating, setIsCreating] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
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

  async function triggerCreate() {
    setIsCreating(true);
    console.log("CREATING");
    const formValues = form.getValues();
    console.log(formValues);

    // deploy
    // add to db

    setIsCreating(false);
  }

  return (
    <Container variant="fluid">
      <div className="h-10" />
      <FormProvider {...form}>
        <Stepper
          initialStep={0}
          steps={createRoutes}
          onClickStep={async (step, setStep) => {
            const isMovingForward = step > currentStep;

            if (isMovingForward) {
              let isValid = false;
              switch (currentStep) {
                case 0:
                  isValid = await form.trigger("customizeArgs");
                  break;
                case 1:
                  isValid = await form.trigger("features");
                  break;
                case 2:
                  isValid = await form.trigger("deployArgs");
                  break;
                default:
                  return;
              }

              if (!isValid || step > currentStep + 1) {
                return;
              }
            }

            setCurrentStep(step);
            setStep(step);
          }}
        >
          {createRoutes.map((stepProps, index) => (
            <Step key={stepProps.name} index={index} {...stepProps}>
              <div className="h-10" />
              <div className="flex h-screen flex-col items-center">
                {stepProps.name === ECreateRoutes.Customize && (
                  <CustomizeForm form={form} />
                )}

                {stepProps.name === ECreateRoutes.Features && (
                  <FeaturesSelect
                    activeFeatures={[...activeFeatures]}
                    toggleFeature={toggleFeature}
                  />
                )}

                {stepProps.name === ECreateRoutes.Deploy && (
                  <DeployForm form={form} activeFeatures={activeFeatures} />
                )}

                {stepProps.name === ECreateRoutes.Review && (
                  <Review
                    form={form}
                    triggerCreate={triggerCreate}
                    isCreating={isCreating}
                  />
                )}
              </div>
            </Step>
          ))}
        </Stepper>
      </FormProvider>
    </Container>
  );
}
