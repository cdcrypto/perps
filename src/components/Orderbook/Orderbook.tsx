import { DropdownOption } from "@components/Dropdown/Dropdown";
import { useMarketDetails } from "@hooks/useMarketDetails";
import { useCenterOrderbook } from "@utils/setup/hooks/useCenterOrderbook";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { analytics } from "analytics";
import { useMemo } from "react";
import { SingleValue } from "react-select";
import { OrderbookPriceIncrement,useUserSettings } from "../../stores/useUserSettings";
import { OrderbookTable } from "./OrderbookTable";
import {
  PriceIncrement,
  INCREMENT_HUNDREDTH,
  PRICE_INCREMENT_OPTIONS,
} from "./PriceIncrement";
import { OrderbookContainer } from "./styles";

export const ORDERBOOK_PRECISION = 2;

interface OrderbookProps {
  /**
   * Classname that will be passed in to the root
   */
  className?: string;
}

const PRICE_INCREMENTS_PER_ASSET: Partial<
  Record<Asset, OrderbookPriceIncrement>
> = {
  [Asset.BTC]: OrderbookPriceIncrement.TENTH,
  [Asset.ETH]: OrderbookPriceIncrement.TENTH,
  [Asset.SOL]: OrderbookPriceIncrement.HUNDREDTH,
  [Asset.APT]: OrderbookPriceIncrement.THOUSANDTH,
  [Asset.ARB]: OrderbookPriceIncrement.THOUSANDTH,
};

export const Orderbook = ({ className }: OrderbookProps) => {
  const { selectedAsset } = useMarketDetails();
  const { orderbookPriceIncrements, savePriceIncrement } = useUserSettings(
    (s) => ({
      orderbookPriceIncrements: s.orderbookPriceIncrements,
      savePriceIncrement: s.setOrderbookPriceIncrement,
    })
  );

  const priceIncrementValue =
    orderbookPriceIncrements[selectedAsset] ??
    PRICE_INCREMENTS_PER_ASSET[selectedAsset] ??
    OrderbookPriceIncrement.TENTH;

  const priceIncrement = useMemo(
    () =>
      PRICE_INCREMENT_OPTIONS.find((pi) => pi.data === priceIncrementValue) ??
      INCREMENT_HUNDREDTH,
    [priceIncrementValue]
  );

  const handlePriceIncrementChange = (
    newValue: SingleValue<DropdownOption<OrderbookPriceIncrement>>
  ) => {
    if (newValue?.data) {
      analytics.selectPriceGrouping(parseFloat(newValue.value));
      savePriceIncrement(selectedAsset, newValue.data);
    }
  };

  const {
    setBidAskContainerRef,
    setSpreadInfoContainerRef,
    onCenterOrderbook,
    bidAskContainerHeight,
  } = useCenterOrderbook();

  return (
    <OrderbookContainer className={className}>
      <PriceIncrement
        value={priceIncrement}
        onChange={handlePriceIncrementChange}
        onCenterOrderbook={onCenterOrderbook}
      />
      <OrderbookTable
        setBidAskContainerRef={setBidAskContainerRef}
        setSpreadInfoContainerRef={setSpreadInfoContainerRef}
        priceIncrement={parseFloat(priceIncrement.value)}
        onCenterOrderbook={onCenterOrderbook}
        bidAskContainerHeight={bidAskContainerHeight}
      />
    </OrderbookContainer>
  );
};
