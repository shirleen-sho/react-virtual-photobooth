import { useContext } from "react";
import { PhotoboothContext } from "./PhotoboothContext";

export function usePhotobooth() {
  return useContext(PhotoboothContext);
}
