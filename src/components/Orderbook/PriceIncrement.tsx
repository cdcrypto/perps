import { DropdownOption } from "@components/Dropdown/Dropdown";
import { SingleValue } from "react-select";
import { OrderbookPriceIncrement } from "stores/useUserSettings";
import { OrderbookDropdown } from "./OrderbookDropdown";
import {
  CenterButton,
  PriceIncrementContainer
} from "./styles";

import CenterIcon from "@assets/CenterIcon";
import { Text } from "@components/Text";
/**
 * TODO: Update price increment options relative to prices of assets
 */

type DdOption = DropdownOption<OrderbookPriceIncrement>;

export const INCREMENT_ONE: DdOption = {
  value: OrderbookPriceIncrement.ONE,
  data: OrderbookPriceIncrement.ONE,
  label: OrderbookPriceIncrement.ONE,
};

export const INCREMENT_TENTH: DdOption = {
  value: OrderbookPriceIncrement.TENTH,
  data: OrderbookPriceIncrement.TENTH,
  label: OrderbookPriceIncrement.TENTH,
};

export const INCREMENT_HUNDREDTH: DdOption = {
  value: OrderbookPriceIncrement.HUNDREDTH,
  label: OrderbookPriceIncrement.HUNDREDTH,
  data: OrderbookPriceIncrement.HUNDREDTH,
};

export const INCREMENT_THOUSANDTH: DdOption = {
  value: OrderbookPriceIncrement.THOUSANDTH,
  label: OrderbookPriceIncrement.THOUSANDTH,
  data: OrderbookPriceIncrement.THOUSANDTH,
};

export const INCREMENT_TEN_THOUSANDTH: DdOption = {
  value: OrderbookPriceIncrement.TEN_THOUSANDTH,
  label: OrderbookPriceIncrement.TEN_THOUSANDTH,
  data: OrderbookPriceIncrement.TEN_THOUSANDTH,
};

export const PRICE_INCREMENT_OPTIONS = [
  INCREMENT_ONE,
  INCREMENT_TENTH,
  INCREMENT_HUNDREDTH,
  INCREMENT_THOUSANDTH,
  INCREMENT_TEN_THOUSANDTH,
];

interface PriceIncrementProps {
  /**
   * The current value of the price increment dropdown
   */
  value: DdOption;
  /**
   * The callback function that is called upon change of the dropdown
   */
  onChange: (newValue: SingleValue<DdOption>) => void;
  /**
   * Classname that will be passed in to the root
   */
  className?: string;

  onCenterOrderbook: (scrollBehavior?: ScrollBehavior) => void;
}

export const PriceIncrement = ({
  value,
  onChange: handleChange,
  className,
  onCenterOrderbook: handleCenterOrderbook,
}: PriceIncrementProps) => {
  return (
    <PriceIncrementContainer className={className}>
      <CenterButton
        onClick={() => {
          handleCenterOrderbook();
        }}
      >
        <CenterIcon />
        <Text variant="h5" color="textEnabled">
          Recenter
        </Text>
      </CenterButton>
      <OrderbookDropdown
        placeholderText={value?.value}
        value={value}
        onChange={handleChange}
        options={PRICE_INCREMENT_OPTIONS}
      />
    </PriceIncrementContainer>
  );
};
