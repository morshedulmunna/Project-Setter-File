import { useField } from "formik";

interface FormikInputBoxProps {
  label?: string;
  isTextArea?: boolean;
  required?: boolean;
  className?: string;
  value?: string;
  name: string;
  [key: string]: any;
}

export default function FormikInputBox({
  label,
  isTextArea,
  required,
  className,
  value,
  ...props
}: FormikInputBoxProps) {
  const [field, meta, helpers] = useField(props);

  return (
    <>
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

        {isTextArea ? (
          <textarea
            className={`w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              meta.touched &&
              meta.error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500"
            } ${className}`}
            cols={10}
            rows={3}
            id={label}
            {...field}
            {...props}
          />
        ) : (
          <input
            className={`w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              meta.touched &&
              meta.error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500"
            } ${className} no-arrows`}
            id={label}
            {...field}
            {...props}
          />
        )}
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-xs">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
}

// <FormikInputBox
// name="email"
// type="email"
// label="Email"
// placeholder="Enter your email"
// required
// className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
//   ${errors.email && touched.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
// />
