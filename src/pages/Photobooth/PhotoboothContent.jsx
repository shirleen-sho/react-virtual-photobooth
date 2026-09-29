import { usePhotobooth } from "../../context/usePhotobooth";
import { getLayout } from "../../utils/getLayout";
import { initializePhotos } from "../../utils/initializePhotos";

import Button from "../../components/Button";

function PhotoboothContent() {
  const {
    currentStep,
    isFirstStep,
    isLastStep,
    goBack,
    goNext,
    layout,
    photos,
    setPhotos,
    setFrame,
  } = usePhotobooth();

  const currentTitle = currentStep?.title;
  const CurrentContent = currentStep?.content;

  const stepHandlers = {
    layout: () => {
      if (!photos?.length) {
        // re-init photos src to null only when user change the layout (setPhotos[])
        const selectedLayout = getLayout(layout);
        setPhotos(initializePhotos(selectedLayout));
        setFrame(null);
      }
    },
  };

  const handleNext = () => {
    stepHandlers[currentStep.key]?.();
    goNext();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Photobooth Navigation Bar */}
      <div className="w-full h-14 grid grid-cols-5 sm:grid-cols-9 items-center text-center text-primary-700">
        <div className="col-span-1 sm:col-span-2 flex">
          {!isFirstStep && (
            <Button onClick={goBack} variant="secondary">
              <span className="sm:hidden">&larr;</span>
              <span className="hidden sm:inline">&larr; Back</span>
            </Button>
          )}
        </div>
        <span className="col-span-3 sm:col-span-5 font-semibold text-lg sm:text-2xl px-2">
          {currentTitle}
        </span>
        <div className="col-span-1 sm:col-span-2 flex justify-end">
          {!isLastStep && (
            <Button onClick={handleNext} variant="secondary">
              <span className="sm:hidden">&rarr;</span>
              <span className="hidden sm:inline">Next &rarr;</span>
            </Button>
          )}
        </div>
      </div>
      {/* Photobooth Content */}
      {CurrentContent && <CurrentContent />}
    </div>
  );
}

export default PhotoboothContent;
