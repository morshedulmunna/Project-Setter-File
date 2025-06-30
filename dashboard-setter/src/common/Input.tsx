import React from "react";

interface InputProps {
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: string;
  isSearchable?: boolean;
  value?: string;
}

export default function Input({
  inputRef,
  onChange,
  placeholder = "Typing...",
  className = "",
  type = "text",
  isSearchable = false,
  value,
}: any) {
  return (
    <div className="relative">
      <input
        ref={inputRef}
        placeholder={isSearchable ? "Search" : placeholder}
        onChange={onChange}
        type={type}
        value={value}
        className={`text-sm border w-full focus:border-primary/30 transition-colors ease-in-out duration-300 outline-none rounded ${
          isSearchable ? "pl-6 pr-2" : "px-2"
        } py-2 ${className}`}
      />
      {isSearchable && (
        <svg
          className="absolute top-[13px] left-2"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.66667 0.5C2.08934 0.5 0 2.58934 0 5.16667C0 7.744 2.08934 9.83333 4.66667 9.83333C5.71489 9.83333 6.68239 9.48773 7.46145 8.90426L10.1953 11.6381C10.4557 11.8985 10.8778 11.8985 11.1381 11.6381C11.3985 11.3778 11.3985 10.9557 11.1381 10.6953L8.40426 7.96145C8.98773 7.18239 9.33333 6.21489 9.33333 5.16667C9.33333 2.58934 7.244 0.5 4.66667 0.5ZM1.33333 5.16667C1.33333 3.32572 2.82572 1.83333 4.66667 1.83333C6.50762 1.83333 8 3.32572 8 5.16667C8 7.00762 6.50762 8.5 4.66667 8.5C2.82572 8.5 1.33333 7.00762 1.33333 5.16667Z"
            fill="#64748B"
          />
        </svg>
      )}
    </div>
  );
}
