import { DropdownWithDescription } from "@components/DropdownWithDescription";
import { useCallback, useEffect, useState } from "react";
import {
  SyntheticOrderType,
  useSelectedContractStore,
} from "stores/useSelectedContract";
import { shallow } from "zustand/shallow";
import { useUserSettings } from "../../stores";
import { AdvancedOrderTypesContainer } from "./styles";
interface AdvancedOrderConfigurationProps {
  onSelectedOrderType: (advancedOrderType: SyntheticOrderType) => void;
}

const ORDER_TYPE_STRING = {
  [SyntheticOrderType.LIMIT]: "None",
  [SyntheticOrderType.FILLORKILL]: "Fill or Kill",
  [SyntheticOrderType.IMMEDIATEORCANCEL]: "Immediate or Cancel",
  [SyntheticOrderType.POSTONLY]: "Post Only",
  [SyntheticOrderType.POSTONLYSLIDE]: "Post Only Slide",
};

const ALL_DROPDOWN_OPTIONS = [
  {
    value: ORDER_TYPE_STRING[SyntheticOrderType.LIMIT],
    label: ORDER_TYPE_STRING[SyntheticOrderType.LIMIT],
    data: SyntheticOrderType.LIMIT,
    description: "No advanced order types applied.",
  },
  {
    value: ORDER_TYPE_STRING[SyntheticOrderType.FILLORKILL],
    label: ORDER_TYPE_STRING[SyntheticOrderType.FILLORKILL],
    data: SyntheticOrderType.FILLORKILL,
    description: "Order will only execute if it is fully filled.",
  },
  {
    value: ORDER_TYPE_STRING[SyntheticOrderType.IMMEDIATEORCANCEL],
    label: ORDER_TYPE_STRING[SyntheticOrderType.IMMEDIATEORCANCEL],
    data: SyntheticOrderType.IMMEDIATEORCANCEL,
    description: "Any unfilled size will be cancelled.",
  },
  {
    value: ORDER_TYPE_STRING[SyntheticOrderType.POSTONLY],
    label: ORDER_TYPE_STRING[SyntheticOrderType.POSTONLY],
    data: SyntheticOrderType.POSTONLY,
    description:
      "Order will only be placed if it does not match a pre-existing order.",
  },
  {
    value: ORDER_TYPE_STRING[SyntheticOrderType.POSTONLYSLIDE],
    label: ORDER_TYPE_STRING[SyntheticOrderType.POSTONLYSLIDE],
    data: SyntheticOrderType.POSTONLYSLIDE,
    description:
      "Order will be placed at the price you set, unless it matches a pre-existing order, in which case it will place the order one tick away from the best bid/offer.",
  },
];

const REDUCE_ONLY_DROPDOWN_OPTIONS = [
  {
    value: ORDER_TYPE_STRING[SyntheticOrderType.FILLORKILL],
    label: ORDER_TYPE_STRING[SyntheticOrderType.FILLORKILL],
    data: SyntheticOrderType.FILLORKILL,
    description: "Order will only execute if it is fully filled.",
  },
  {
    value: ORDER_TYPE_STRING[SyntheticOrderType.IMMEDIATEORCANCEL],
    label: ORDER_TYPE_STRING[SyntheticOrderType.IMMEDIATEORCANCEL],
    data: SyntheticOrderType.IMMEDIATEORCANCEL,
    description: "Any unfilled size will be cancelled.",
  },
];

export const AdvancedOrderConfiguration = ({
  onSelectedOrderType: setAdvancedOrderType,
}: AdvancedOrderConfigurationProps): JSX.Element => {
  const { orderType, reduceOnly } = useSelectedContractStore((s) => ({
    orderType: s.orderType,
    reduceOnly: s.reduceOnly,
  }));
  const { savedOrderType, saveOrderType } = useUserSettings(
    (s) => ({ savedOrderType: s.orderType, saveOrderType: s.setOrderType }),
    shallow
  );
  const dropdownOptions = reduceOnly
    ? REDUCE_ONLY_DROPDOWN_OPTIONS
    : ALL_DROPDOWN_OPTIONS;

  const findDropdownValue = useCallback(
    (savedOrderType: SyntheticOrderType) => {
      if (!savedOrderType) {
        return null;
      }

      return dropdownOptions.find((o) => o.data === savedOrderType) ?? null;
    },
    [dropdownOptions]
  );

  const [dropdownValue, setDropdownValue] = useState(
    findDropdownValue(savedOrderType)
  );

  useEffect(() => {
    const _dropdownValue = findDropdownValue(savedOrderType);
    setDropdownValue(_dropdownValue);
  }, [savedOrderType, setDropdownValue, findDropdownValue]);

  return (
    <AdvancedOrderTypesContainer>
      <DropdownWithDescription<SyntheticOrderType>
        isDisabled={orderType === SyntheticOrderType.MARKET}
        value={dropdownValue}
        placeholderText="Advanced Order Types"
        options={dropdownOptions}
        onChange={(val) => {
          const dropdownOrderType = val?.data ?? SyntheticOrderType.MARKET;

          saveOrderType(dropdownOrderType);
          setAdvancedOrderType(dropdownOrderType);
          setDropdownValue(
            val?.data && val.data !== SyntheticOrderType.MARKET
              ? {
                  value: ORDER_TYPE_STRING[val.data],
                  label: ORDER_TYPE_STRING[val.data],
                  description: val.description,
                  data: val.data,
                }
              : null
          );
        }}
      />
    </AdvancedOrderTypesContainer>
  );
};
