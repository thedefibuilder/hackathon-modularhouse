import React from "react";

import type { createSchema } from "@/lib/schemas";
import type { useForm } from "react-hook-form";
import type { z } from "zod";
import { EFeatureName } from "@/lib/features";
import ControlledFormInput from "./common/controlled-form/input";

type TDeployForm = {
  form: ReturnType<typeof useForm<z.infer<typeof createSchema>>>;
  activeFeatures: Set<EFeatureName>;
};

export default function DeployForm({ form, activeFeatures }: TDeployForm) {
  return (
    <div className="w-2/3">
      <ControlledFormInput
        control={form.control}
        label="Name"
        name="deployArgs.baseParams.name"
        placeholder="Enter the name of your token"
      />

      <ControlledFormInput
        control={form.control}
        label="Symbol"
        name="deployArgs.baseParams.symbol"
        placeholder="Enter the symbol of your token"
      />

      {activeFeatures.has(EFeatureName.ACCESS_OWNABLE) && (
        <ControlledFormInput
          control={form.control}
          label="Initial Owner"
          name="deployArgs.ownableArgs.initialOwner"
          placeholder="Enter the address of the initial owner"
        />
      )}

      {activeFeatures.has(EFeatureName.ERC20_CAPPED) && (
        <ControlledFormInput
          control={form.control}
          label="Cap"
          name="deployArgs.cappedArgs.cap"
          placeholder="Enter the cap of the token"
        />
      )}

      {activeFeatures.has(EFeatureName.ERC20_PREMINT) && (
        <ControlledFormInput
          control={form.control}
          label="Premint Amount"
          name="deployArgs.premintArgs.premintAmount"
          placeholder="Enter the premint amount of the token"
        />
      )}

      <div className="h-80" />
    </div>
  );
}
