import {
  AmountText,
  AssetRow,
  Container,
  DescriptionText,
  InfoContainer,
  SuccessLottie,
  PrimaryButton,
} from "./styles";
import USDCIcon from "@assets/coins/USDCIcon";
import { Text } from "@components/Text";
import { CancelModalButton } from "../styles";
import successCheck from "@assets/lottie/successCheck.json";
import { convertNumberToString } from "@utils/general";
import { Header } from "@web/components/DepositWithdraw/Header";
import { DEX_PRICE_PRECISION } from "@utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@web/routes";
import { DepositWithdrawModalState } from "stores/modal/useZetaDepositWithdrawModalStore";

type Props = {
  amount: string | undefined;
  successType:
  | DepositWithdrawModalState.DepositSuccess
  | DepositWithdrawModalState.WithdrawSuccess;
  onClose: (() => void) | undefined;
};

export const Success = ({ amount, successType, onClose }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isTradeRoute = pathname.includes(ROUTES.TRADE);
  const primaryButtonLabel =
    successType === DepositWithdrawModalState.DepositSuccess && !isTradeRoute
      ? "Start Trading"
      : "Done";

  const descriptionText =
    successType === DepositWithdrawModalState.DepositSuccess
      ? "has been deposited to your account"
      : "has been withdrawn to your wallet";

  const value = parseFloat(amount || "0");
  const maxDecimals = value >= 1 ? 2 : DEX_PRICE_PRECISION;
  const formattedAmount = convertNumberToString(value, undefined, maxDecimals);

  const handlePrimaryButtonClick = () => {
    if (
      successType === DepositWithdrawModalState.DepositSuccess &&
      !isTradeRoute
    ) {
      navigate(ROUTES.TRADE);
    }
    onClose?.();
  };
  return (
    <>
      <Header title="Success!" />
      <Container>
        <SuccessLottie
          animationData={successCheck}
          loop={false}
          style={{ width: 100, height: 100 }}
        />

        <InfoContainer>
          <AmountText variant="h1" color="primary">
            {formattedAmount}
          </AmountText>

          <AssetRow>
            <USDCIcon width={16} height={16} />
            <Text variant="h4">USDC</Text>
          </AssetRow>
        </InfoContainer>

        <DescriptionText variant="body2">{descriptionText}</DescriptionText>

        <PrimaryButton
          data-testid="deposit-success-button"
          label={primaryButtonLabel}
          onClick={handlePrimaryButtonClick}
        />

        {successType === DepositWithdrawModalState.DepositSuccess &&
          !isTradeRoute && (
            <CancelModalButton onClick={onClose}>Done</CancelModalButton>
          )}
      </Container>
    </>
  );
};
