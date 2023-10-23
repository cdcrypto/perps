import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  ReferenceLine,
  YAxis,
  Tooltip,
  XAxis,
} from "recharts";
import { useTheme } from "styled-components";
import { FundingRateTooltip } from "./FundingRateTooltip";
import {
  formatPercentTick,
  formatTickTimestamp,
  generateSymmetricTicks,
} from "./helpers";
import { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";

interface FundingRateData {
  time: number | undefined;
  value: number | undefined;
}

interface ActivePayload {
  payload: FundingRateData;
}

interface FundingRateChartProps {
  data: FundingRateData[];
  showTooltip: boolean;
  className?: string;
}

export const FundingRateChart = ({
  data,
  showTooltip,
  className,
}: FundingRateChartProps) => {
  const theme = useTheme();
  const [point, setPoint] = useState<FundingRateData>({ time: 0, value: 0 });
  const absYValues = data.map((tuple) => Math.abs(tuple.value ?? 0));
  const absMaxY = absYValues.length > 0 ? Math.max(...absYValues) : 0;
  const yDomainBound = absMaxY * 1.15;
  const ticks = generateSymmetricTicks(-absMaxY, absMaxY);

  const handleMouseMove = (nextState: CategoricalChartState) => {
    const { payload } = (nextState?.activePayload?.at(0) ?? {
      payload: { time: 0, value: 0 },
    }) as ActivePayload;
    const { time, value } = payload;

    setPoint({
      time,
      value,
    });
  };

  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <LineChart
        data={data}
        onMouseMove={(nextState) => handleMouseMove(nextState)}
        onMouseLeave={() => setPoint({ time: undefined, value: undefined })}
      >
        <Line
          type="linear"
          dataKey="value"
          stroke={theme?.purple[100]}
          dot={false}
        />
        <ReferenceLine
          y={point.value}
          strokeDasharray={4}
          stroke={theme?.grey[200]}
        />
        <ReferenceLine
          x={point.time}
          strokeDasharray={4}
          stroke={theme?.grey[200]}
        />

        <XAxis
          dataKey={"time"}
          minTickGap={150}
          tick={{ fontSize: 10, fill: theme?.typography.secondary }}
          tickFormatter={(timestamp: number) => formatTickTimestamp(timestamp)}
          stroke={theme?.grey[600]}
          strokeWidth={1}
        />
        <YAxis
          domain={[-yDomainBound, yDomainBound]}
          orientation="right"
          tick={{ fontSize: 10, fill: theme?.typography.secondary }}
          tickFormatter={(tick: number) => formatPercentTick(tick)}
          ticks={ticks}
          tickLine={false}
          stroke={theme?.grey[600]}
          strokeWidth={1}
        />
        <ReferenceLine y={0} strokeDasharray={2} stroke={theme?.grey[400]} />
        {showTooltip && (
          <Tooltip content={<FundingRateTooltip />} cursor={false} />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};
