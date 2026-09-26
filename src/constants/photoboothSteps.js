import StepLayout from "../pages/Photobooth/components/StepLayout";
import StepFrame from "../pages/Photobooth/components/StepFrame";
import StepCamera from "../pages/Photobooth/components/StepCamera";
import StepDecorate from "../pages/Photobooth/components/StepDecorate";
import StepDownload from "../pages/Photobooth/components/StepDownload";

export const photoboothSteps = [
  { key: "layout", title: "Choose your layout", content: StepLayout },
  { key: "frame", title: "Choose your frame style", content: StepFrame },
  { key: "camera", title: "Pose to the camera", content: StepCamera },
  {
    key: "decorate",
    title: "Decorate your photostrip",
    content: StepDecorate,
  },
  {
    key: "download",
    title: "Download the result",
    content: StepDownload,
  },
];
