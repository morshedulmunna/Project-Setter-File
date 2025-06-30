import { useField } from "formik";
import { Check, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface FormikSelectOptionProps {
  label?: string;
  className?: string;
  required?: boolean;
  name: string;
  id?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  [key: string]: any;
}

export default function FormikSelectOption({
  label,
  className,
  required,
  options,
  placeholder = "Select an option",
  ...props
}: FormikSelectOptionProps) {
  const [field, meta] = useField(props);

  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={props.id || props.name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <Select
        value={field.value}
        onValueChange={(value) => {
          field.onChange({
            target: {
              name: props.name,
              value,
            },
          });
        }}
      >
        <SelectTrigger
          className={cn(
            "w-full rounded-md py-2",
            meta.touched && meta.error && "border-destructive",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {meta.touched && meta.error ? (
        <p className="text-sm font-medium text-destructive">{meta.error}</p>
      ) : null}
    </div>
  );
}
