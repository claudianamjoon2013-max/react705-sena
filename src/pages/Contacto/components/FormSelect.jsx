function FormSelect({
  label,
  name,
  options = [],
  required = false,
  error = "",
  register = () => ({}),
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold text-slate-700">
        {label} {required && "*"}
      </label>
      <select
        id={name}
        {...register(name, { required: required ? "Este campo es obligatorio" : false })}
        className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <option value="">Selecciona una opción</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}

export default FormSelect;