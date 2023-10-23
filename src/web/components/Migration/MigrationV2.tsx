import { Modal, ModalProps } from "@components/Modal";
import { useState } from "react";
import { MigrateAccountsContent } from "./MigrateAccountsContent";
import { CloseOpenOrdersContent } from "./CloseOpenOrdersContent";
import { MigrationIntro } from "./MigrationIntro";

export interface MigrationV2Props extends Omit<ModalProps, "children"> {
  onComplete: () => void;
}

export const MigrationV2Modal = ({ open, onComplete }: MigrationV2Props) => {
  return (
    <Modal
      open={open}
      fullScreen={true}
      getBackdropBackgroundColor={(theme) => theme.background[300]}
    >
      <MigrationV2 onComplete={onComplete} />
    </Modal>
  );
};

export enum MigrationStep {
  Intro,
  CloseOpenOrders,
  MigrateAccounts,
  StartTrading,
}

const MigrationV2 = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(MigrationStep.Intro);

  switch (step) {
    case MigrationStep.Intro:
      return (
        <MigrationIntro
          onComplete={() => setStep(MigrationStep.CloseOpenOrders)}
        />
      );
    case MigrationStep.CloseOpenOrders: {
      return (
        <CloseOpenOrdersContent
          step={step}
          onComplete={() => setStep(MigrationStep.MigrateAccounts)}
        />
      );
    }
    case MigrationStep.MigrateAccounts: {
      return (
        <MigrateAccountsContent
          step={step}
          onComplete={() => {
            onComplete();
            setStep(MigrationStep.StartTrading);
          }}
        />
      );
    }
    default:
      return null;
  }
};
