import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export interface RowAction {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

interface RowActionsProps {
  actions: RowAction[];
}

export const RowActions: React.FC<RowActionsProps> = ({ actions }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open row actions"
          className="h-7 w-7 p-0"
        >
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[7rem] p-1 rounded-md shadow-lg border bg-white"
        sideOffset={4}
      >
        {actions.map((action, idx) => (
          <DropdownMenuItem
            key={idx}
            onClick={action.onClick}
            className={`flex cursor-pointer items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors ${
              action.variant === "destructive"
                ? "text-red-600 focus:bg-red-50"
                : "focus:bg-gray-100"
            }`}
          >
            {action.icon && <span className="w-4 h-4">{action.icon}</span>}
            <span className="text-xs">{action.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
