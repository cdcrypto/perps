import { FormFieldContainer, FormFieldTitle, SettingsSectionContainer, SettingsSectionTitle, SettingsSubSectionContainer } from "./styles";

export interface FormSectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export interface FormSubSectionProps {
  children: React.ReactNode;
}

export type FormFieldProps = FormSubSectionProps & { $border?: boolean, title?: React.ReactNode; };

export const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <SettingsSectionContainer>
      <SettingsSectionTitle variant="h2" color="highlight">{title}</SettingsSectionTitle>
      {children}
    </SettingsSectionContainer>
  );
};

export const FormSubSection = ({ children }: FormSubSectionProps) => {
  return (
    <SettingsSubSectionContainer>
      {children}
    </SettingsSubSectionContainer>
  );
};

export const FormField = ({ title, children, $border }: FormFieldProps) => {
  return (
    <FormFieldContainer $border={$border}>
      {title && <FormFieldTitle variant="h4" color="primary">{title}</FormFieldTitle>}
      <div>
        {children}
      </div>
    </FormFieldContainer>
  );
};
