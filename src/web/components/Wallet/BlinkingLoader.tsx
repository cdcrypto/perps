import { BlinkingDot, BlinkingDotsWrapper } from "./styles";

const DEFAULT_DOTS_COUNT = 5;
const DEFAULT_BLINK_SECONDS = 1;

interface BlinkingLoaderProps {
  dotsCount?: number;
  blinkSeconds?: number;
}

export const BlinkingLoader = ({
  dotsCount: dotsCountProp,
  blinkSeconds: blinkSecondsProp,
}: BlinkingLoaderProps) => {
  const dotCounts = dotsCountProp ?? DEFAULT_DOTS_COUNT;
  const blinkSeconds = blinkSecondsProp ?? DEFAULT_BLINK_SECONDS;

  return (
    <BlinkingDotsWrapper>
      {Array.from({ length: dotsCountProp ?? DEFAULT_DOTS_COUNT }, (_, i) => (
        <BlinkingDot
          key={i}
          style={{
            animationDuration: `${blinkSeconds}s`,
            animationDelay: `${(blinkSeconds / dotCounts) * i}s`,
          }}
        />
      ))}
    </BlinkingDotsWrapper>
  );
};
