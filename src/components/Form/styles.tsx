import styled from "styled-components";
import { Text } from "../Text";


export const SettingsSectionContainer = styled.div`
  width: 640px;
  margin: 4px 0 0 0;
  padding: 24px 16px 16px 16px;
  border-radius: 12px;
  box-sizing: border-box; 
  background: ${({ theme }) => theme.background[300]};
`;

export const SettingsSectionTitle = styled(Text)`
  margin-bottom: 24px;
`;

export const SettingsSubSectionContainer = styled.div`
  padding: 0 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.background[200]};
`;

export const FormFieldContainer = styled.div<{ $border?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme, $border = true }) => $border ? theme.grey[900] : "transparent"};

  &:last-child {
    border-bottom: none;
  }
`;

export const FormFieldTitle = styled(Text)`
  font-weight: 500;
`;
