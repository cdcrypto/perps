import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) => `1px solid ${props.theme.grey[700]}`};
`;
