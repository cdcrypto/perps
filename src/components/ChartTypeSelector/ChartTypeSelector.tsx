import { Container } from "./styles";
import { ChartTypeOption } from "./ChartTypeOption";

export enum ChartType {
  Price = "Price",
  FundingRate = "FundingRate",
}

export const chartTypeDisplayNames: { [key in ChartType]: string } = {
  [ChartType.Price]: "Price",
  [ChartType.FundingRate]: "Funding Rate",
};

interface ChartTypeSelectorProps {
  selectedChartType: ChartType;
  setSelectedChartType: (chartType: ChartType) => void;
}

export const ChartTypeSelector = ({
  selectedChartType,
  setSelectedChartType,
}: ChartTypeSelectorProps) => {
  return (
    <Container>
      {Object.values(ChartType).map((chartType) => (
        <ChartTypeOption
          key={chartType}
          chartType={chartType}
          selected={chartType === selectedChartType}
          setSelectedChartType={setSelectedChartType}
        />
      ))}
    </Container>
  );
};
