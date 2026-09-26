function InputText({ value, onChange, disabled, maxLength, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <input
        type="text"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="px-3 py-2 w-full shadow rounded-full border-2 border-primary-500 font-medium text-xs text-primary-600 disabled:cursor-not-allowed  disabled:text-primary-50 disabled:bg-primary-300 disabled:border-transparent"
        disabled={disabled}
        placeholder={placeholder}
      />
      {/* Helper Message */}
      {maxLength && (
        <span className="ml-3.5 w-fit text-[0.5rem] text-primary-500">
          Max. {maxLength} characters
        </span>
      )}
    </div>
  );
}

export default InputText;
