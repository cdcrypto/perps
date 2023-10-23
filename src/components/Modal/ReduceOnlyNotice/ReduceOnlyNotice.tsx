import { Tooltip } from "@components/Tooltip";
import { Row } from "./styles";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { Text } from "@components/Text";
import { Switcher } from "@components/Switcher";

export const ReduceOnlyNotice = () => {
  return (
    <Row>
      <Tooltip
        content={{
          header: "Reduce only",
          body: TooltipDefinitions.orderForm.reduceOnly,
        }}
      >
        <Text variant="body2" dotted withTooltip color="secondary">
          Reduce only
        </Text>
      </Tooltip>

      <Switcher disabled checked onSwitch={() => {}} />
    </Row>
  );
};
