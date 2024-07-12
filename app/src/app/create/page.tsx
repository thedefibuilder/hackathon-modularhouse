"use client";

import React, { useEffect } from "react";

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
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function Create() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
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

  useEffect(() => {
    if (!address && openConnectModal) {
      openConnectModal();
    }
  }, [address]);

  const createMutation = api.token.create.useMutation();
  async function triggerCreate() {
    if (!address) return;
    const formValues = form.getValues();

    await createMutation.mutateAsync({
      features: formValues.features,
      customizeArgs: formValues.customizeArgs,
      tokenAddress: "0x33666285a3305F1CE2AF4A11A5A22516Ae116A89",
      userWalletAddress: address,
    });
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

            if (createMutation.isPending) return;

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

              if (!isValid || step > currentStep + 1) return;
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
                    isCreating={createMutation.isPending}
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
