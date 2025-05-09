
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Calendar, ListIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active }) => {
  return (
    <Link to={to}>
      <Button
        variant={active ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-2 mb-1",
          active && "bg-secondary"
        )}
      >
        {icon}
        {label}
      </Button>
    </Link>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-background border-r border-border p-4 hidden md:block">
        <div className="mb-8 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          <h1 className="font-bold text-xl">TimeSync</h1>
        </div>
        
        <nav className="space-y-1">
          <NavItem
            to="/"
            icon={<Calendar className="h-5 w-5" />}
            label="Calendar"
            active={pathname === "/"}
          />
          <NavItem
            to="/events"
            icon={<ListIcon className="h-5 w-5" />}
            label="Events"
            active={pathname === "/events"}
          />
          <NavItem
            to="/profile"
            icon={<UserIcon className="h-5 w-5" />}
            label="Profile"
            active={pathname === "/profile"}
          />
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col">
        <main className="flex-grow">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
