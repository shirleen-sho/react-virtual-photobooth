import { photoboothSteps } from "../constants/photoboothSteps";

export const initialState = {
  step: "layout",
  layout: "layout_A",
  frame: null,
  photos: [],
  filter: "normal",
  backgroundColor: "#ffffff",
  dateStamp: null,
  timeStamp: null,
  showTimeStamp: true,
  customText: "(custom text here)",
  showCustomText: false,
  stickers: [],
};

export function photoboothReducer(state, action) {
  const currentIndex = photoboothSteps.findIndex((s) => s.key === state.step);
  switch (action.type) {
    case "GO_BACK":
      if (currentIndex > 0) {
        return { ...state, step: photoboothSteps[currentIndex - 1].key };
      } else {
        return state;
      }

    case "GO_NEXT":
      if (currentIndex < photoboothSteps.length - 1) {
        return { ...state, step: photoboothSteps[currentIndex + 1].key };
      } else {
        return state;
      }

    case "CHANGE_LAYOUT":
      return { ...state, layout: action.payload };

    case "CHANGE_FRAME":
      return { ...state, frame: action.payload };

    case "CHANGE_FILTER":
      return { ...state, filter: action.payload };

    case "ADD_NEW_PHOTO": {
      const emptyPhoto = state.photos.find((p) => !p.src); // search where src = null
      if (!emptyPhoto) return state; // full slots

      const updatedArr = state.photos.map((p) =>
        p.id === emptyPhoto.id ? { ...p, src: action.payload } : p,
      );
      return {
        ...state,
        photos: updatedArr,
      };
    }

    case "DELETE_PHOTO": {
      // fixed slot, only delete the src
      const updatedArr = state.photos.map((p) =>
        p.id === action.payload ? { ...p, src: null } : p,
      );
      return {
        ...state,
        photos: updatedArr,
      };
    }

    case "SET_PHOTOS": {
      return {
        ...state,
        photos: action.payload,
      };
    }

    case "ADD_NEW_STICKER":
      return {
        ...state,
        stickers: [...state.stickers, action.payload],
      };

    case "UPDATE_STICKER": {
      const { id, newProps } = action.payload;
      const updatedArr = state.stickers.map((s) =>
        s.id === id ? { ...s, ...newProps } : s,
      );
      return {
        ...state,
        stickers: updatedArr,
      };
    }

    case "DELETE_STICKER": {
      const updatedArr = state.stickers.filter((s) => s.id !== action.payload);
      return {
        ...state,
        stickers: updatedArr,
      };
    }

    case "CHANGE_BACKGROUND_COLOR":
      return {
        ...state,
        backgroundColor: action.payload,
      };

    case "SET_STAMPS": {
      const now = new Date();
      const date = now.toLocaleDateString("en-GB");
      const time = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return {
        ...state,
        dateStamp: date,
        timeStamp: time,
      };
    }

    case "SET_SHOW_TIME_STAMP":
      return { ...state, showTimeStamp: action.payload };

    case "SET_CUSTOM_TEXT":
      return { ...state, customText: action.payload };

    case "SET_SHOW_CUSTOM_TEXT":
      return { ...state, showCustomText: action.payload };

    default:
      throw new Error(`Unknown action type: ${action.type}`); // or return state kalau mau diabaikan aja;
  }
}
