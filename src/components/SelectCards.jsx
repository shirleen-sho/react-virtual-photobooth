function SelectCards({ value, options, onChange }) {
  return (
    <div className="flex flex-row gap-12 justify-center">
      {options.map((opt) => (
        <button
          key={"layoutOption" + opt.key}
          value={opt.key}
          onClick={() => onChange(opt.key)}
          className={`px-12 py-8 w-fit h-fit cursor-pointer flex flex-col justify-center items-center gap-3 text-primary-700 bg-primary-200 rounded-xl shadow-lg border-[3px] transition duration-400 ease-in-out hover:scale-110 hover:-translate-y-0.5 ${
            value === opt.key ? "border-primary-500" : "border-transparent"
          }`}
        >
          <span className="font-medium text-base">{opt.label}</span>
          <span className="font-normal text-xs">{opt.description}</span>
        </button>
      ))}
    </div>
  );
}

export default SelectCards;
