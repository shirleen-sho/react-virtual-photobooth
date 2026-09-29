import { usePhotobooth } from "../../../context/usePhotobooth";
import { photoboothFrames } from "../../../constants/photoboothFrames";

// Step 2
function StepFrame() {
  const { layout, frame, setFrame } = usePhotobooth();
  const filteredFrames = photoboothFrames.filter((f) => f.layoutKey === layout);

  const handleSelectFrame = (selected) => {
    setFrame(selected);
  };

  return (
    <div className="flex flex-wrap gap-8 justify-center">
      <button
        className={`w-28 min-h-14 cursor-pointer rounded-xl shadow-lg border-[3px] transition duration-400 ease-in-out hover:scale-110 hover:-translate-y-0.5 ${
          frame === null ? "border-primary-500 scale-110" : "border-transparent"
        }`}
        onClick={() => handleSelectFrame(null)}
      >
        None
      </button>
      {filteredFrames.map((f) => (
        <img
          src={f.src}
          key={"frame-" + f.key}
          className={`w-28 cursor-pointer rounded-xl shadow-lg border-[3px] transition duration-400 ease-in-out hover:scale-110 hover:-translate-y-0.5 ${
            frame === f.key
              ? "border-primary-500 scale-110"
              : "border-transparent"
          }`}
          onClick={() => handleSelectFrame(f.key)}
        />
      ))}
    </div>
  );
}

export default StepFrame;
