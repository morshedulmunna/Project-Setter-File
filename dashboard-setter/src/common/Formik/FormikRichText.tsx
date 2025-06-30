import { useField } from "formik";
import { Bold, Italic, Underline, Link, List, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useRef, useEffect, useState } from "react";

interface FormikRichTextProps {
  label?: string;
  required?: boolean;
  className?: string;
  name: string;
  placeholder?: string;
  error?: string | boolean;
  [key: string]: any;
}

export default function FormikRichText({
  label,
  required,
  className = "",
  placeholder = "",
  name,
  error,
  ...props
}: FormikRichTextProps) {
  const [field, meta, helpers] = useField({ name, ...props });
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (editorRef.current && field.value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = field.value || "";
    }
  }, [field.value]);

  const updateActiveFormats = () => {
    const formats = new Set<string>();
    if (document.queryCommandState('bold')) formats.add('bold');
    if (document.queryCommandState('italic')) formats.add('italic');
    if (document.queryCommandState('underline')) formats.add('underline');
    if (document.queryCommandState('insertUnorderedList')) formats.add('bulletList');
    if (document.queryCommandState('insertOrderedList')) formats.add('numberedList');
    setActiveFormats(formats);
  };

  const execCommand = (command: string, value?: string) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    
    try {
      document.execCommand(command, false, value);
    } catch (error) {
      console.warn(`Command ${command} failed, using fallback`, error);
      
      // Fallback for list commands
      if (command === 'insertUnorderedList') {
        insertList('ul');
        return;
      }
      if (command === 'insertOrderedList') {
        insertList('ol');
        return;
      }
    }
    
    updateContent();
    updateActiveFormats();
  };

  const insertList = (listType: 'ul' | 'ol') => {
    if (!editorRef.current) return;
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    // Create list element
    const listElement = document.createElement(listType);
    const listItem = document.createElement('li');
    
    if (selectedText) {
      listItem.textContent = selectedText;
      range.deleteContents();
    } else {
      listItem.innerHTML = '&nbsp;'; // Non-breaking space for empty list item
    }
    
    listElement.appendChild(listItem);
    range.insertNode(listElement);
    
    // Position cursor at the end of the list item
    const newRange = document.createRange();
    newRange.setStartAfter(listItem);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
    
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      helpers.setValue(editorRef.current.innerHTML || "");
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    updateContent();
    updateActiveFormats();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle Enter key in lists
    if (e.key === 'Enter') {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const listItem = range.startContainer.parentElement?.closest('li');
        
        if (listItem) {
          e.preventDefault();
          const newListItem = document.createElement('li');
          newListItem.innerHTML = '&nbsp;';
          
          if (listItem.nextSibling) {
            listItem.parentNode?.insertBefore(newListItem, listItem.nextSibling);
          } else {
            listItem.parentNode?.appendChild(newListItem);
          }
          
          // Move cursor to new list item
          const newRange = document.createRange();
          newRange.setStart(newListItem, 0);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
          
          updateContent();
        }
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name: name,
        id: name
      }
    };
    field.onBlur(syntheticEvent);
  };

  const displayError = error || (meta.touched && meta.error);

  return (
    <div className={`${label && "mt-2"} w-full`}>
      {label && (
        <label className="font-medium inline-block text-gray-700 text-sm" htmlFor={label}>
          {label} {required && <span className="text-red-500 text-sm font-medium">*</span>}
        </label>
      )}
      <div className={`border rounded-lg bg-gray-50 ${displayError ? "border-red-500" : ""}`} dir="ltr">
        {/* Editor */}
        <div
          ref={editorRef}
          className={`w-full min-h-[100px] px-3 py-2 text-sm bg-gray-50 focus:outline-none rich-text-editor ${className}`}
          contentEditable
          id={name}
          dir="ltr"
          data-placeholder={placeholder}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          suppressContentEditableWarning={true}
          style={{ 
            outline: "none", 
            direction: "ltr", 
            textAlign: "left",
            unicodeBidi: "embed",
            whiteSpace: "pre-wrap"
          }}
        />
        {/* Toolbar at the bottom */}
        <div className="flex items-center gap-1 p-2 border-t bg-muted/50">
          <Button 
            type="button" 
            size="icon" 
            variant={activeFormats.has('bold') ? "default" : "ghost"} 
            onClick={() => execCommand("bold")}
          > 
            <Bold className="h-4 w-4" /> 
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant={activeFormats.has('italic') ? "default" : "ghost"} 
            onClick={() => execCommand("italic")}
          > 
            <Italic className="h-4 w-4" /> 
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant={activeFormats.has('underline') ? "default" : "ghost"} 
            onClick={() => execCommand("underline")}
          > 
            <Underline className="h-4 w-4" /> 
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="ghost" 
            onClick={() => { 
              const url = prompt("Enter URL:"); 
              if (url) execCommand("createLink", url); 
            }}
          > 
            <Link className="h-4 w-4" /> 
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant={activeFormats.has('bulletList') ? "default" : "ghost"} 
            onClick={() => execCommand("insertUnorderedList")}
          > 
            <List className="h-4 w-4" /> 
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant={activeFormats.has('numberedList') ? "default" : "ghost"} 
            onClick={() => execCommand("insertOrderedList")}
          > 
            <ListOrdered className="h-4 w-4" /> 
          </Button>
        </div>
      </div>
      {displayError ? (
        <div className="text-red-500 text-xs">{typeof displayError === 'string' ? displayError : meta.error}</div>
      ) : null}
      
      {/* CSS styles for proper list display */}
      <style jsx>{`
        .rich-text-editor ul {
          list-style-type: disc;
          margin-left: 20px;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        
        .rich-text-editor ol {
          list-style-type: decimal;
          margin-left: 20px;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        
        .rich-text-editor li {
          margin-bottom: 4px;
          display: list-item;
        }
        
        .rich-text-editor ul li {
          list-style-type: disc;
        }
        
        .rich-text-editor ol li {
          list-style-type: decimal;
        }
        
        .rich-text-editor p {
          margin-bottom: 8px;
        }
        
        .rich-text-editor strong, .rich-text-editor b {
          font-weight: bold;
        }
        
        .rich-text-editor em, .rich-text-editor i {
          font-style: italic;
        }
        
        .rich-text-editor u {
          text-decoration: underline;
        }
        
        .rich-text-editor a {
          color: #3b82f6;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
} 