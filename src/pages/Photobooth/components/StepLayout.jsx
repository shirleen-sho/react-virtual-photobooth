import { usePhotobooth } from "../../../context/usePhotobooth";
import { photoboothLayouts } from "../../../constants/photoboothLayouts";

import SelectCards from "../../../components/SelectCards";

// Step 1
function StepLayout() {
  const { layout, setLayout, setPhotos } = usePhotobooth();

  const handleSelectLayout = (selected) => {
    setLayout(selected);
    setPhotos([]);
  };

  return (
    <div className="w-full flex flex-row justify-center">
      <SelectCards
        value={layout}
        options={photoboothLayouts}
        onChange={(selected) => handleSelectLayout(selected)}
      />
    </div>
  );
}

export default StepLayout;
