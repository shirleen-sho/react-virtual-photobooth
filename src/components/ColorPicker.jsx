function ColorPicker({ value, onInput, onChange, selectedColor }) {
  return (
    <label
      className={`relative w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer transition duration-400 ease-in-out hover:scale-110 hover:-translate-y-0.5 ${value === selectedColor ? "border-primary-500" : "border-primary-300"}`}
    >
      <div className="absolute inset-0 bg-[conic-gradient(red,orange,yellow,green,cyan,blue,purple,red)]"></div>
      <input
        type="color"
        value={value}
        onInput={onInput}
        onChange={onChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </label>
  );
}

export default ColorPicker;
