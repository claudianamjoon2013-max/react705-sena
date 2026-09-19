function FormInput({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
  error = "",
  register = () => ({}),
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold text-slate-700">
        {label} {required && "*"}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { required: required ? "Este campo es obligatorio" : false })}
        className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}

export default FormInput;