import { useReducer, useMemo } from "react";

import { initialState, photoboothReducer } from "./photoboothReducer";
import { PhotoboothContext } from "./PhotoboothContext";

import { photoboothSteps } from "../constants/photoboothSteps";
import { getLayout } from "../utils/getLayout";
import { getFrame } from "../utils/getFrame";
import { getFilter } from "../utils/getFilter";

export function PhotoboothProvider({ children }) {
  const [state, dispatch] = useReducer(photoboothReducer, initialState);

  const currentIndex = photoboothSteps.findIndex((s) => s.key === state.step);
  const currentStep = photoboothSteps[currentIndex];
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === photoboothSteps.length - 1;

  const selectedLayout = useMemo(() => getLayout(state.layout), [state.layout]);
  const selectedFrame = useMemo(() => getFrame(state.frame), [state.frame]);
  const selectedFilter = useMemo(() => getFilter(state.filter), [state.filter]);

  const value = {
    step: state.step,
    currentStep,
    isFirstStep,
    isLastStep,
    goBack: () => dispatch({ type: "GO_BACK" }),
    goNext: () => dispatch({ type: "GO_NEXT" }),
    layout: state.layout,
    setLayout: (selectedLayout) =>
      dispatch({ type: "CHANGE_LAYOUT", payload: selectedLayout }),
    selectedLayout,
    frame: state.frame,
    setFrame: (selectedFrame) =>
      dispatch({ type: "CHANGE_FRAME", payload: selectedFrame }),
    selectedFrame,
    photos: state.photos,
    addNewPhoto: (newPhoto) =>
      dispatch({ type: "ADD_NEW_PHOTO", payload: newPhoto }),
    deletePhoto: (photoId) =>
      dispatch({ type: "DELETE_PHOTO", payload: photoId }),
    setPhotos: (arr) => dispatch({ type: "SET_PHOTOS", payload: arr }),
    filter: state.filter,
    setFilter: (selectedFilter) =>
      dispatch({ type: "CHANGE_FILTER", payload: selectedFilter }),
    selectedFilter,
    backgroundColor: state.backgroundColor,
    setBackgroundColor: (selectedColor) =>
      dispatch({ type: "CHANGE_BACKGROUND_COLOR", payload: selectedColor }),
    dateStamp: state.dateStamp,
    timeStamp: state.timeStamp,
    setStamps: () => dispatch({ type: "SET_STAMPS" }),
    showTimeStamp: state.showTimeStamp,
    setShowTimeStamp: (bool1) =>
      dispatch({ type: "SET_SHOW_TIME_STAMP", payload: bool1 }),
    customText: state.customText,
    setCustomText: (text) =>
      dispatch({ type: "SET_CUSTOM_TEXT", payload: text }),
    showCustomText: state.showCustomText,
    setShowCustomText: (bool2) =>
      dispatch({ type: "SET_SHOW_CUSTOM_TEXT", payload: bool2 }),
    stickers: state.stickers,
    addNewSticker: (newSticker) =>
      dispatch({ type: "ADD_NEW_STICKER", payload: newSticker }),
    updateSticker: (id, newProps) =>
      dispatch({
        type: "UPDATE_STICKER",
        payload: { id, newProps },
      }),
    deleteSticker: (id) => dispatch({ type: "DELETE_STICKER", payload: id }),
    state: state,
  };

  return (
    <PhotoboothContext.Provider value={value}>
      {children}
    </PhotoboothContext.Provider>
  );
}
