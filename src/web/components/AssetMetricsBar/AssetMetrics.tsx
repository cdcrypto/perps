import { FundingRate } from "@components/FundingRate";
import { PriceDelta } from "@components/PriceDelta";
import { Text } from "@components/Text";
import { Tooltip } from "@components/Tooltip";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { useDayDelta } from "@hooks/api/useDayDelta";
import { useOpenInterest } from "@hooks/api/useOpenInterest";
import { useMarketDetails } from "@hooks/useMarketDetails";
import Skeleton from "@mui/material/Skeleton";
import { FundingPeriod } from "@types";
import { formatAssetPrice, getPrecisionForAsset } from "@utils/general";
import { useMemo } from "react";
import { useZetaStore } from "stores";
import { shallow } from "zustand/shallow";
import { AssetMetricsContainer, FundingRatesContainer } from "./styles";

export const AssetMetrics = () => {
  const { isInitialized, prices } = useZetaStore(
    (state) => ({
      isInitialized: state.isInitialized,
      prices: state.prices,
    }),
    shallow
  );
  const { selectedAsset } = useMarketDetails();
  const dayDelta = useDayDelta(selectedAsset);
  const openInterestData = useOpenInterest();
  const assetPrice = prices[selectedAsset];
  const { minPrecision, maxPrecision } = getPrecisionForAsset(selectedAsset);

  const metricLoader = useMemo(() => {
    return (
      <Skeleton
        height="14px"
        width="60px"
        style={{ backgroundColor: "#808285" }}
      />
    );
  }, []);

  const metricTagLoader = useMemo(() => {
    return (
      <Skeleton
        height="14px"
        width="80px"
        style={{ backgroundColor: "#808285" }}
      />
    );
  }, []);

  const assetDayDelta = useMemo(() => {
    if (!dayDelta) return metricLoader;
    return (
      <PriceDelta
        variant="body2"
        delta={dayDelta.nominal}
        deltaPercentage={dayDelta.percentage}
        deltaMinPrecision={minPrecision}
        deltaMaxPrecision={maxPrecision}
        removeIcon
      />
    );
  }, [dayDelta, metricLoader, minPrecision, maxPrecision]);

  const markPriceStr = useMemo(() => {
    if (!assetPrice) return metricLoader;
    return formatAssetPrice(selectedAsset, assetPrice, true);
  }, [assetPrice, metricLoader, selectedAsset]);

  const assetOI = useMemo(() => {
    if (openInterestData[selectedAsset] === undefined) return undefined;
    return (openInterestData[selectedAsset] || 0) * assetPrice;
  }, [assetPrice, openInterestData, selectedAsset]);

  const assetOIStr = useMemo(() => {
    if (!assetOI) return metricLoader;
    return `$${assetOI.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;
  }, [assetOI, metricLoader]);

  return (
    <>
      {/* Mark Price */}
      <AssetMetricsContainer>
        <Text variant="body2" color="primary" noWrap>
          {markPriceStr}
        </Text>
        {!assetPrice ? (
          metricTagLoader
        ) : (
          <Tooltip
            content={{
              header: "Mark Price",
              body: TooltipDefinitions.metricsBar.markPrice,
            }}
          >
            <Text variant="label" dotted withTooltip color="secondary" noWrap>
              Mark Price
            </Text>
          </Tooltip>
        )}
      </AssetMetricsContainer>
      {/* Price Change */}
      <AssetMetricsContainer>
        {assetDayDelta}
        {!dayDelta ? (
          metricTagLoader
        ) : (
          <Tooltip
            content={{
              header: "24h Change",
              body: TooltipDefinitions.metricsBar["24hChange"],
            }}
          >
            <Text variant="label" dotted withTooltip color="secondary" noWrap>
              24h Change
            </Text>
          </Tooltip>
        )}
      </AssetMetricsContainer>
      {/* 24h Volume */}
      {/* <AssetMetricsContainer>
        <Text variant="body2" color="primary" >
          $862,211,398.91
        </Text>
        <Text variant="label" color="secondary">
          24h Volume
        </Text>
      </AssetMetricsContainer> */}
      {/* Open Interest */}
      <AssetMetricsContainer>
        <Text variant="body2" color="primary">
          {assetOIStr}
        </Text>
        {!assetOI ? (
          metricTagLoader
        ) : (
          <Tooltip
            content={{
              header: "Open Interest",
              body: TooltipDefinitions.metricsBar.openInterest,
            }}
          >
            <Text variant="label" dotted withTooltip color="secondary" noWrap>
              Open Interest
            </Text>
          </Tooltip>
        )}
      </AssetMetricsContainer>
      {/* 1h Funding / Funding APR  */}
      <AssetMetricsContainer>
        <FundingRatesContainer>
          <FundingRate
            asset={selectedAsset}
            fundingPeriod={FundingPeriod.Hourly}
          />
          <Text variant="body2" color="secondary">
            /
          </Text>
          <FundingRate
            asset={selectedAsset}
            fundingPeriod={FundingPeriod.Annually}
          />
        </FundingRatesContainer>
        {!isInitialized ? (
          metricTagLoader
        ) : (
          <FundingRatesContainer>
            <Tooltip
              content={{
                header: "1h Funding Rate",
                body: TooltipDefinitions.metricsBar["1hFundingRate"],
              }}
            >
              <Text variant="label" dotted withTooltip color="secondary" noWrap>
                1h Funding
              </Text>
            </Tooltip>
            <Text variant="label" color="secondary">
              /
            </Text>
            <Tooltip
              content={{
                header: "Funding APR",
                body: TooltipDefinitions.metricsBar.fundingAPR,
              }}
            >
              <Text variant="label" dotted withTooltip color="secondary" noWrap>
                Funding APR
              </Text>
            </Tooltip>
          </FundingRatesContainer>
        )}
      </AssetMetricsContainer>
    </>
  );
};
