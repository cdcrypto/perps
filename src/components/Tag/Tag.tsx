import { BuyTag, StandardTag, SellTag } from "./styles";

type TagProps = {
  /**
   * The actual text component that is passed in
   */
  children: string | JSX.Element;
  /**
   * The style of tag chosen
   */
  variant: "standard" | "buy" | "sell";
  className?: string;
};

export const Tag = ({ children, variant, className }: TagProps) => {
  switch (variant) {
    case "standard":
      return <StandardTag className={className}>{children}</StandardTag>;
    case "buy":
      return <BuyTag className={className}>{children}</BuyTag>;
    case "sell":
      return <SellTag className={className}>{children}</SellTag>;
  }
};
