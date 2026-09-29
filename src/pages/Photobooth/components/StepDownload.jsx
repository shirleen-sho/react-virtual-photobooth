import { useState, useEffect } from "react";
import GIF from "gif.js";
import workerScript from "gif.js/dist/gif.worker.js?url";

import { usePhotobooth } from "../../../context/usePhotobooth";
import { useGeneratePhotostripCanvas } from "../../../hooks/useGeneratePhotostripCanvas";

import Button from "../../../components/Button";

// Step 5
function StepDownload() {
  // global state
  const { selectedLayout, photos, selectedFilter } = usePhotobooth();

  // component state
  const [isLoading, setIsLoading] = useState(false);
  const [imageResult, setImageResult] = useState(null);

  // function
  const handleDownloadPNG = () => {
    const link = document.createElement("a");
    link.href = imageResult;
    link.download = "photobooth.png";
    link.click();
  };

  const handleDownloadGIF = async () => {
    const images = await Promise.all(
      photos
        .filter((photo) => photo.src)
        .map(
          (photo) =>
            new Promise((resolve, reject) => {
              const image = new Image();

              image.onload = () => resolve(image);
              image.onerror = reject;
              image.src = photo.src;
            }),
        ),
    );

    if (images.length === 0) return;

    const width = images[0].naturalWidth;
    const height = images[0].naturalHeight;

    const gif = new GIF({
      workers: 2,
      quality: 10,
      width,
      height,
      workerScript,
    });

    images.forEach((image) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.filter = selectedFilter.value;
      ctx.drawImage(image, 0, 0, width, height);

      gif.addFrame(canvas, {
        delay: 750,
        copy: true,
      });
    });

    gif.on("progress", (progress) => {
      console.log("GIF progress:", progress);
    });

    gif.on("finished", (blob) => {
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "photobooth.gif";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    });

    gif.render();
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
    <div className="w-full flex flex-col sm:flex-row gap-10 sm:gap-15 lg:gap-20 justify-center items-center">
      <img
        src={imageResult}
        className={`${selectedLayout.cols === 1 ? "w-40" : "w-full max-w-80"} shadow-md`}
      />
      <div className="flex flex-col gap-5 items-center">
        <Button
          variant="primary"
          additionalStyle={{ width: "100%" }}
          onClick={handleDownloadPNG}
        >
          Download .PNG
        </Button>
        <Button
          variant="primary"
          additionalStyle={{ width: "100%" }}
          onClick={handleDownloadGIF}
        >
          Download .GIF
        </Button>
        <Button
          variant="secondary"
          linkToPage="/"
          additionalStyle={{ width: "100%" }}
        >
          Start Over
        </Button>
      </div>
    </div>
  );
}

export default StepDownload;
