import { photoboothLayouts } from "../constants/photoboothLayouts";

export function getLayout(key) {
  return photoboothLayouts.find((l) => l.key === key);
}
