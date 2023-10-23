import USDCIcon from "@assets/coins/USDCIcon";
import { AssetIcon } from "@components/AssetIcon";
import { Text } from "@components/Text";
import { useClient } from "@hooks/client/useClient";
import { fromProgramAsset } from "@zetamarkets/sdk/dist/assets";
import { convertNativeBNToDecimal } from "@zetamarkets/sdk/dist/utils";
import { useCallback, useState } from "react";
import { useClientStore } from "stores";
import styled from "styled-components";
import { MigrationStep } from "./MigrationV2";
import { ActionButton } from "./styles";
import { MigrationTitleStepper } from "./MigrationTitleStepper";
import { convertDollarNumberToString } from "@utils/general";
import { PLATFORM_PRECISION } from "@zetamarkets/sdk/dist/constants";

export const MigrateAccountsContent = ({
  step,
  onComplete,
}: {
  step: MigrationStep;
  onComplete: () => void;
}) => {
  const migration = useClientStore((s) => s.migration);
  const client = useClient();
  const [hasMigrated, setHasMigrated] = useState(!!client?.account);

  const accounts = migration?.marginAccounts.map((acc) => {
    const asset = fromProgramAsset(acc.asset);
    return (
      <AccountRow key={asset}>
        <AssetContainer>
          <AssetIcon size={20} asset={asset} />
          <AccountRowText variant="body1">{asset}</AccountRowText>
        </AssetContainer>
        <AccountRowText variant="body1">
          {convertDollarNumberToString(
            convertNativeBNToDecimal(acc.balance),
            undefined,
            PLATFORM_PRECISION
          )}
        </AccountRowText>
      </AccountRow>
    );
  });
  const handleActionClick = useCallback(() => {
    if (hasMigrated) {
      return onComplete();
    }
    void client
      ?.migrateToCrossMarginAccount()
      .then(() => {
        setHasMigrated(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [client, hasMigrated, onComplete]);

  return (
    <MigrationTitleStepper
      step={hasMigrated ? MigrationStep.StartTrading : step}
      explainerText={
        hasMigrated
          ? `Awesome! All of your account balances and open positions have
           been transferred to your Zeta v2.0 account.`
          : `Now, let’s create your account on Zeta v2.0 and transfer your existing
           account balances and open positions over.`
      }
    >
      <MigrateAccountsContainer>
        {hasMigrated ? (
          <MigratedBalanceContainer>
            <MigatedInfoText variant="body1">
              Total Balance Transferred
            </MigatedInfoText>
            <MigratedBalanceTextContrainer>
              <USDCIcon />
              <MigratedBalanceText variant="body1">{`USDC   ${
                client?.account?.balance
                  ? convertNativeBNToDecimal(client?.account?.balance)
                  : "-"
              } `}</MigratedBalanceText>
            </MigratedBalanceTextContrainer>
          </MigratedBalanceContainer>
        ) : (
          <AssetTable>
            <Header>
              <HeaderText variant="body1">Accounts</HeaderText>
              <HeaderText variant="body1">Balance (USDC)</HeaderText>
            </Header>
            {accounts}
          </AssetTable>
        )}
        <ActionButton
          variant="primary"
          label={hasMigrated ? "Start Trading!" : "Migrate All my Accounts"}
          onClick={handleActionClick}
        />
      </MigrateAccountsContainer>
    </MigrationTitleStepper>
  );
};
const MigratedBalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
const MigatedInfoText = styled(Text)`
  color: #f2e2ff;
  text-align: center;

  /* H2 */
  font-size: 1.25rem;
  font-family: Sora;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem;
`;
const MigratedBalanceText = styled(Text)`
  color: #bca4d7;
  text-align: center;

  /* Display */
  font-size: 2rem;
  font-family: Sora;
  font-style: normal;
  font-weight: 500;
  line-height: 2.5rem;
  white-space: pre-wrap;
`;
const MigratedBalanceTextContrainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const AssetTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  background: #1a0f28;
  border-radius: 12px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8rem;

  padding: 1rem 1rem 0.25rem 1rem;

  border-bottom: 0.5px solid #644d7d;
`;
const HeaderText = styled(Text)`
  color: #5d6d8b;

  /* Desktop/Caption */
  font-size: 0.75rem;
  font-family: Sora;
  font-style: normal;
  font-weight: 400;
  line-height: 115%;
`;
const AccountRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.75rem 1rem;
`;
const AssetContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;
const AccountRowText = styled(Text)`
  color: #d3bfea;

  /* Body1 */
  font-size: 1rem;
  font-family: Sora;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
`;
const MigrateAccountsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;
