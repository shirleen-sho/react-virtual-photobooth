function Select({ value, options, onChange }) {
  // ???
  return (
    <select
      value={value}
      onChange={onChange}
      className="appearance-none w-full pl-3 pr-10 py-2 rounded-lg font-medium text-xs tracking-wide cursor-pointer
          text-primary-600
          bg-primary-200
          hover:bg-primary-300
          dark:text-primary-100
          dark:bg-primary-700  dark:hover:bg-primary-800"
    >
      {options.map((opt) => (
        <option key={"opt" + opt.key} value={opt.key}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
