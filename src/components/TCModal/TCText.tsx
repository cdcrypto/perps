import { TCTextContent, ExternalLink } from "./styles";

export const TCText = () => {
  const EJ_LINK =
    "https://docs.zeta.markets/educational-resources/support#geo-restrictions";
  return (
    <TCTextContent>
      <ul>
        <li>
          You are not a person or company who is a resident of, located in or
          incorporated in the United States or another{" "}
          <ExternalLink href={EJ_LINK}>excluded jurisdiction</ExternalLink>.
        </li>
        <li>
          You will not in the future access or use Zeta while located within the
          United States or another excluded jurisdiction.
        </li>
        <li>
          You are not using, and will not in the future use a VPN to mask your
          physical location whilst located in the United States or another
          excluded jurisdiction.
        </li>
        <li>
          You have full authority to access Zeta and to enter into and comply
          with these Terms and Conditions and Privacy Policy.
        </li>
        <li>
          You are lawfully permitted to access and use Zeta under the laws of
          the jurisdiction in which you reside and are located.
        </li>
        <li>
          You are knowledgeable about and understand the risks associated with
          blockchain-based digital assets and options, futures and perps
          trading.
        </li>
      </ul>
    </TCTextContent>
  );
};
