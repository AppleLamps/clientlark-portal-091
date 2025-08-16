import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { useState } from "react";
import { FileText, Bell, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Invoices from "./Invoices";
import InvoiceDetails from "./InvoiceDetails";
import Updates from "./Updates";

const Sidebar = ({ mobile = false, onClose = () => {} }) => (
  <div className={`bg-card border-r h-full p-6 ${mobile ? 'w-full' : 'w-64'}`}>
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold tracking-tight">User Portal</h1>
      {mobile && (
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
    <nav>
      <ul className="space-y-2">
        <li>
          <NavLink 
            to="/user/invoices" 
            className={({ isActive }) => 
              `flex items-center p-3 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground ${
                isActive ? "bg-primary text-primary-foreground font-medium" : ""
              }`
            }
            onClick={mobile ? onClose : undefined}
          >
            <FileText className="h-4 w-4 mr-3" />
            <span>Invoices</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/user/updates" 
            className={({ isActive }) => 
              `flex items-center p-3 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground ${
                isActive ? "bg-primary text-primary-foreground font-medium" : ""
              }`
            }
            onClick={mobile ? onClose : undefined}
          >
            <Bell className="h-4 w-4 mr-3" />
            <span>Updates</span>
          </NavLink>
        </li>
        <li className="pt-4 border-t">
          <NavLink 
            to="/" 
            className="flex items-center p-3 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground"
            onClick={mobile ? onClose : undefined}
          >
            <LogOut className="h-4 w-4 mr-3" />
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
);

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="md:hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold">User Portal</h1>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
          </div>
        </div>
        <SheetContent side="left" className="p-0 w-80">
          <Sidebar mobile onClose={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Routes>
            <Route index element={<Navigate to="invoices" replace />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="invoices/:id" element={<InvoiceDetails />} />
            <Route path="updates" element={<Updates />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
