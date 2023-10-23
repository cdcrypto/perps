import { AmplitudeClient } from "analytics/amplitude";

export { AnalyticsEvent } from "analytics/Analytics";
export { AmplitudeClient as AnalyticsClient } from "analytics/amplitude";
export { Analytics } from "analytics/Analytics";

export type { AnalyticsActions } from "analytics/interface";

export const analytics = new AmplitudeClient();
