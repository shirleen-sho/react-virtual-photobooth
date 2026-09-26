import { useRef, useState, useEffect } from "react";

import { usePhotobooth } from "../../../context/usePhotobooth";
import { useGeneratePhotostripCanvas } from "../../../hooks/useGeneratePhotostripCanvas";

import Button from "../../../components/Button";

// Step 5
function StepDownload() {
  // global state
  const { selectedLayout } = usePhotobooth();

  // component state
  const [isLoading, setIsLoading] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const canvasRef = useRef(null);

  // function
  const handleDownloadPNG = () => {
    const link = document.createElement("a");
    link.href = imageResult;
    link.download = "photobooth.png";
    link.click();
  };

  // hooks
  const { generate } = useGeneratePhotostripCanvas();

  useEffect(() => {
    async function generateFinalStrip() {
      setIsLoading(true);

      const canvasFinalStrip = await generate({ width: 1200 });
      setImageResult(canvasFinalStrip.toDataURL("image/png"));

      setIsLoading(false);
    }
    generateFinalStrip();
  }, [generate]);

  return isLoading ? (
    <div className="w-full text-center">Rendering your photostrip...</div>
  ) : (
    <div className="w-full flex gap-20 justify-center items-center">
      <img
        src={imageResult}
        className={`${selectedLayout.cols === 1 ? "w-40" : "w-full max-w-80"} shadow-md`}
      />
      <div className="bg-yellow-200 flex flex-col gap-5 items-center">
        <Button variant="primary" onClick={handleDownloadPNG}>
          Download .PNG
        </Button>
        <Button variant="primary">Download .GIF</Button>
      </div>
    </div>
  );
}

export default StepDownload;
