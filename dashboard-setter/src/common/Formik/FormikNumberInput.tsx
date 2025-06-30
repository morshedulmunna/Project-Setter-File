import { useField } from "formik";

interface FormikNumberInputProps {
  label?: string;
  required?: boolean;
  className?: string;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  [key: string]: any;
}

export default function FormikNumberInput({
  label,
  required,
  className,
  min,
  max,
  step = 1,
  ...props
}: FormikNumberInputProps) {
  const [field, meta, helpers] = useField(props);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    helpers.setValue(value);
  };

  return (
    <div className={`${label && "mt-2"} w-full`}>
      {label && (
        <label
          className="font-medium inline-block text-gray-700 text-sm"
          htmlFor={label}
        >
          {label}{" "}
          {required && (
            <span className="text-red-500 text-sm font-medium">*</span>
          )}{" "}
        </label>
      )}

      <input
        type="number"
        className={`w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          meta.touched &&
          meta.error &&
          "border-red-500 focus:border-red-500 focus:ring-red-500"
        } ${className}`}
        id={label}
        min={min}
        max={max}
        step={step}
        {...field}
        onChange={handleChange}
        {...props}
      />
      
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
} 