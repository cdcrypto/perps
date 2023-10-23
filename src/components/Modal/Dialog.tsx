import { DialogContent, DialogHeader } from "./styles";

export const DialogContentWrapper = ({
  title,
  children,
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <DialogContent>
      {title !== undefined && (
        <DialogHeader variant="h3" color="highlight">
          {title}
        </DialogHeader>
      )}
      {children}
    </DialogContent>
  );
};
