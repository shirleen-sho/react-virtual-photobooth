import { useCallback } from "react";
import { usePhotobooth } from "../context/usePhotobooth";
import { generatePhotostripCanvas } from "../utils/generatePhotostripCanvas";

export function useGeneratePhotostripCanvas() {
  const {
    selectedLayout,
    selectedFrame,
    photos,
    selectedFilter,
    backgroundColor,
    dateStamp,
    timeStamp,
    showTimeStamp,
    customText,
    showCustomText,
    stickers,
  } = usePhotobooth();

  const generate = useCallback(
    async ({ width }) => {
      return await generatePhotostripCanvas({
        layout: selectedLayout,
        frame: selectedFrame,
        photos,
        filter: selectedFilter,
        backgroundColor,
        dateStamp,
        timeStamp,
        showTimeStamp,
        customText,
        showCustomText,
        stickers,
        width,
      });
    },
    [
      selectedLayout,
      selectedFrame,
      photos,
      selectedFilter,
      backgroundColor,
      dateStamp,
      timeStamp,
      showTimeStamp,
      customText,
      showCustomText,
      stickers,
    ],
  );

  return { generate };
}
