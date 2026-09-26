import { usePhotobooth } from "../../../context/usePhotobooth";
import { photoboothFrames } from "../../../constants/photoboothFrames";

// Step 2
function StepFrame() {
  const { layout, frame, setFrame } = usePhotobooth();
  const filteredFrames = photoboothFrames.filter((f) => f.layoutKey === layout);
  return (
    <div className="flex gap-5">
      {filteredFrames.map((frame) => (
        <img
          src={frame.src}
          key={frame.key}
          className="w-36"
          onClick={() => setFrame(frame.key)}
        />
      ))}
    </div>
  );
}

export default StepFrame;
