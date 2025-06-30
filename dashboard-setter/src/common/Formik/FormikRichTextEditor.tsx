"use client";

import type React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import { useField } from "formik";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Code,
  Quote,
} from "lucide-react";

interface FormikRichTextEditorProps {
  label?: string;
  required?: boolean;
  className?: string;
  name: string;
  placeholder?: string;
  [key: string]: any;
}

export default function FormikRichTextEditor({
  label,
  required,
  className = "",
  placeholder = "",
  ...props
}: FormikRichTextEditorProps) {
  const [field, meta, helpers] = useField(props);
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = field.value || "";
      setIsInitialized(true);
    }
  }, [field.value, isInitialized]);

  // Update editor when value changes externally
  useEffect(() => {
    if (
      editorRef.current &&
      isInitialized &&
      editorRef.current.innerHTML !== field.value
    ) {
      const selection = window.getSelection();
      const range = selection?.rangeCount ? selection.getRangeAt(0) : null;

      editorRef.current.innerHTML = field.value || "";

      // Restore cursor position if possible
      if (range && editorRef.current.contains(range.startContainer)) {
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }, [field.value, isInitialized]);

  const executeCommand = useCallback(
    (command: string, value?: string) => {
      if (!editorRef.current) return;

      editorRef.current.focus();
      document.execCommand(command, false, value);

      // Update Formik field value
      helpers.setValue(editorRef.current.innerHTML);
    },
    [helpers]
  );

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      helpers.setValue(editorRef.current.innerHTML);
    }
  }, [helpers]);

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  }, [executeCommand]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Handle common keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault();
            executeCommand("bold");
            break;
          case "i":
            e.preventDefault();
            executeCommand("italic");
            break;
          case "u":
            e.preventDefault();
            executeCommand("underline");
            break;
        }
      }
    },
    [executeCommand]
  );

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
          )}
        </label>
      )}

      <div
        className={`border rounded-lg ${
          isFocused ? "ring-2 ring-ring ring-offset-2" : ""
        } ${
          meta.touched && meta.error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300"
        } ${className}`}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b bg-muted/50 flex-wrap">
          <Select
            onValueChange={(value) =>
              executeCommand("formatBlock", `<${value}>`)
            }
          >
            <SelectTrigger className="w-32 h-8">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="div">Normal</SelectItem>
              <SelectItem value="h1">Heading 1</SelectItem>
              <SelectItem value="h2">Heading 2</SelectItem>
              <SelectItem value="h3">Heading 3</SelectItem>
              <SelectItem value="p">Paragraph</SelectItem>
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="h-6" />

          <Toggle
            size="sm"
            onPressedChange={() => executeCommand("bold")}
            aria-label="Bold"
          >
            <Bold className="h-4 w-4" />
          </Toggle>

          <Toggle
            size="sm"
            onPressedChange={() => executeCommand("italic")}
            aria-label="Italic"
          >
            <Italic className="h-4 w-4" />
          </Toggle>

          <Toggle
            size="sm"
            onPressedChange={() => executeCommand("underline")}
            aria-label="Underline"
          >
            <Underline className="h-4 w-4" />
          </Toggle>

          <Separator orientation="vertical" className="h-6" />

          <Toggle
            size="sm"
            onPressedChange={() => executeCommand("justifyLeft")}
            aria-label="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </Toggle>

          <Toggle
            size="sm"
            onPressedChange={() => executeCommand("justifyCenter")}
            aria-label="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </Toggle>

          <Toggle
            size="sm"
            onPressedChange={() => executeCommand("justifyRight")}
            aria-label="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </Toggle>

          <Separator orientation="vertical" className="h-6" />

          <Toggle
            size="sm"
            onPressedChange={() => executeCommand("insertUnorderedList")}
            aria-label="Bullet List"
          >
            <List className="h-4 w-4" />
          </Toggle>

          <Toggle
            size="sm"
            onPressedChange={() => executeCommand("insertOrderedList")}
            aria-label="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>

          <Separator orientation="vertical" className="h-6" />

          <Button
            variant="ghost"
            size="sm"
            onClick={insertLink}
            aria-label="Insert Link"
          >
            <Link className="h-4 w-4" />
          </Button>

          <Toggle
            size="sm"
            onPressedChange={() => executeCommand("formatBlock", "<pre>")}
            aria-label="Code Block"
          >
            <Code className="h-4 w-4" />
          </Toggle>

          <Toggle
            size="sm"
            onPressedChange={() =>
              executeCommand("formatBlock", "<blockquote>")
            }
            aria-label="Quote"
          >
            <Quote className="h-4 w-4" />
          </Toggle>
        </div>

        {/* Editor */}
        <div className="relative">
          <div
            ref={editorRef}
            contentEditable
            className="min-h-[200px] p-4 focus:outline-none prose prose-sm max-w-none"
            onInput={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              field.onBlur(field.name);
            }}
            onKeyDown={handleKeyDown}
            style={{
              minHeight: "200px",
            }}
          />
          {/* Placeholder */}
          {!field.value && !isFocused && (
            <div className="absolute top-4 left-4 text-muted-foreground pointer-events-none">
              {placeholder}
            </div>
          )}
        </div>
      </div>

      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
}
