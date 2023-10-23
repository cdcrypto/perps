import { StyledSkeleton } from "@components/Table/styles";
import { SkeletonContainer } from "./styles";

export const TradeableAssetSkeleton = () =>
  <SkeletonContainer>
    <StyledSkeleton height={20} /><StyledSkeleton width={40} height={16} />
  </SkeletonContainer>;
