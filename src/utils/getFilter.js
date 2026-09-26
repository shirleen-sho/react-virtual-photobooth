import { photoboothFilters } from "../constants/photoboothFilters";

export function getFilter(key) {
  return photoboothFilters.find((f) => f.key === key);
}
