import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";

import { usePhotobooth } from "../../../context/usePhotobooth";
import { photoboothFilters } from "../../../constants/photoboothFilters";
import { cropImageToRatio } from "../../../utils/cropImageToRatio";

import Toggle from "../../../components/Toggle";
import SelectButtons from "../../../components/SelectButtons";
import Button from "../../../components/Button";
import { X } from "lucide-react";

// Step 3
function StepCamera() {
  const webcamRef = useRef(null);

  // global state
  const {
    selectedLayout,
    filter,
    selectedFilter,
    setFilter,
    photos,
    addNewPhoto,
    deletePhoto,
    setStamps,
  } = usePhotobooth();

  // component state
  const [isAutoCapture, setIsAutoCapture] = useState(true);
  const [mirrored, setMirrored] = useState(true);
  const [selectedCountdown, setSelectedCountdown] = useState(3);
  const [countdown, setCountdown] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [remainingShots, setRemainingShots] = useState(0);
  const [isWaitingNextShot, setIsWaitingNextShot] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isOpenPreview, setIsOpenPreview] = useState(false);

  // derived state
  const filledPhotos = photos.filter((p) => p.src);
  const isMax = filledPhotos?.length >= selectedLayout.totalPhotos;

  // component constants
  const countdownOptions = [
    { key: 3, label: "3s", value: 3 },
    { key: 5, label: "5s", value: 5 },
    { key: 7, label: "7s", value: 7 },
    { key: 10, label: "10s", value: 10 },
  ];

  useEffect(() => {
    if (isMax) {
      setStamps();
    }
  }, [isMax]);

  const capturePhoto = async () => {
    setIsFlashing(true);

    const newPhoto = webcamRef.current.getScreenshot();
    const newPhotoCropped = await cropImageToRatio(newPhoto, 4 / 3);
    addNewPhoto(newPhotoCropped);

    setTimeout(() => {
      setIsFlashing(false);
    }, 500);
  };

  const handleStartCapture = () => {
    if (!isAutoCapture) {
      setCountdown(selectedCountdown);
      setIsCounting(true);
    } else {
      const shots = selectedLayout.totalPhotos - filledPhotos.length;
      if (shots <= 0) return;
      setRemainingShots(shots);
      setCountdown(selectedCountdown);
      setIsCounting(true);
    }
  };

  useEffect(() => {
    if (!isCounting) return;

    if (isWaitingNextShot) return;

    if (countdown <= 0) {
      capturePhoto();

      if (isAutoCapture) {
        if (remainingShots > 1) {
          setRemainingShots((prev) => prev - 1);
          setIsWaitingNextShot(true);
          // delay before continue to the next countdown
          setTimeout(() => {
            setCountdown(selectedCountdown);
            setIsWaitingNextShot(false);
          }, 2000);
        } else {
          setIsCounting(false);
          setRemainingShots(0);
        }
      } else {
        setIsCounting(false);
      }

      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, isCounting, isAutoCapture, remainingShots, selectedCountdown]);

  const handleOpenPreview = (image) => {
    setPreviewImage(image.src);
    setTimeout(() => setIsOpenPreview(true), 100);
  };

  const handleClosePreview = () => {
    setIsOpenPreview(false);
    setTimeout(() => setPreviewImage(null), 300);
  };

  const handleDeletePhoto = (id) => {
    deletePhoto(id);
  };

  return (
    <>
      {/* Flash Effect & Interaction Blocker */}
      <div
        className={`fixed inset-0 bg-primary-300 z-50 transition-opacity duration-1000 ease-out ${
          isFlashing ? "opacity-90" : "opacity-0"
        } ${isCounting || isFlashing ? "pointer-events-auto cursor-not-allowed" : "pointer-events-none"}`}
      />
      {/* Preview Big Image */}
      {previewImage && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-40 transition-all duration-300 ${
            isOpenPreview ? "bg-black/70 opacity-100" : "bg-black/0 opacity-0"
          }`}
          onClick={() => handleClosePreview()}
        >
          <img
            src={previewImage}
            className={`max-w-[90%] max-h-[90%] object-contain transition-all duration-300 ${
              isOpenPreview ? "scale-100" : "scale-90"
            }`}
            style={{ filter: selectedFilter.value }}
          />
        </div>
      )}
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-15 lg:gap-20">
        {/* Choose Filter & Countdown */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span>Filter :</span>
            <SelectButtons
              value={filter}
              options={photoboothFilters}
              onChange={(selected) => setFilter(selected)}
            />
          </div>
          <div className="flex flex-col gap-3.5">
            <span>Countdown :</span>
            <SelectButtons
              value={selectedCountdown}
              options={countdownOptions}
              onChange={(selected) => setSelectedCountdown(selected)}
            />
          </div>
        </div>
        {/* Webcam & Capture Button */}
        <div className="lg:col-span-2 w-full flex flex-col gap-8 items-center">
          <div className="relative w-full rounded-xl overflow-hidden shadow-md border-[3px] border-primary-500">
            <Webcam
              audio={false}
              mirrored={mirrored}
              ref={webcamRef}
              screenshotFormat="image/png"
              screenshotQuality={1}
              forceScreenshotSourceSize={true}
              videoConstraints={{
                width: { ideal: 1920 },
                height: { ideal: 1080 },
                facingMode: "user",
              }}
              className="w-full aspect-4/3 object-cover"
              style={{ filter: selectedFilter.value }}
            />
            {/* Countdown */}
            {isCounting && (
              <div className="absolute inset-0 z-10 flex items-center justify-center font-bold text-white font-outline-3">
                {countdown > 0 ? (
                  <span
                    className="text-9xl animate-zoom-in"
                    key={"countdown-" + countdown}
                  >
                    {countdown}
                  </span>
                ) : (
                  <span className="text-8xl tracking-wider">...</span>
                )}
              </div>
            )}
          </div>
          <Button
            onClick={handleStartCapture}
            disabled={isCounting || isMax}
            variant="primary"
          >
            Capture
          </Button>
        </div>
        {/* Preview Captured Photos */}
        <div className="lg:col-span-1 flex flex-col gap-12 lg:gap-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-row lg:flex-col gap-4 justify-center lg:justify-baseline items-center lg:items-baseline">
              <span>Auto Capture :</span>
              <Toggle
                enabled={isAutoCapture}
                setEnabled={() => setIsAutoCapture(!isAutoCapture)}
                key="toggleIsAutoCapture"
              />
            </div>
            <div className="flex flex-row lg:flex-col gap-4 justify-center lg:justify-baseline items-center lg:items-baseline">
              <span>Mirror :</span>
              <Toggle
                enabled={mirrored}
                setEnabled={() => setMirrored(!mirrored)}
                key="toggleMirrored"
              />
            </div>
            <div className="flex flex-row lg:flex-col gap-4 justify-center lg:justify-baseline items-center lg:items-baseline">
              <span>Your Photos :</span>
              <span className="w-fit px-4 py-2 rounded-xl text-sm font-semibold bg-primary-300">
                {`${
                  filledPhotos.length > 0 ? filledPhotos.length : "0"
                } / ${selectedLayout.totalPhotos}`}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            {photos.map((photo, i) => (
              <div className="relative aspect-4/3">
                {photo.src ? (
                  <>
                    <img
                      key={"photo" + i}
                      src={photo.src}
                      className="w-full h-full object-cover hover:cursor-zoom-in"
                      style={{ filter: selectedFilter.value }}
                      onClick={() => handleOpenPreview(photo)}
                    />
                    <Button
                      variant="danger"
                      shape="icon"
                      additionalClassName="absolute -top-2 -right-2"
                      onClick={() => handleDeletePhoto(photo.id)}
                      key={i}
                    >
                      <X className="w-3 h-3" strokeWidth={4} />
                    </Button>
                  </>
                ) : (
                  // Placeholder
                  <div className="w-full h-full bg-primary-600 flex justify-center items-center">
                    <span className="font-bold text-3xl text-primary-500">
                      {photo.id + 1}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default StepCamera;
