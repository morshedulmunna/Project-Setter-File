import { useField } from "formik";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FormikVideoUploadBoxProps {
  label: string;
  required?: boolean;
  className?: string;
  initialPreview?: string | null;
  uploadText?: React.ReactNode;
  buttonText?: React.ReactNode;
  maxWidth?: string;
  maxHeight?: string;
  borderColor?: string;
  textColor?: string;
  hoverColor?: string;
  [key: string]: any;
}

export default function FormikVideoUploadBox({
  label,
  required,
  className,
  initialPreview,
  uploadText = "Upload Video Here",
  buttonText = "Browse files",
  maxWidth = "max-w-xs",
  maxHeight = "max-h-32",
  borderColor = "border-blue-500",
  textColor = "text-blue-600",
  hoverColor = "hover:bg-blue-50",
  ...props
}: FormikVideoUploadBoxProps) {
  const [field, meta, helpers] = useField(props);
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!field.value) {
      setPreview(initialPreview || null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [field.value, initialPreview]);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    helpers.setValue(file);
  };

  const handleRemoveVideo = () => {
    setPreview(null);
    helpers.setValue(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const defaultUploadBox = (
    <label className="w-full">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center",
          borderColor
        )}
      >
        <svg width="56" height="56" fill="none" stroke="#cbd5e1" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#cbd5e1" strokeWidth="2" fill="#f1f5f9" />
          <polygon points="10,8 16,12 10,16" fill="#cbd5e1" />
        </svg>
        <p className="text-gray-700 font-medium mb-4">{uploadText}</p>
        <label
          htmlFor={label}
          className={cn(
            "inline-flex items-center px-4 py-2 bg-white border rounded-lg cursor-pointer transition duration-300 ease-in-out",
            textColor,
            borderColor,
            hoverColor
          )}
        >
          {buttonText}
        </label>
        <input
          type="file"
          accept="video/*"
          className="hidden"
          ref={fileInputRef}
          id={label}
          onChange={handleVideoChange}
          {...props}
        />
      </div>
    </label>
  );

  return (
    <div className="flex w-full justify-start items-start flex-col">
      <label className="font-medium inline-block mb-2" htmlFor={label}>
        {label} {required && <span className="text-red-500 font-medium">*</span>}
      </label>
      {preview ? (
        <div className="relative w-full">
          <video 
            src={preview} 
            controls 
            className="w-full h-64 object-cover rounded-lg border-2 border-dashed border-blue-300 bg-gray-100" 
          />
          <button
            onClick={handleRemoveVideo}
            className="absolute top-3 right-3 w-8 h-8 bg-white text-gray-600 hover:text-red-600 border border-gray-300 rounded-full shadow-lg flex items-center justify-center text-lg font-bold transition-colors"
            aria-label="Remove video"
          >
            &#10005;
          </button>
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white px-3 py-1 rounded-md text-sm">
            Click X to remove or upload new video
          </div>
        </div>
      ) : (
        defaultUploadBox
      )}
      {meta.touched && meta.error ? (
        <div className="text-red-500 w-full text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
} 