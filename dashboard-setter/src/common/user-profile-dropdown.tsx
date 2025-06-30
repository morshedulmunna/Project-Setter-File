"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, User, LogOut, Bell, CreditCard, ChevronDown, Shield, Mail, Calendar, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface MenuItem {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: "default" | "destructive";
  showSeparator?: boolean;
}

export interface UserProfileDropdownProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
    lastLogin?: string;
  };
  menuItems?: MenuItem[];
  onLogout?: () => void;
  customTrigger?: React.ReactNode;
}

const defaultMenuItems: MenuItem[] = [
  {
    label: "Profile",
    icon: User,
    onClick: () => {},
  },
  {
    label: "Account Security",
    icon: Shield,
    onClick: () => {},
  },
  {
    label: "Settings",
    icon: Settings,
    onClick: () => {},
  },
  {
    label: "Notifications",
    icon: Bell,
    onClick: () => {},
  },
  {
    label: "Billing",
    icon: CreditCard,
    onClick: () => {},
  },
];

export function UserProfileDropdown({ user, menuItems = defaultMenuItems, onLogout, customTrigger }: UserProfileDropdownProps) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const renderTrigger = () => {
    if (customTrigger) {
      return customTrigger;
    }

    return (
      <Button variant="ghost" className="flex items-center gap-3 px-2 py-1.5">
        <Avatar className="h-9 w-9">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start text-left">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.role || "Admin"}</span>
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </Button>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{renderTrigger()}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.role || "Admin"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            {user.lastLogin && (
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Last login: {user.lastLogin}</p>
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <DropdownMenuItem onClick={item.onClick} className={item.variant === "destructive" ? "text-red-600 focus:text-red-600" : ""}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </DropdownMenuItem>
              {item.showSeparator && <DropdownMenuSeparator />}
            </React.Fragment>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

{
  /* <UserProfileDropdown user={userData} menuItems={menuItems} onLogout={handleLogout} /> */
}

//  // Example user data - replace with your actual user data
//  const userData = {
//   name: "TutorsPlan Admin",
//   email: "admin@tutorsplan.com",
//   avatar: "/assets/logo/navbarlogo.png",
//   role: "Super Admin",
//   lastLogin: "2 hours ago",
// };

// // Menu items with their respective actions
// const menuItems = [
//   {
//     label: "Profile",
//     icon: User,
//     onClick: () => {
//       router.push("/dashboard/profile");
//     },
//   },
//   {
//     label: "Account Security",
//     icon: Shield,
//     onClick: () => {
//       router.push("/dashboard/security");
//     },
//   },
//   {
//     label: "Settings",
//     icon: Settings,
//     onClick: () => {
//       router.push("/dashboard/settings");
//     },
//   },
//   {
//     label: "Notifications",
//     icon: Bell,
//     onClick: () => {
//       router.push("/dashboard/notifications");
//     },
//   },
//   {
//     label: "Billing",
//     icon: CreditCard,
//     onClick: () => {
//       router.push("/dashboard/billing");
//     },
//   },
// ];

// // Handle logout
// const handleLogout = async () => {
//   try {
//     // Add your logout logic here
//     // For example:
//     // await signOut();
//     router.push("/");
//   } catch (error) {
//     console.error("Logout failed:", error);
//   }
// };
