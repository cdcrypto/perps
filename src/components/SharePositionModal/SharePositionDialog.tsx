import CopyIcon from "@assets/CopyIcon";
import DownloadIcon from "@assets/DownloadIcon";
import TwitterIcon from "@assets/TwitterIcon";
import { calculateMaxLeverage } from "@utils/calcs/calculateMaxLeverage";
import { convertDollarNumberToString, convertNumberToString } from "@utils/general";
import { shareTweet } from "@utils/social";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Side } from "@zetamarkets/sdk/dist/types";
import html2canvas, { Options } from "html2canvas";

import { useRef, useState } from "react";
import { AssetIcon } from "../AssetIcon";
import { Switcher } from "../Switcher";
import { Text } from "../Text";
import {
  AssetLabelWrap,
  BottomBarButton,
  Footer,
  LeveradgeBadgeWrap,
  LeverageBadge,
  LeverageBadgeInner,
  Logo,
  PnlSubtitle,
  PnlValue,
  PositionDetails,
  PositionDetailsBody,
  PositionDetailsTitle,
  PositionDialogContent,
  PositionDialogWrap,
  PositionSideBadge,
  SharePositionControls,
  SharedPositionWrap
} from "./styles";
import { notifications } from "../Notification";

export type SharePositionDialogProps = {
  unrealizedPnl: number;
  unrealizedPnlPercentage: number;
  asset: Asset;
  entryPrice: number;
  markPrice: number;
  initialMargin: number;
  side: Side;
}

const html2canvasOptions: Partial<Options> = {
  scale: 2,
  backgroundColor: null
};

export const SharePositionDialog = ({
  unrealizedPnl,
  unrealizedPnlPercentage,
  asset,
  entryPrice,
  markPrice,
  side,
}: SharePositionDialogProps) => {
  const [showUsd, setShowUsd] = useState(false);

  const copyRef = useRef<HTMLDivElement>(null);

  const copyImage = async () => {
    if (!copyRef.current) return;
    const element = copyRef.current;
    const img = await html2canvas(element, html2canvasOptions);

    img.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const item = new ClipboardItem(
        Object.defineProperty({}, blob.type, {
          value: blob,
          enumerable: true,
        })
      );

      navigator.clipboard.write([item])
        .then(() => notifications.notify({ variant: "success", header: "Success!", body: "Image copied to clipboard." }))
        .catch(() => notifications.notify({ variant: "error", header: "Error", body: "Image cannot be copied." }));
    });

  };

  const downloadImage = async () => {
    if (!copyRef.current) return;
    const element = copyRef.current;
    const img = await html2canvas(element, html2canvasOptions);

    const data = img.toDataURL("image/png");

    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = `Zeta-position-${asset}-PERP.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      notifications.notify({ variant: "success", header: "Success!", body: "Download started."});
    } else {
      window.open(data);
    }
  };

  const twitterShareText = unrealizedPnl > 0 ?
    "I just made some magic internet money on @zetamarkets." :
    "I just lost some magic internet money on @zetamarkets.";

  const tweet = () => {
    shareTweet(twitterShareText);
  };

  const pnlUsdValue = Math.abs(unrealizedPnl) < 0.01 ? "<$0.01" : convertDollarNumberToString(unrealizedPnl, undefined, 2);
  const pnlPctValue = Math.abs(unrealizedPnlPercentage) < 0.01 ? "<0.01%" : `${convertNumberToString(unrealizedPnlPercentage, undefined, 2)}%`;

  return (
    <SharedPositionWrap>
      <SharePositionControls>
        <Text variant="body2" color="primary">Share PnL in dollars</Text>
        <Switcher checked={showUsd} onSwitch={setShowUsd} />
      </SharePositionControls>
      <PositionDialogWrap ref={copyRef}>
        <PositionDialogContent>
          <Logo />
          <PnlValue variant="display" color={unrealizedPnl >= 0 ? "long" : "short"}>{
            showUsd ? pnlUsdValue : pnlPctValue
          }</PnlValue>
          <PnlSubtitle variant="body2" color="secondary">Profit &amp; Loss</PnlSubtitle>
          <PositionDetails>
            <PositionDetailsTitle>
              <AssetLabelWrap>
                <AssetIcon asset={asset} size={24} />
                <Text color="primary" variant="h3">
                  {asset}
                </Text>
                <Text color="secondary" variant="h3">
                  -PERP
                </Text>
              </AssetLabelWrap>

              <PositionSideBadge $isLong={side === Side.BID} variant="contained">{side === Side.BID ? "Long" : "Short"}</PositionSideBadge>
              <LeveradgeBadgeWrap>
                <Text color="secondary" variant="label">Max</Text>
                <LeverageBadge variant="outlined"><LeverageBadgeInner>{calculateMaxLeverage(asset)}x</LeverageBadgeInner></LeverageBadge>
              </LeveradgeBadgeWrap>
            </PositionDetailsTitle>
            <PositionDetailsBody>
              <div>
                <Text variant="h3" color="highlight">{convertDollarNumberToString(entryPrice)}</Text>
                <Text variant="h6" color="secondary">Entry Price</Text>
              </div>
              <div>
                <Text variant="h3" color="highlight">{convertDollarNumberToString(markPrice)}</Text>
                <Text variant="h6" color="secondary" rightAlign>Last Price</Text>
              </div>
            </PositionDetailsBody>
          </PositionDetails>
          <Footer>
            <Text variant="body2" color="primary">Join us on Zeta and start trading on our platform</Text>
            <Text variant="h2" color="highlight">www.zeta.markets</Text>
          </Footer>
        </PositionDialogContent>
      </PositionDialogWrap>
      <SharePositionControls>
        <BottomBarButton
          onClick={() => void copyImage()}
          label={
            <>
              <CopyIcon />
              Copy
            </>
          } variant="raw">
        </BottomBarButton>
        <BottomBarButton
          onClick={() => void downloadImage()}
          label={
            <>
              <DownloadIcon />
              Download
            </>
          } variant="raw">
        </BottomBarButton>
        <BottomBarButton
          onClick={tweet}
          label={
            <>
              <TwitterIcon />
              Tweet
            </>
          } variant="raw">
        </BottomBarButton>

      </SharePositionControls>
    </SharedPositionWrap>
  );
};
