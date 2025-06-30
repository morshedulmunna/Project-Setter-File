"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, Edit, Plus, Info } from "lucide-react";

export type ConfirmationType = "delete" | "edit" | "create" | "info" | "warning";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  type?: ConfirmationType;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  itemName?: string;
}

const typeConfig = {
  delete: {
    icon: Trash2,
    defaultTitle: "Delete Item",
    defaultDescription: "Are you sure you want to delete this item? This action cannot be undone.",
    confirmButtonVariant: "destructive" as const,
    iconColor: "text-red-500",
  },
  edit: {
    icon: Edit,
    defaultTitle: "Edit Item",
    defaultDescription: "Are you sure you want to edit this item?",
    confirmButtonVariant: "default" as const,
    iconColor: "text-blue-500",
  },
  create: {
    icon: Plus,
    defaultTitle: "Create Item",
    defaultDescription: "Are you sure you want to create this item?",
    confirmButtonVariant: "default" as const,
    iconColor: "text-green-500",
  },
  warning: {
    icon: AlertTriangle,
    defaultTitle: "Warning",
    defaultDescription: "Are you sure you want to proceed?",
    confirmButtonVariant: "outline" as const,
    iconColor: "text-yellow-500",
  },
  info: {
    icon: Info,
    defaultTitle: "Confirmation",
    defaultDescription: "Are you sure you want to proceed?",
    confirmButtonVariant: "default" as const,
    iconColor: "text-blue-500",
  },
};

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  type = "info",
  confirmText = "Yes",
  cancelText = "Cancel",
  isLoading = false,
  itemName,
}: ConfirmationModalProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  const handleConfirm = () => {
    onConfirm();
  };

  const getTitle = () => {
    if (title) return title;
    if (itemName) {
      switch (type) {
        case "delete":
          return `Delete ${itemName}`;
        case "edit":
          return `Edit ${itemName}`;
        case "create":
          return `Create ${itemName}`;
        default:
          return config.defaultTitle;
      }
    }
    return config.defaultTitle;
  };

  const getDescription = () => {
    if (description) return description;
    if (itemName) {
      switch (type) {
        case "delete":
          return `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;
        case "edit":
          return `Are you sure you want to edit "${itemName}"?`;
        case "create":
          return `Are you sure you want to create "${itemName}"?`;
        default:
          return config.defaultDescription;
      }
    }
    return config.defaultDescription;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-gray-100 ${config.iconColor}`}>
              <Icon className="h-5 w-5" />
            </div>
            <DialogTitle className="text-left">{getTitle()}</DialogTitle>
          </div>
          <DialogDescription className="text-left mt-2">
            {getDescription()}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-2 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={config.confirmButtonVariant}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 