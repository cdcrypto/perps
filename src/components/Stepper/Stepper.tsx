import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel, { stepLabelClasses } from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";

const QontoLabel = styled(StepLabel)(() => ({
  [`&.${stepLabelClasses.label}`]: {
    color: "#F2E2FF",
  },
  [`&.${stepLabelClasses.root}`]: {
    color: "#F2E2FF",
  },
  [`&.${stepLabelClasses.labelContainer}`]: {
    color: "#F2E2FF",
  },
  "MuiStepLabel-label": {
    color: "#F2E2FF",
  },
}));

const QontoConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#0295FF",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#0295FF",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#3F3050",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ ownerState }) => ({
    color: "#3F3050",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#E9F0FF",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#0295FF",
      zIndex: 1,
      fontSize: 18,
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        // <Circle className="QontoStepIcon-completedIcon" />
        <div className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

interface ProgressStepperProps {
  steps: string[];
  activeStep: number;
  className?: string;
}

export function ProgressStepper({
  steps,
  activeStep,
  className,
}: ProgressStepperProps) {
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<QontoConnector />}
      className={className}
      sx={{
        width: "100%",
      }}
    >
      {steps.map((label) => (
        <Step
          key={label}
          sx={{
            "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
              color: "#5D6D8B", // Just text label (ACTIVE)
              fontFamily: "Sora",
            },
            "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
              {
                color: "#F2E2FF", // Just text label (ACTIVE)
                fontFamily: "Sora",
              },
            "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
              color: "#F2E2FF", // Just text label (COMPLETED)
              fontFamily: "Sora",
            },
          }}
        >
          <QontoLabel
            sx={{ label: { color: "red", fontFamily: "Sora" } }}
            // classes={{
            //   "MuiStepLabel-label": { color: "red" },
            //   label: { color: "red" },
            // }}
            StepIconComponent={QontoStepIcon}
            color="#F2E2FF"
          >
            {label}
          </QontoLabel>
        </Step>
      ))}
    </Stepper>
  );
}
