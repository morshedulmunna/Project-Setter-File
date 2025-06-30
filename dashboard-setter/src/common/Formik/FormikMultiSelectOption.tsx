import { useField, useFormikContext } from "formik";
import { useState, useEffect, useRef } from "react";

interface Option {
  value: string;
  label: string;
}

interface FormikCustomMultiSelectProps {
  label?: string;
  className?: string;
  required?: boolean;
  onSelect?: (selectedOptions: string[]) => void;
  options: Option[];
  name: string;
  id?: string;
  [key: string]: any;
}

export default function FormikCustomMultiSelect({
  label,
  className,
  required,
  onSelect,
  options,
  ...props
}: FormikCustomMultiSelectProps) {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync selectedOptions from field.value
  useEffect(() => {
    setSelectedOptions(field.value || []);
  }, [field.value]);

  // Call onSelect when selectedOptions changes
  useEffect(() => {
    if (onSelect) {
      onSelect(selectedOptions);
    }
  }, [onSelect, selectedOptions]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (optionValue: string) => {
    let updatedSelectedOptions: string[];
    if (selectedOptions.includes(optionValue)) {
      updatedSelectedOptions = selectedOptions.filter(
        (option) => option !== optionValue
      );
    } else {
      updatedSelectedOptions = [...selectedOptions, optionValue];
    }
    setSelectedOptions(updatedSelectedOptions);
    setFieldValue(props.name, updatedSelectedOptions);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          className="font-medium inline-block"
          htmlFor={props.id || props.name}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className={`relative cursor-pointer ${className}`} ref={dropdownRef}>
        <div
          className={`border w-full rounded py-2 px-2 ${meta.touched && meta.error && "border-red-500"}`}
          onClick={toggleDropdown}
        >
          {selectedOptions.length > 0
            ? selectedOptions
                .map(
                  (optionValue) =>
                    options.find((option) => option.value === optionValue)
                      ?.label
                )
                .join(", ")
            : "Select options"}
        </div>
        {dropdownOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-44 overflow-auto">
            {options.map((option) => (
              <li
                key={option.value}
                className={`cursor-pointer px-4 py-2 hover:bg-gray-200 ${selectedOptions.includes(option.value) && "bg-gray-300"}`}
                onClick={() => toggleOption(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-xs text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
}
