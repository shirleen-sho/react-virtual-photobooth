import { photoboothFrames } from "../constants/photoboothFrames";

export function getFrame(key) {
  return photoboothFrames.find((f) => f.key === key);
}
