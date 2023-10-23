import { MigrationV2 } from "@utils/setup/MigrationV2";
import { TCModal } from "@components/TCModal";
import { WalletModal } from "@web/components/Wallet/WalletModal";
import { DepositWithdrawModal } from "@web/components/DepositWithdraw/DepositWithdrawModal";
import { Onboarding } from "@web/components/Onboarding";

export const GlobalComponents = () => {
  return (
    <div>
      <MigrationV2 />
      <TCModal />
      <WalletModal />
      <DepositWithdrawModal />
      <Onboarding />
    </div>
  );
};
