import { useRef, useState, useEffect, useMemo } from "react";
import { usePhotobooth } from "../../../context/usePhotobooth";

import { photoboothBackgroundColors } from "../../../constants/photoboothBackgroundColors";
import { photoboothStickers } from "../../../constants/photoboothStickers";

import { useGeneratePhotostripCanvas } from "../../../hooks/useGeneratePhotostripCanvas";

import ColorPicker from "../../../components/ColorPicker";
import Toggle from "../../../components/Toggle";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";
import { X } from "lucide-react";

// Step 4
function StepDecorate() {
  // global state
  const {
    selectedLayout,
    backgroundColor,
    setBackgroundColor,
    showTimeStamp,
    setShowTimeStamp,
    customText,
    setCustomText,
    showCustomText,
    setShowCustomText,
    stickers,
    addNewSticker,
    updateSticker,
    deleteSticker,
  } = usePhotobooth();

  // component state
  const [previewColor, setPreviewColor] = useState();

  const [activeStickerId, setActiveStickerId] = useState();
  const [isDraggingSticker, setIsDraggingSticker] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);
  const [canvasRect, setCanvasRect] = useState(null);

  // hooks
  const { generate } = useGeneratePhotostripCanvas();

  useEffect(() => {
    async function render() {
      const canvas = await generate({ width: 200 });

      const previewCanvas = canvasRef.current;
      const ctx = previewCanvas.getContext("2d");

      previewCanvas.width = canvas.width;
      previewCanvas.height = canvas.height;

      ctx.drawImage(canvas, 0, 0);
    }
    render();
  }, [generate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // API browser to detect change in a spesific element's size, better than window EventListener
    const observer = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      setCanvasRect(rect);
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const handleAddNewToStickers = (sticker) => {
    const newSticker = {
      ...sticker,
      id: crypto.randomUUID(),
      x: 0.5,
      y: 0.5,
      width: 120,
      height: 120,
      scale: 0.25,
      rotation: 0,
    };
    addNewSticker(newSticker);
  };

  // helper function
  const getMousePosition = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    return { mouseX, mouseY };
  };

  // helper function
  const getClickedSticker = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const mousePosition = getMousePosition(e);
    if (!mousePosition) return null;

    const { mouseX, mouseY } = mousePosition;

    // check with loop from the latest/highest layer
    for (let i = stickers.length - 1; i >= 0; i--) {
      const sticker = stickers[i];

      const x = sticker.x * canvas.width;
      const y = sticker.y * canvas.height;

      const w = sticker.scale * canvas.width;
      const h = (sticker.height / sticker.width) * w;

      const left = x - w / 2;
      const right = x + w / 2;
      const top = y - h / 2;
      const bottom = y + h / 2;

      if (
        mouseX >= left &&
        mouseX <= right &&
        mouseY >= top &&
        mouseY <= bottom
      ) {
        return sticker;
      }
    }

    return null;
  };

  // select + start drag a sticker
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mousePosition = getMousePosition(e);
    if (!mousePosition) return;

    const { mouseX, mouseY } = mousePosition;
    const clickedSticker = getClickedSticker(e);

    if (clickedSticker) {
      setActiveStickerId(clickedSticker.id);
      setIsDraggingSticker(true);

      // save offset for smoother dragging
      const stickerX = clickedSticker.x * canvas.width;
      const stickerY = clickedSticker.y * canvas.height;
      setDragOffset({
        x: mouseX - stickerX,
        y: mouseY - stickerY,
      });
    } else {
      // deselect the sticker if user clicked on clean canvas area (!clickedSticker)
      setActiveStickerId(null);
    }
  };

  // dragging an active sticker
  const handleMouseMove = (e) => {
    if (!isDraggingSticker || !activeStickerId) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const { mouseX, mouseY } = getMousePosition(e);

    const newX = (mouseX - dragOffset.x) / canvas.width;
    const newY = (mouseY - dragOffset.y) / canvas.height;

    updateSticker(activeStickerId, {
      x: newX,
      y: newY,
    });
  };

  // stop drag but still select the sticker
  const handleMouseUp = () => {
    setIsDraggingSticker(false);
  };

  // derived state
  const activeSticker = useMemo(
    () => stickers.find((s) => s.id === activeStickerId),
    [stickers, activeStickerId],
  );

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-15 lg:gap-20">
      {/* Choose Background & Insert Text*/}
      <div className="lg:col-span-1 flex flex-col gap-8 items-center lg:items-baseline">
        {/* BACKGROUND */}
        <div className="flex flex-col gap-4 items-center lg:items-baseline">
          <span>Background :</span>
          <div className="flex flex-wrap gap-2">
            {photoboothBackgroundColors.map((color) => (
              <button
                key={"bg" + color}
                value={color}
                onClick={(e) => setBackgroundColor(e.target.value)}
                className={`
        w-10 h-10 rounded-full border-2 cursor-pointer transition duration-400 ease-in-out hover:scale-110 hover:-translate-y-0.5
        ${backgroundColor === color ? "border-primary-500" : "border-primary-300"}
      `}
                style={{ backgroundColor: color }}
              />
            ))}
            <ColorPicker
              value={previewColor}
              selectedColor={backgroundColor}
              onInput={(e) => setPreviewColor(e.target.value)}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>
        </div>
        {/* TIMESTAMP */}
        <div className="flex flex-row lg:flex-col gap-4 justify-center lg:justify-baseline items-center lg:items-baseline">
          <span>Display time stamp :</span>
          <Toggle
            enabled={showTimeStamp}
            setEnabled={setShowTimeStamp}
            key="toggleDisplayTimeStamp"
          />
        </div>
        {/* CUSTOM TEXT */}
        <div className="flex flex-row lg:flex-col gap-4 justify-center lg:justify-baseline items-center lg:items-baseline">
          <span>Display custom text :</span>
          <Toggle
            enabled={showCustomText}
            setEnabled={setShowCustomText}
            key="toggleDisplayCustomText"
          />
        </div>
        <div className="w-50">
          {/* text max. 25 characters */}
          <InputText
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            disabled={!showCustomText}
            maxLength={25}
            placeholder="Type here..."
          />
        </div>
      </div>
      {/* Preview Canvas */}
      <div className="lg:col-span-2 flex justify-center">
        <canvas
          ref={canvasRef}
          className={`${selectedLayout.cols === 1 ? "w-60" : "w-full max-w-120"} shadow-md`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
        {/* Delete Sticker in Canvas */}
        {canvasRect && activeSticker && (
          <Button
            variant="danger"
            shape="icon"
            additionalClassName="absolute"
            additionalStyle={{
              left: canvasRect.left + activeSticker.x * canvasRect.width + 20,
              top: canvasRect.top + activeSticker.y * canvasRect.height - 25,
            }}
            onClick={() => deleteSticker(activeSticker.id)}
          >
            <X className="w-3 h-3" strokeWidth={4} />
          </Button>
        )}
      </div>
      {/* Choose Sticker */}
      <div className="lg:col-span-1">
        <div className="flex flex-col gap-4 items-center lg:items-baseline">
          <span>Sticker :</span>
          <div className="flex flex-wrap gap-2">
            {photoboothStickers.map((sticker) => (
              <img
                src={sticker.src}
                key={"sticker-" + sticker.key}
                alt={"sticker-" + sticker.key}
                onClick={() => handleAddNewToStickers(sticker)}
                className="w-10 h-10 rounded-full border-2 border-primary-300 cursor-pointer transition duration-400 ease-in-out hover:scale-110 hover:-translate-y-0.5 hover:border-primary-400"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepDecorate;
