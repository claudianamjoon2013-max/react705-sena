function FormTextArea({
  label,
  name,
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
      <textarea
        id={name}
        placeholder={placeholder}
        rows={6}
        {...register(name, { required: required ? "Este campo es obligatorio" : false })}
        className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 text-slate-700 placeholder:text-slate-400 shadow-sm transition-all duration-200 resize-y focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}

export default FormTextArea;