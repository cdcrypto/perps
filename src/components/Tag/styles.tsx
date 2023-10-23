import styled from "styled-components";

export const Tag = styled.div`
  display: inline-flex;
  font-size: 16px;
  font-weight: 500;
  gap: 4px;
  padding: 7px 12px 6px 12px;
  border-radius: 6px;
  min-width: 65px;
  height: 24px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 0.5px solid transparent;
`;

export const StandardTag = styled(Tag)`
  background: ${(props) => props.theme.plum[400]};
  color: ${(props) => props.theme.typography.clickable.active};
  border: ${(props) =>
    `0.5px solid ${props.theme.typography.clickable.active}`};
`;

export const BuyTag = styled(Tag)`
  background: ${(props) => props.theme.green[300]};
  color: ${(props) => props.theme.typography.long};
`;

export const SellTag = styled(Tag)`
  background: ${(props) => props.theme.red[300]};
  color: ${(props) => props.theme.typography.short};
`;
