export const TWITTER_SHARE_URL = "https://twitter.com/intent/tweet";

export const shareTweet = (text: string, url?: string) => {
  const shareUrl = `${TWITTER_SHARE_URL}?text=${encodeURIComponent(text)}${url ? `&url=${encodeURIComponent(url)}` : ""}`;
  window.open(shareUrl, "_blank");
};
