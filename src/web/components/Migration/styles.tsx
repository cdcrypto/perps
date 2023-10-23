import styled from "styled-components";
import { Text } from "@components/Text";
import { Button } from "@components/Button";

export const MigrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const LogoContainer = styled.div``;
export const TitleText = styled(Text)`
  color: #e9f0ff;
  text-align: center;
  /* Display */
  font-family: Sora;
  font-size: 2rem;
  font-weight: 500;
  line-height: 2.5rem;
  margin-top: 1rem;
`;
export const InfoText = styled(Text)`
  color: #e9f0ff;
  text-align: center;

  /* Body1 */
  font-size: 1rem;
  font-family: Sora;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  white-space: pre-line;
`;

export const ActionButton = styled(Button)`
  margin-top: 1.5rem;
  display: flex;
  width: 18.75rem;
  padding: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1.5rem;
`;
