function Toggle({ enabled, setEnabled, key }) {
  return (
    <div className="flex items-center gap-4">
      <label className="w-fit cursor-pointer transition duration-400 ease-in-out hover:scale-110 hover:-translate-y-0.5">
        <input
          key={key}
          type="checkbox"
          className="sr-only"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <div
          className={`w-12 h-7 rounded-full transition flex items-center shadow ${
            enabled ? "bg-primary-500" : "bg-primary-300"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </div>
      </label>
      <span className="text-xs">{enabled ? "ON" : "OFF"}</span>
    </div>
  );
}

export default Toggle;
