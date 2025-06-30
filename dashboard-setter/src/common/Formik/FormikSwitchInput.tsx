"use client";

import { useField } from "formik";
import { useId } from "react";

interface FormikSwitchInputProps {
  label?: string;
  required?: boolean;
  className?: string;
  name: string;
  disabled?: boolean;
  description?: string;
}

export default function FormikSwitchInput({
  label,
  required = false,
  className = "",
  disabled = false,
  description,
  ...props
}: FormikSwitchInputProps) {
  const [field, meta, helpers] = useField(props.name);
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;

  const handleChange = (checked: boolean) => {
    helpers.setValue(checked);
    helpers.setTouched(true);
  };

  const hasError = meta.touched && meta.error;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex-1">
        {label && (
          <label
            htmlFor={id}
            className={`block text-sm font-medium ${
              disabled ? "text-gray-400" : "text-gray-700"
            } ${hasError ? "text-red-700" : ""}`}
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        {description && (
          <p
            id={descriptionId}
            className={`mt-1 text-xs ${
              disabled ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={!!field.value ? "true" : "false"}
        aria-describedby={descriptionId}
        aria-invalid={hasError ? "true" : "false"}
        disabled={disabled}
        onClick={() => !disabled && handleChange(!field.value)}
        className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            ${
              !!field.value
                ? disabled
                  ? "bg-blue-300"
                  : "bg-blue-600"
                : disabled
                ? "bg-gray-100"
                : "bg-gray-200"
            }
            ${hasError ? "ring-2 ring-red-500 ring-offset-1" : ""}
          `}
      >
        <span className="sr-only">
          {!!field.value ? "Disable" : "Enable"} {label || "switch"}
        </span>
        <span
          className={`
              inline-block h-4 w-4 transform rounded-full bg-white shadow-lg 
              transition-transform duration-200 ease-in-out
              ${!!field.value ? "translate-x-6" : "translate-x-1"}
            `}
        />
      </button>

      {/* Hidden input for form submission */}
      <input
        type="checkbox"
        name={props.name}
        checked={!!field.value}
        onChange={() => {}} // Controlled by button click
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      {hasError && (
        <div
          className="mt-1 text-xs text-red-600"
          role="alert"
          aria-live="polite"
        >
          {meta.error}
        </div>
      )}
    </div>
  );
}
