import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { Home, FileText, Bell, LogOut } from "lucide-react";
import Invoices from "./Invoices";
import InvoiceDetails from "./InvoiceDetails";
import Updates from "./Updates";

const Sidebar = () => (
  <div className="bg-gray-100 w-64 min-h-screen p-4">
    <h1 className="text-2xl font-bold mb-6">User Portal</h1>
    <nav>
      <ul>
        <li className="mb-2">
          <NavLink 
            to="/user/invoices" 
            className={({ isActive }) => 
              "flex items-center p-2 rounded hover:bg-gray-200 " + 
              (isActive ? "bg-gray-200 font-medium" : "")
            }
          >
            <FileText className="h-4 w-4 mr-2" />
            <span>Invoices</span>
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink 
            to="/user/updates" 
            className={({ isActive }) => 
              "flex items-center p-2 rounded hover:bg-gray-200 " + 
              (isActive ? "bg-gray-200 font-medium" : "")
            }
          >
            <Bell className="h-4 w-4 mr-2" />
            <span>Updates</span>
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink 
            to="/" 
            className="flex items-center p-2 rounded hover:bg-gray-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
);

const UserDashboard = () => (
  <div className="flex">
    <Sidebar />
    <main className="flex-1 p-6">
      <Routes>
        <Route index element={<Navigate to="invoices" replace />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="invoices/:id" element={<InvoiceDetails />} />
        <Route path="updates" element={<Updates />} />
      </Routes>
    </main>
  </div>
);

export default UserDashboard;
