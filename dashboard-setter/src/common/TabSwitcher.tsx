"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

type TabOption = {
  value: string;
  content: React.ReactNode;
};

interface TabSwitcherProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  options: TabOption[];
  onSelectedTab: (value: string) => void;
}

export default function TabSwitcher({
  className,
  options,
  onSelectedTab,
  ...props
}: TabSwitcherProps) {
  const [tab, setTab] = useState<string>(options[0].value);

  useEffect(() => {
    onSelectedTab(tab);
  }, [tab, onSelectedTab]);

  return (
    <div
      className={cn("flex w-fit flex-wrap gap-2 border p-1 rounded", className)}
    >
      {options.map((option) => (
        <button
          {...props}
          key={option.value}
          className={cn(
            "text-black px-2 py-1 rounded text-sm",
            tab === option.value && "bg-[#DEDEFA] text-primary font-semibold"
          )}
          onClick={() => setTab(option.value)}
        >
          {option.content}
        </button>
      ))}
    </div>
  );
}

// const [selectedTab, setSelectedTab] = useState<string>("all");

// const tabs = [
//   { value: "all", content: "All" },
//   { value: "active", content: "Active" },
//   { value: "archived", content: "Archived" },
// ];

// {/* <TabSwitcher options={tabs} onSelectedTab={setSelectedTab} /> */}
