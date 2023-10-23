import { TextColor } from "@components/Text/styles";
import { ChartType, chartTypeDisplayNames } from "./ChartTypeSelector";
import { ChartTypeOptionContainer } from "./styles";
import { Text } from "@components/Text";

interface ChartTypeOptionProps {
  selected: boolean;
  chartType: ChartType;
  setSelectedChartType: (chartType: ChartType) => void;
}

export const ChartTypeOption = ({
  selected,
  chartType,
  setSelectedChartType,
}: ChartTypeOptionProps) => {
  const displayName = chartTypeDisplayNames[chartType];
  const textColor: TextColor = selected ? "textActive" : "textEnabled";
  const handleClick = () => {
    setSelectedChartType(chartType);
  };

  return (
    <ChartTypeOptionContainer $selected={selected} onClick={handleClick}>
      <Text variant="h5" color={textColor}>
        {displayName}
      </Text>
    </ChartTypeOptionContainer>
  );
};
