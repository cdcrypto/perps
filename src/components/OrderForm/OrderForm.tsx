import { ClientAccountSummary } from "@components/ClientAccountSummary";
import { DropdownOption } from "@components/Dropdown/Dropdown";
import { Slider } from "@components/Slider";
import { Tab } from "@components/Tabs/Tab";
import { Text } from "@components/Text";
import { Tooltip } from "@components/Tooltip";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { useAccountLeverage } from "@hooks/calcs/useAccountLeverage";
import { useMaxTradeSize } from "@hooks/calcs/useMaxTradeSize";
import { useTransactions } from "@hooks/client/useTransactions";
import { useMarketDetails } from "@hooks/useMarketDetails";
import { POSITION_PRECISION } from "@zetamarkets/sdk/dist/constants";
import { Side } from "@zetamarkets/sdk/dist/types";
import Big from "big.js";
import { useLiquidityCheck } from "hooks/useLiquidityCheck";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  SyntheticOrderType,
  useSelectedContractStore,
} from "stores/useSelectedContract";
import { shallow } from "zustand/shallow";
import { useUserSettings } from "../../stores";
import { AdvancedOrderConfiguration } from "./AdvancedOrderConfiguration";
import {
  DROPDOWN_OPTION_LIMIT,
  DROPDOWN_OPTION_MARKET,
  OrderTypeAndPrice,
} from "./OrderTypeAndPrice";
import { TriggerOrderWarning } from "./TriggerOrderWarning";
import {
  AmountRow,
  FormInputWrapper,
  OrderButton,
  OrderFormContent,
  OrderTabIndicator,
  OrderTabs,
  SingleRow,
  SizeTypeTabs,
  SliderContainer,
  TradeLabelWrapper,
  TradeValueInput,
} from "./styles";
import { ReduceOnly } from "./ReduceOnly";

type OrderFormProps = {
  className?: string;
};

export const OrderForm = ({ className }: OrderFormProps) => {
  const {
    side,
    orderType: selectedOrderType,
    quotePrice,
    quoteSize,
    reduceOnly,
    setOrderType,
    setQuoteSize,
    setQuotePrice,
    setSide,
  } = useSelectedContractStore(
    (s) => ({
      side: s.side,
      orderType: s.orderType,
      quoteSize: s.quoteSize,
      quotePrice: s.quotePrice,
      reduceOnly: s.reduceOnly,
      setSide: s.setSide,
      setOrderType: s.setOrderType,
      setQuoteSize: s.setQuoteSize,
      setQuotePrice: s.setQuotePrice,
    }),
    shallow
  );

  const {
    savedOrderType,
    saveOrderType,
    orderSide,
    saveOrderSide,
    orderQuantityType,
    saveOrderQuantityType,
  } = useUserSettings(
    (s) => ({
      savedOrderType: s.orderType,
      saveOrderType: s.setOrderType,
      orderSide: s.orderSide,
      saveOrderSide: s.setOrderSide,
      orderQuantityType: s.orderQuantityType,
      saveOrderQuantityType: s.setOrderQuantityType,
    }),
    shallow
  );

  const [priceInput, setPriceInput] = useState(quotePrice.toString());
  const [priceInputTouched, setPriceInputTouched] = useState(false);
  const [sizeInput, setSizeInput] = useState("");

  const updatePriceInput = (newValue: string) => {
    setPriceInputTouched(true);
    setPriceInput(newValue);
  };

  const { selectedAsset } = useMarketDetails();

  const { avgPrice } = useLiquidityCheck(
    parseFloat(sizeInput || "0"),
    selectedAsset,
    orderSide
  );
  const orderSideIndex = side === Side.BID ? 0 : 1;

  const orderSideVariant = orderSideIndex === 0 ? "buy" : "sell";

  const dropdownOrderType = useMemo(
    () =>
      savedOrderType === SyntheticOrderType.MARKET
        ? DROPDOWN_OPTION_MARKET
        : DROPDOWN_OPTION_LIMIT,
    [savedOrderType]
  );

  const nativeSizeCache = useRef<string>();
  const usdSizeCache = useRef<string>();

  const isUSDSelected = orderQuantityType === "usd";

  const transactions = useTransactions();
  const { simulatedAccountLeverage } = useAccountLeverage(true);

  const tradeLimits = useMaxTradeSize(
    { price: quotePrice, asset: selectedAsset, side, reduceOnly },
    1000
  );

  const { maxTradeSize, maxTradeValue } = useMemo(() => {
    return {
      maxTradeSize: tradeLimits?.maxTradeSize || 0,
      maxTradeValue: tradeLimits?.maxTradeValue || 0,
    };
  }, [tradeLimits?.maxTradeSize, tradeLimits?.maxTradeValue]);

  const handleButtonPurchase = useCallback(async () => {
    if (transactions) {
      await transactions.placeOrder(
        { size: quoteSize, price: quotePrice },
        side,
        selectedAsset,
        selectedOrderType,
        reduceOnly
      );
    }
  }, [
    quotePrice,
    quoteSize,
    selectedAsset,
    selectedOrderType,
    reduceOnly,
    side,
    transactions,
  ]);

  const didQuotePriceChangeFromEffect = useRef(false);
  const didPriceInputChangeFromEffect = useRef(false);

  useEffect(() => {
    if (!didPriceInputChangeFromEffect.current) {
      didQuotePriceChangeFromEffect.current = true;
      setQuotePrice(parseFloat(priceInput) ?? 0);
    }

    didPriceInputChangeFromEffect.current = false;
  }, [priceInput, setQuotePrice]);

  useEffect(() => {
    if (!didQuotePriceChangeFromEffect.current) {
      didPriceInputChangeFromEffect.current = true;
      setPriceInput(quotePrice.toString());
    }

    didQuotePriceChangeFromEffect.current = false;
  }, [quotePrice]);

  useEffect(() => {
    nativeSizeCache.current = undefined;
    usdSizeCache.current = undefined;
    setSizeInput("");
    setPriceInput("");
  }, [selectedAsset, setQuotePrice, setPriceInput, setSizeInput]);

  useEffect(() => {
    if (avgPrice && !priceInput && !priceInputTouched) {
      updatePriceInput(avgPrice.toString());
    }
  }, [priceInput, setPriceInput, avgPrice, priceInputTouched]);

  useEffect(() => {
    const adjustedSizeInput = parseFloat(sizeInput) || 0;
    if (isUSDSelected) {
      if (!quotePrice) return;
      setQuoteSize(Big(adjustedSizeInput).div(quotePrice).toNumber());
    } else {
      setQuoteSize(adjustedSizeInput);
    }
  }, [isUSDSelected, quotePrice, setQuoteSize, sizeInput]);

  // TODO: perhaps this can be handled within the input
  useEffect(() => {
    if (!sizeInput) return;

    const tradeLimit = isUSDSelected ? maxTradeValue : maxTradeSize;
    if (parseFloat(sizeInput) > tradeLimit) {
      setSizeInput(tradeLimit.toString());
      nativeSizeCache.current = undefined;
      usdSizeCache.current = undefined;
    }
  }, [isUSDSelected, maxTradeSize, maxTradeValue, setSizeInput, sizeInput]);

  const handleOrderTypeChange: React.ComponentProps<
    typeof OrderTypeAndPrice
  >["onOrderTypeChange"] = useCallback(
    (val: DropdownOption<SyntheticOrderType>) => {
      // Sync the quote price that's been changing the background to the price input
      updatePriceInput(quotePrice.toString());
      const newOrderType = val.data;

      if (newOrderType !== undefined) {
        // TODO: remove doubling and use user settings as source of truth
        setOrderType(newOrderType);
        saveOrderType(newOrderType);
      }
    },
    [quotePrice, setOrderType, saveOrderType]
  );

  const handlePriceChange: ComponentProps<
    typeof OrderTypeAndPrice
  >["onPriceChange"] = useCallback((val) => {
    updatePriceInput(val);
  }, []);

  const leverageStr = useMemo(() => {
    if (simulatedAccountLeverage === undefined) return "-";
    if (!simulatedAccountLeverage) return "0 x";
    if (simulatedAccountLeverage < 0.01) return "<0.01x";
    return `${simulatedAccountLeverage.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}x`;
  }, [simulatedAccountLeverage]);

  const changeSize = useCallback(
    (newValue: string) => {
      setSizeInput(newValue);
      if (isUSDSelected) {
        usdSizeCache.current = newValue;
        nativeSizeCache.current = undefined;
      } else {
        nativeSizeCache.current = newValue;
        usdSizeCache.current = undefined;
      }
    },
    [isUSDSelected, setSizeInput]
  );

  const changeSizeType = (newIndex: number) => {
    const isUSDWasSelected = newIndex === 1;
    saveOrderQuantityType(isUSDWasSelected ? "usd" : "asset");

    if (isUSDWasSelected !== isUSDSelected) {
      if (isUSDWasSelected) {
        let savedValue = usdSizeCache.current;
        if (savedValue === undefined) {
          savedValue = (quotePrice * parseFloat(sizeInput)).toString();
        }
        setSizeInput(savedValue ?? "");
      } else {
        let savedValue = nativeSizeCache.current;
        if (savedValue === undefined) {
          savedValue = (parseFloat(sizeInput) / quotePrice).toString();
        }
        setSizeInput(savedValue ?? "");
      }
    }
  };

  /** Synchronisations between stored settings and order form */

  useEffect(() => {
    setOrderType(savedOrderType);
  }, [savedOrderType, setOrderType]);

  useEffect(() => {
    setSide(orderSide);
  }, [orderSide, setSide]);

  const setAdvancedOrderType = useCallback(
    (orderType: SyntheticOrderType) => {
      setOrderType(orderType);
      saveOrderType(orderType);
    },
    [saveOrderType, setOrderType]
  );

  const setOrderSideByIndex = useCallback(
    (index: number) => {
      const newSide = index === 0 ? Side.BID : Side.ASK;
      setSide(newSide);
      saveOrderSide(newSide);
    },
    [saveOrderSide, setSide]
  );

  return (
    <OrderFormContent className={className}>
      <FormInputWrapper>
        <OrderTabs
          selectedIndex={orderSideIndex}
          onChange={setOrderSideByIndex}
          tabIndicator={<OrderTabIndicator $selectedIndex={orderSideIndex} />}
        >
          <Tab>Buy</Tab>
          <Tab>Sell</Tab>
        </OrderTabs>
        <OrderTypeAndPrice
          orderType={dropdownOrderType}
          asset={selectedAsset}
          side={side}
          size={sizeInput}
          onOrderTypeChange={handleOrderTypeChange}
          onPriceChange={handlePriceChange}
          price={priceInput}
        />

        <AmountRow>
          <TradeLabelWrapper>
            {isUSDSelected && (
              <Tooltip
                content={{
                  header: "Trade Value",
                  body: TooltipDefinitions.orderForm.tradeValue,
                }}
              >
                <Text dotted withTooltip variant="caption" color="secondary">
                  Trade Value
                </Text>
              </Tooltip>
            )}
            <TradeValueInput
              testId="qty-input"
              value={sizeInput}
              setValue={changeSize}
              decimalScale={POSITION_PRECISION}
              max={isUSDSelected ? maxTradeValue : maxTradeSize}
              label={isUSDSelected ? "" : "Qty."}
            />
          </TradeLabelWrapper>
          <SizeTypeTabs
            selectedIndex={isUSDSelected ? 1 : 0}
            onChange={changeSizeType}
          >
            <Tab>{selectedAsset}</Tab>
            <Tab>USD</Tab>
          </SizeTypeTabs>
        </AmountRow>
        <SingleRow>
          <TradeLabelWrapper>
            <Tooltip
              content={{
                header: "Account Leverage",
                body: TooltipDefinitions.accountMetricsSummary
                  .currentAccountLeverage,
              }}
            >
              <Text dotted withTooltip variant="label" color="secondary">
                Account Leverage
              </Text>
            </Tooltip>
            <SliderContainer>
              <Slider
                min={0}
                max={
                  (isUSDSelected
                    ? Math.max(0, maxTradeValue)
                    : Math.max(0, maxTradeSize)) || 100
                }
                onChange={(val) => changeSize(val.toString())}
                value={parseFloat(sizeInput) || 0}
                precision={POSITION_PRECISION}
                disabled={maxTradeSize <= 0}
                tagValue={leverageStr}
              />
            </SliderContainer>
          </TradeLabelWrapper>
        </SingleRow>
        {dropdownOrderType.data === SyntheticOrderType.LIMIT && (
          <AdvancedOrderConfiguration
            onSelectedOrderType={setAdvancedOrderType}
          />
        )}

        <ReduceOnly setOrderType={setAdvancedOrderType} />
        <TriggerOrderWarning side={side} asset={selectedAsset} />

        <OrderButton
          variant={orderSideVariant}
          label={`${orderSideVariant} ${selectedAsset}-PERP`}
          testId="order-button"
          disabled={sizeInput === "" || +sizeInput === 0}
          onClick={() => {
            void handleButtonPurchase();
          }}
        />
      </FormInputWrapper>
      <ClientAccountSummary />
    </OrderFormContent>
  );
};
