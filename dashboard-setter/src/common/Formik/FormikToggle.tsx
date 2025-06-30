import { useFormikContext } from "formik";
import React from "react";

interface ToggleOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface FormikToggleProps {
  name: string;
  label?: string;
  options: ToggleOption[];
  className?: string;
}

const FormikToggle: React.FC<FormikToggleProps> = ({
  name,
  label,
  options,
  className = "",
}) => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <label className="text-lg font-semibold text-gray-700">{label}</label>
      )}
      <div className="flex gap-2 mt-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFieldValue(name, option.value)}
            className={`flex-1 px-6 py-4 text-center text-lg font-medium transition-all duration-200 ${
              values[name] === option.value
                ? "bg-gray-100 text-gray-800"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
            style={{
              border: "2px solid",
              borderColor:
                values[name] === option.value ? "#D1D5DB" : "#E5E7EB", // gray-300 : gray-200
            }}
          >
            {option.icon && <span className="mr-2 text-xl">{option.icon}</span>}
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormikToggle;
