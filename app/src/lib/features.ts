import type { LucideIcon } from "lucide-react";

import {
  AlarmClockMinus,
  Coins,
  Flame,
  GlassWater,
  HandCoins,
  Pickaxe,
  PlaneTakeoff,
  UserRound,
  Vote,
  Zap,
} from "lucide-react";

export type TFeature = {
  name: EFeatureName;
  icon: LucideIcon;
  description: string;
  required?: boolean;
  inclusiveSet?: EFeatureName[];
  exclusiveSet?: EFeatureName[];
};

export enum EFeatureName {
  ACCESS_OWNABLE = "Ownable",
  ERC20_BASE = "ERC20 Base",
  ERC20_MINTABLE = "Mintable",
  ERC20_PREMINT = "Premint",
  ERC20_BURNABLE = "Burnable",
  ERC20_PAUSABLE = "Pausable",
  ERC20_PERMIT = "Permit",
  ERC20_VOTES = "Votes",
  ERC20_CAPPED = "Capped",
  ERC20_FLASH_MINT = "Flash Mint",
}

export const featureNames = Object.values(EFeatureName) as [
  EFeatureName,
  ...EFeatureName[],
];

export const features: TFeature[] = [
  {
    name: EFeatureName.ERC20_BASE,
    icon: Coins,
    required: true,
    description: "Create a fungible token compliant with ERC20 standard.",
  },
  {
    name: EFeatureName.ACCESS_OWNABLE,
    icon: UserRound,
    description: "Add an admin to the token contract for access control.",
    exclusiveSet: [
      EFeatureName.ERC20_MINTABLE,
      EFeatureName.ERC20_PAUSABLE,
      EFeatureName.ERC20_CAPPED,
    ],
  },
  {
    name: EFeatureName.ERC20_PREMINT,
    icon: PlaneTakeoff,
    description: "Mint an amount of tokens at token deployment.",
  },
  {
    name: EFeatureName.ERC20_MINTABLE,
    icon: Pickaxe,
    description: "Allow an admin to mint new tokens after deployment.",
    inclusiveSet: [EFeatureName.ACCESS_OWNABLE],
    exclusiveSet: [EFeatureName.ERC20_CAPPED],
  },
  {
    name: EFeatureName.ERC20_BURNABLE,
    icon: Flame,
    description:
      "Allow token holders to burn tokens and decrease total supply.",
  },
  {
    name: EFeatureName.ERC20_PAUSABLE,
    icon: AlarmClockMinus,
    description: "Allow an admin to pause the token contract.",
    inclusiveSet: [EFeatureName.ACCESS_OWNABLE],
  },
  {
    name: EFeatureName.ERC20_PERMIT,
    icon: HandCoins,
    description: "Allow token holders sign gasless approvals.",
    exclusiveSet: [EFeatureName.ERC20_VOTES],
  },
  {
    name: EFeatureName.ERC20_CAPPED,
    icon: GlassWater,
    description: "Set a cap on the total supply of the token.",
    inclusiveSet: [EFeatureName.ERC20_MINTABLE, EFeatureName.ACCESS_OWNABLE],
  },
  {
    name: EFeatureName.ERC20_VOTES,
    icon: Vote,
    description:
      "Add voting capabilities to the token. Requires permit dependency.",
    inclusiveSet: [EFeatureName.ERC20_PERMIT],
  },
  {
    name: EFeatureName.ERC20_FLASH_MINT,
    icon: Zap,
    description: "Allow anyone to flash mint tokens.",
  },
];

// export const featuresToOptionsERC20 = (featureNames: EFeatureName[]) => {
//   return {
//     burnable: featureNames.includes(EFeatureName.ERC20_BURNABLE),
//     pausable: featureNames.includes(EFeatureName.ERC20_PAUSABLE),
//     premint: featureNames.includes(EFeatureName.ERC20_PREMINT),
//     cap: featureNames.includes(EFeatureName.ERC20_CAPPED),
//     mintable: featureNames.includes(EFeatureName.ERC20_MINTABLE),
//     permit: featureNames.includes(EFeatureName.ERC20_PERMIT),
//     votes: featureNames.includes(EFeatureName.ERC20_VOTES),
//     flashmint: featureNames.includes(EFeatureName.ERC20_FLASH_MINT),
//     ownable: featureNames.includes(EFeatureName.ACCESS_OWNABLE),
//   } satisfies TERC20Options;
// };

// export async function getModuleSourceCode(moduleName: EModuleName, featureNames: EFeatureName[]) {
//   switch (moduleName) {
//     case EModuleName.TOKEN:
//       return ContractService.buildERC20(featuresToOptionsERC20(featureNames));
//     case EModuleName.PRESALE:
//       return ContractService.buildPresale(featuresToOptionsPresale(featureNames));
//     default:
//       throw new Error('Module not supported');
//   }
// }
