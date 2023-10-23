import { DepositButtonWrapper, NoBalanceSummaryContainer } from "./styles";
import { Text } from "@components/Text";

interface TableActionablesProps {
  instructionText: string;
  buttonActionable: React.ReactNode | JSX.Element;
  className?: string;
}

export const TableActionables = ({
  instructionText,
  buttonActionable: ButtonActionable,
  className,
}: TableActionablesProps) => {
  return (
    <NoBalanceSummaryContainer className={className}>
      <DepositButtonWrapper>
        <Text variant="body2" color="secondary">
          {instructionText}
        </Text>
        {ButtonActionable}
      </DepositButtonWrapper>
    </NoBalanceSummaryContainer>
  );
};
