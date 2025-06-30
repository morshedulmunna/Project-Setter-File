"use client";

import * as React from "react";
import {
  useField,
  FieldInputProps,
  FieldMetaProps,
  FieldHelperProps,
} from "formik";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface Option {
  label: string;
  value: string | number;
}

interface AutoCompleteProps {
  options: Option[];
  onSelect?: (value: Option) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  selectedValue?: Option;
  width?: string;
  isFormikEnabled?: boolean;
  name?: string;
  isLoading?: boolean;
}

export function AutoComplete({
  options,
  onSelect,
  onSearch,
  placeholder = "Select...",
  selectedValue,
  width = "100%",
  isFormikEnabled = false,
  name,
  isLoading = false,
  ...props
}: AutoCompleteProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<Option | undefined>(selectedValue);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = React.useState<string>("auto");

  // Use Formik if isFormikEnabled is true
  const [field, meta, helpers] = isFormikEnabled
    ? useField(name as string)
    : [
        {} as FieldInputProps<any>,
        {} as FieldMetaProps<any>,
        {} as FieldHelperProps<any>,
      ];

  React.useEffect(() => {
    if (triggerRef.current) {
      setPopoverWidth(`${triggerRef.current.offsetWidth}px`);
    }
  }, [open, width]);

  // Sync internal value with Formik field value when it changes
  React.useEffect(() => {
    if (isFormikEnabled && field.value) {
      // Find the option that matches the current Formik field value
      const matchingOption = options.find(option => 
        option.value.toString() === field.value.toString()
      );
      if (matchingOption && matchingOption.value !== value?.value) {
        setValue(matchingOption);
      }
    } else if (isFormikEnabled && !field.value) {
      // If Formik field is empty, clear the internal value
      setValue(undefined);
    }
  }, [field.value, options, isFormikEnabled, value?.value]);

  // Initialize value from selectedValue prop
  React.useEffect(() => {
    if (selectedValue && selectedValue.value !== value?.value) {
      setValue(selectedValue);
    }
  }, [selectedValue, value?.value]);

  const handleSelect = (option: Option): void => {
    const newValue = option.value === value?.value ? undefined : option;
    setValue(newValue);
    console.log("Selected value:", newValue?.value);
    if (isFormikEnabled) {
      helpers.setValue(newValue?.value); // Set Formik field value
      helpers.setTouched(true); // Set touched when selecting
    } else if (onSelect) {
      onSelect(newValue as Option);
    }
    setOpen(false);
  };

  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          {value?.label || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: popoverWidth }}>
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            onValueChange={handleSearch}
          />
          <CommandList className="p-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              <>
                <CommandEmpty>
                  No {placeholder.toLowerCase()} found.
                </CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => handleSelect(option)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value?.value === option.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
      {isFormikEnabled && meta.touched && meta.error ? (
        <div className="text-red-500 text-xs">{meta.error}</div>
      ) : null}
    </Popover>
  );
}