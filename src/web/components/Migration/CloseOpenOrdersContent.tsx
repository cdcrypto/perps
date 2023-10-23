import { Text } from "@components/Text";
import { OpenOrdersTable } from "@web/components/OpenOrdersTable";
import { allAssets } from "@zetamarkets/sdk/dist/assets";
import { useState } from "react";
import { useClientStore } from "stores";
import { ordersInitialValue } from "stores/useClientStore";
import styled from "styled-components";
import { MigrationTitleStepper } from "./MigrationTitleStepper";
import { MigrationStep } from "./MigrationV2";
import { ActionButton } from "./styles";
export const CloseOpenOrdersContent = ({
  step,
  onComplete,
}: {
  step: MigrationStep;
  onComplete: () => void;
}) => {
  const migration = useClientStore((s) => s.migration);
  const [hasClosedOrders, setHasClosedOrders] = useState(
    allAssets()
      .map((a) => migration?.client.getOrders(a))
      .flat().length === 0 || false
  );

  return (
    <MigrationTitleStepper
      step={step}
      explainerText={
        hasClosedOrders
          ? `Great! There are no pending open orders. Continue to next step.
          `
          : `To protect you from losing your assets during the migration process,
        let's start by canceling all open orders in your v1 account.`
      }
    >
      <CloseOpenOrdersContainer>
        <StyledOpenOrdersTable
          dim={hasClosedOrders}
          orders={migration?.openOrders || ordersInitialValue}
        />
        <ActionButton
          variant="primary"
          label={hasClosedOrders ? "Continue" : "Close Orders"}
          onClick={() => {
            if (hasClosedOrders) {
              return onComplete();
            }

            void migration?.client.cancelAllPerpMarketOrders().then(() => {
              setHasClosedOrders(true);
            });
          }}
        />
      </CloseOpenOrdersContainer>
    </MigrationTitleStepper>
  );
};
const StyledOpenOrdersTable = styled(OpenOrdersTable)<{ dim: boolean }>`
  background: rgba(12, 28, 58, 1);
  border-radius: 12px;
  overflow: hidden;
  ${(props) => props.dim && "filter: brightness(0.8) opacity(0.5) blur(1px)"};
`;
const CloseOpenOrdersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

export const ExplainerText = styled(Text)`
  color: #f2e2ff;
  text-align: center;

  /* Body1 */
  font-size: 1rem;
  font-family: Sora;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  white-space: pre-line;
  margin-bottom: 3.5rem;
`;
