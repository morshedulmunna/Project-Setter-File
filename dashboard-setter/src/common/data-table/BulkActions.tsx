import React from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export interface BulkAction {
  label: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onClick: (selectedIds: string[]) => Promise<void>;
  className?: string;
}

interface BulkActionsProps {
  selectedIds: string[];
  actions: BulkAction[];
  onActionComplete?: () => void;
}

export function BulkActions({ selectedIds, actions, onActionComplete }: BulkActionsProps) {
  if (selectedIds.length === 0) return null;

  const handleAction = async (action: BulkAction) => {
    try {
      await action.onClick(selectedIds);
      onActionComplete?.();
    } catch (error) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="flex gap-4">
      {actions.map((action, index) => (
        <Button key={index} variant={action.variant || "default"} onClick={() => handleAction(action)} className={action.className}>
          {action.label} ({selectedIds.length})
        </Button>
      ))}
    </div>
  );
}
