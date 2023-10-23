import { Dropdown, DropdownOption } from "@components/Dropdown/Dropdown";
import { Text } from "@components/Text";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Side } from "@zetamarkets/sdk/dist/types";
import {
  SyntheticOrderType,
  useSelectedContractStore,
} from "stores/useSelectedContract";
import { MarketPriceDisplay } from "./MarketPriceDisplay";
import { LabelWrapper, PriceInput, SingleRow } from "./styles";

interface OrderTypeAndPriceProps {
  price: string | undefined;
  size: string | undefined;
  side: Side;
  asset: Asset;
  orderType: DropdownOption<SyntheticOrderType>;

  onPriceChange: (val: string) => void;
  onOrderTypeChange: (newValue: DropdownOption<SyntheticOrderType>) => void;
}

export const DROPDOWN_OPTION_LIMIT: DropdownOption<SyntheticOrderType> = {
  value: "limit",
  label: "Limit",
  data: SyntheticOrderType.LIMIT,
};
export const DROPDOWN_OPTION_MARKET: DropdownOption<SyntheticOrderType> = {
  value: "market",
  label: "Market",
  data: SyntheticOrderType.MARKET,
};

export const ORDER_TYPE_DROPDOWN_OPTIONS: DropdownOption<SyntheticOrderType>[] =
  [DROPDOWN_OPTION_LIMIT, DROPDOWN_OPTION_MARKET];

export const OrderTypeAndPrice = ({
  orderType,
  price,
  size,
  side,
  asset,

  onOrderTypeChange: handleOrderTypeChange,
  onPriceChange: handlePriceChange,
}: OrderTypeAndPriceProps) => {
  const setReduceOnly = useSelectedContractStore((s) => s.setReduceOnly);

  return (
    <SingleRow>
      <LabelWrapper>
        <Text variant="caption" color="secondary">
          Order Type
        </Text>
        <Dropdown
          testId="order-type-dropdown"
          value={orderType}
          onChange={(newValue) => {
            if (newValue) {
              handleOrderTypeChange(newValue);
              setReduceOnly(false);
            }
          }}
          isDisabled={false}
          options={ORDER_TYPE_DROPDOWN_OPTIONS}
        />
      </LabelWrapper>
      {orderType.data === SyntheticOrderType.LIMIT ? (
        <PriceInput
          testId="price-input"
          value={price}
          setValue={handlePriceChange}
          label="Price"
          decimalScale={4}
        />
      ) : (
        <MarketPriceDisplay
          size={Number(size) || 0}
          side={side}
          asset={asset}
        />
      )}
    </SingleRow>
  );
};
