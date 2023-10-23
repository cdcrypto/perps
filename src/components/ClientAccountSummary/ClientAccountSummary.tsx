import { useZetaStore, useCalculationStore } from "stores";
import { IndividualRow, SummaryText, SummaryContainer } from "./styles";
import { Tooltip } from "@components/Tooltip";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { TableActionables } from "./TableActionables";
import { ConnectWalletButton } from "@components/ConnectWalletButton";
import { DepositWithdrawButton } from "@web/components/DepositWithdraw/DepositWithdrawButton";
import { useClient } from "@hooks/client/useClient";
import { AccountEquityStat } from "./Stats/AccountEquityStat";
import { BuyingPowerStat } from "./Stats/BuyingPowerStat";
import { FreeCollateralStat } from "./Stats/FreeCollateralStat";
import { MarginUsageStat } from "./Stats/MarginUsageStat";
import { AccountLeverageStat } from "./Stats/AccountLeverageStat";
import { DepositWithdrawModalState } from "stores/modal/useZetaDepositWithdrawModalStore";

export const ClientAccountSummary = () => {
  const client = useClient();
  const isInitialized = useZetaStore((s) => s.isInitialized);
  const totalAccountEquity = useCalculationStore((s) => s.totalAccountEquity);

  return (
    <>
      {isInitialized && !client ? (
        <TableActionables
          instructionText="Connect your wallet to get started"
          buttonActionable={<ConnectWalletButton />}
        />
      ) : !totalAccountEquity ? (
        <TableActionables
          instructionText="Deposit USDC to start trading"
          buttonActionable={
            <DepositWithdrawButton
              isDepositOrWithdraw={DepositWithdrawModalState.Deposit}
            />
          }
        />
      ) : (
        <SummaryContainer>
          <IndividualRow>
            <Tooltip
              content={{
                header: "Account Equity",
                body: TooltipDefinitions.accountMetricsSummary.accountEquity,
              }}
            >
              <SummaryText
                dotted
                withTooltip
                variant="caption"
                color="secondary"
              >
                Account Equity
              </SummaryText>
            </Tooltip>
            <AccountEquityStat />
          </IndividualRow>
          <IndividualRow>
            <Tooltip
              content={{
                header: "Buying Power",
                body: TooltipDefinitions.accountMetricsSummary.buyingPower,
              }}
            >
              <SummaryText
                dotted
                withTooltip
                variant="caption"
                color="secondary"
              >
                Buying Power
              </SummaryText>
            </Tooltip>
            <BuyingPowerStat />
          </IndividualRow>
          <IndividualRow>
            <Tooltip
              content={{
                header: "Free Collateral",
                body: TooltipDefinitions.accountMetricsSummary.freeCollateral,
              }}
            >
              <SummaryText
                dotted
                withTooltip
                variant="caption"
                color="secondary"
              >
                Free Collateral
              </SummaryText>
            </Tooltip>
            <FreeCollateralStat />
          </IndividualRow>
          <IndividualRow>
            <Tooltip
              content={{
                header: "Account Leverage",
                body: TooltipDefinitions.accountMetricsSummary
                  .currentAccountLeverage,
              }}
            >
              <SummaryText
                dotted
                withTooltip
                variant="caption"
                color="secondary"
              >
                Account Leverage
              </SummaryText>
            </Tooltip>
            <AccountLeverageStat />
          </IndividualRow>
          <IndividualRow>
            <Tooltip
              content={{
                header: "Margin Usage",
                body: TooltipDefinitions.accountMetricsSummary.marginUsage,
              }}
            >
              <SummaryText
                dotted
                withTooltip
                variant="caption"
                color="secondary"
              >
                Margin Usage
              </SummaryText>
            </Tooltip>
            <MarginUsageStat />
          </IndividualRow>
        </SummaryContainer>
      )}
    </>
  );
};
