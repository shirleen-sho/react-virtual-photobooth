import { PhotoboothProvider } from "../../context/PhotoboothProvider";
import PhotoboothContent from "./PhotoboothContent";

function Photobooth() {
  return (
    <PhotoboothProvider>
      <PhotoboothContent />
    </PhotoboothProvider>
  );
}

export default Photobooth;
