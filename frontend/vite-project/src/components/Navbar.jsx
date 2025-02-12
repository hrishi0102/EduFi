// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppKit } from "@reown/appkit/react";
import { useAppKitAccount } from "@reown/appkit/react";
import { Wallet } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const navItems = [
    { path: "/home", label: "Home" },
    { path: "/career-match", label: "AI Matchmaking" },
    { path: "/apply", label: "Apply" },
    { path: "/loans", label: "My Loans" },
    { path: "/chat", label: "AI Chat" },
    { path: "/certificates", label: "Dashboard" },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="text-xl font-bold text-blue-600">
              EduFi
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isConnected &&
              navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
          </div>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <span className="hidden md:block text-sm text-gray-600">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <button
                  onClick={open}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                           flex items-center space-x-2 text-sm font-medium"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Connected</span>
                </button>
              </div>
            ) : (
              <button
                onClick={open}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         flex items-center space-x-2 text-sm font-medium"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu - Only show nav items when connected */}
      {isConnected && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-2 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
