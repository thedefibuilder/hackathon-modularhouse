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
import type { Hex } from "viem";
import useDeployContract from "@/lib/hooks/use-deploy-contract";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

export default function Create() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = React.useState(0);
  const { address } = useAccount();
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

  const createMutation = api.token.create.useMutation();
  const fetchArtifactsMutation = api.token.getArtifacts.useMutation();

  async function triggerCreate() {
    await fetchArtifactsMutation.mutateAsync(form.getValues("features"));
  }

  const {
    deployContract,
    isLoading: isDeployLoading,
    response: deployResponse,
  } = useDeployContract();

  useEffect(() => {
    if (fetchArtifactsMutation.data) {
      const deployFormValues = form.getValues("deployArgs");
      const erc20DeployArgs = [
        deployFormValues.ownableArgs?.initialOwner,
        deployFormValues.baseParams.name,
        deployFormValues.baseParams.symbol,
        deployFormValues.premintArgs?.premintAmount,
        deployFormValues.cappedArgs?.cap,
      ].filter((arg) => arg !== undefined);

      void deployContract({
        abi: fetchArtifactsMutation.data.abi,
        bytecode: fetchArtifactsMutation.data.bytecode as Hex,
        args: erc20DeployArgs,
      });
    }
  }, [fetchArtifactsMutation.data]);

  useEffect(() => {
    if (deployResponse && address) {
      const formValues = form.getValues();

      createMutation.mutate({
        name: formValues.deployArgs.baseParams.name,
        symbol: formValues.deployArgs.baseParams.symbol,
        features: formValues.features,
        customizeArgs: formValues.customizeArgs,
        tokenAddress: deployResponse.address,
        userWalletAddress: address,
      });
    }
  }, [deployResponse, address]);

  useEffect(() => {
    switch (createMutation.status) {
      case "success":
        toast({
          title: "Token created",
          description: "Your token has been created successfully",
        });
        redirect(`/`);
      case "error":
        toast({
          title: "Error creating token",
          description: "An error occurred while creating the token",
          variant: "destructive",
        });
        break;
      default:
        return;
    }
  }, [createMutation.status]);

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
              <div className="flex flex-col items-center">
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
                    isCreating={
                      createMutation.isPending ||
                      isDeployLoading ||
                      fetchArtifactsMutation.isPending
                    }
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
