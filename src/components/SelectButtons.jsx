function SelectButtons({ value, options, onChange }) {
  // change
  return (
    <div className="grid grid-cols-2 gap-4 justify-center">
      {options.map((opt) => (
        <button
          key={"selectButton" + opt.key}
          value={opt.key}
          onClick={() => onChange(opt.key)}
          className={`px-5 py-2.5 w-full h-fit cursor-pointer text-primary-700 bg-primary-200 rounded-xl shadow-lg border-[3px] transition duration-400 ease-in-out hover:scale-110 hover:-translate-y-0.5 ${
            value === opt.key ? "border-primary-500" : "border-transparent"
          }`}
        >
          <span className="font-medium text-base">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}

export default SelectButtons;
