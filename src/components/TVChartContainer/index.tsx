import * as React from "react";
import "./index.css";
import {
  widget,
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  ResolutionString,
  Timezone,
} from "../../charting_library/charting_library";
import { useState } from "react";
import { useMarketDetails } from "@hooks/useMarketDetails";

// This is a basic example of how to create a TV widget
// You can add more feature such as storing charts in localStorage

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions["symbol"];
  interval: ChartingLibraryWidgetOptions["interval"];
  datafeedUrl: string;
  libraryPath: ChartingLibraryWidgetOptions["library_path"];
  chartsStorageUrl: ChartingLibraryWidgetOptions["charts_storage_url"];
  chartsStorageApiVersion: ChartingLibraryWidgetOptions["charts_storage_api_version"];
  clientId: ChartingLibraryWidgetOptions["client_id"];
  userId: ChartingLibraryWidgetOptions["user_id"];
  fullscreen: ChartingLibraryWidgetOptions["fullscreen"];
  autosize: ChartingLibraryWidgetOptions["autosize"];
  studiesOverrides: ChartingLibraryWidgetOptions["studies_overrides"];
  containerId: ChartingLibraryWidgetOptions["container_id"];
  theme: string;
}

export interface TVChartContainerProps {
  className?: string;
}

export const TVChartContainer = ({ className }: TVChartContainerProps) => {
  const [chartReady, setChartReady] = useState<boolean>(false);
  const { selectedAsset } = useMarketDetails();

  const defaultProps: ChartContainerProps = {
    symbol: (selectedAsset || "SOL") + "/USD",
    interval: "15" as ResolutionString,
    theme: "Dark",
    containerId: "tv_chart_container",
    // TODO: urls should be env vars
    datafeedUrl: "https://shrill-sky-6ab5.zetaplatform.workers.dev",
    chartsStorageUrl: "https://saveload.tradingview.com",
    libraryPath: "/charting_library/charting_library/",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {
      "volume.volume.color.0": "rgba(0, 0, 0, 0)",
      "volume.volume.color.1": "rgba(0, 0, 0, 0)",
    },
    clientId: undefined,
    chartsStorageApiVersion: undefined,
    userId: undefined,
  };

  const tvWidgetRef = React.useRef<IChartingLibraryWidget | null>(null);

  const chartStyleOverrides = {
    "paneProperties.backgroundType": "solid",
    "paneProperties.legendProperties.showBackground": false,
    "paneProperties.legendProperties.showStudyTitles": false,
    "scalesProperties.showStudyLastValue": false,
  };

  React.useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: (selectedAsset || "SOL") + "/USD",
      container: "",
      // BEWARE: no trailing slash is expected in feed URL
      // tslint:disable-next-line:no-any
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
        defaultProps.datafeedUrl
      ),
      interval:
        defaultProps.interval,
      container_id:
        defaultProps.containerId,
      library_path: defaultProps.libraryPath as string,
      locale: "en",
      disabled_features: [
        "header_compare",
        "header_undo_redo",
        "use_localstorage_for_settings",
        "volume_force_overlay",
        "timeframes_toolbar",
        "show_logo_on_all_charts",
        "caption_buttons_text_if_possible",
        "compare_symbol",
        "show_interval_dialog_on_key_press",
        "header_symbol_search",
        "remove_library_container_border",
        "left_toolbar",
        "header_symbol_search",
        "symbol_search_hot_key",
        // 'header_widget',
        "border_around_the_chart",
      ],
      enabled_features: ["volume_force_overlay"],
      load_last_chart: true,
      client_id: defaultProps.clientId,
      user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      studies_overrides: defaultProps.studiesOverrides,
      theme: "Dark",
      overrides: {
        "mainSeriesProperties.style": 1,
        // TODO: Fix this compiler bug
        // Cannot access ambient const enums when the '--isolatedModules' flag is provided.
        // ? ChartStyle.Line
        // : ChartStyle.Candle,
        "paneProperties.background": "#140D22",
        "paneProperties.vertGridProperties.color": "rgba(0,0,0,0)",
        "paneProperties.horzGridProperties.color": "rgba(0,0,0,0)",
        "scalesProperties.textColor": "#6A7DA1",
        "mainSeriesProperties.candleStyle.upColor": "#43B88E",
        "mainSeriesProperties.candleStyle.downColor": "#D43162",
        "mainSeriesProperties.candleStyle.drawWick": true,
        "mainSeriesProperties.candleStyle.drawBorder": true,
        "mainSeriesProperties.candleStyle.borderColor": "#43B88E",
        "mainSeriesProperties.candleStyle.borderUpColor": "#43B88E",
        "mainSeriesProperties.candleStyle.borderDownColor": "#D43162",
        "mainSeriesProperties.candleStyle.wickUpColor": "#43B88E",
        "mainSeriesProperties.candleStyle.wickDownColor": "#D43162",
        "mainSeriesProperties.lineStyle.color": "#D6B1FE",
        ...chartStyleOverrides,
      },
      loading_screen: { backgroundColor: "#140D22" },
      custom_css_url: "/charting_library/themed.css",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
    };

    const tvWidget = new widget(widgetOptions);
    tvWidgetRef.current = tvWidget;

    tvWidget.onChartReady(() => {
      void tvWidget.headerReady();
      setChartReady(true);
    });
  }, []);

  React.useEffect(() => {
    if (!tvWidgetRef.current) return;
    if (!chartReady) return;
    tvWidgetRef.current.chart().setSymbol((selectedAsset || "SOL") + "/USD");
  }, [chartReady, selectedAsset]);

  return <div id={defaultProps.containerId} className={className} />;
};
