import styled from "styled-components";

export const DWDItem = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  white-space: pre-wrap;
  height: 100%;
`;

export const DWDItemLabel = styled.div`
  margin-left: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: ${(props) => props.theme.typography.clickable.enabled};
`;

export const DWDItemDescription = styled.div`
  margin-left: 8px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: ${(props) => props.theme.typography.secondary};
`;
