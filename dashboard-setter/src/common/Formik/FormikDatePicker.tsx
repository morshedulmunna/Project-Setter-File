import { useField, useFormikContext } from "formik";
import React from "react";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

interface FormikDatePickerProps {
  name: string;
  format?: string;
  className?: string;
  type?: "date" | "time" | "daterange" | "week" | "month" | "year"; // Add type prop
  [key: string]: any;
}

const FormikDatePicker2: React.FC<FormikDatePickerProps> = ({
  name,
  format = "yyyy-MM-dd",
  className = "",
  type = "date",
  ...props
}) => {
  const { setFieldValue } = useFormikContext<any>();
  const [field, meta] = useField(name);

  return (
    <div>
      <DatePicker
        value={field.value ? new Date(field.value) : null}
        onChange={(date: Date | null) => setFieldValue(name, date)}
        className={className}
        appearance="default"
        {...(type === "time"
          ? { format: format || "HH:mm", showMeridian: false, ranges: [] }
          : { format })}
        {...props}
        // Pass the type to DatePicker
        {...(type !== "date" ? { type } : {})}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikDatePicker2;
