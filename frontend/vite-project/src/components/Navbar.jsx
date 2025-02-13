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
    { path: "/apply", label: "Get Funding" },
    { path: "/certificates", label: "My Learning" },
    { path: "/chat", label: "Study Advisor" },
    { path: "/agent-chat", label: "OnChain Agent" },
    { path: "/loans", label: "My Funds" },
  ];

  return (
    <nav className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/home"
              className="text-xl font-bold text-transparent bg-clip-text 
                                    bg-gradient-to-r from-emerald-400 to-emerald-200"
            >
              EduFi
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {isConnected &&
              navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 
                    ${
                      location.pathname === item.path
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
          </div>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <span className="hidden md:block text-sm text-slate-400 font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <button
                  onClick={open}
                  className="px-4 py-2 bg-emerald-500 text-slate-900 rounded-lg 
                           hover:bg-emerald-400 transition-all duration-300
                           flex items-center space-x-2 text-sm font-medium
                           hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Connected</span>
                </button>
              </div>
            ) : (
              <button
                onClick={open}
                className="px-4 py-2 bg-emerald-500 text-slate-900 rounded-lg 
                         hover:bg-emerald-400 transition-all duration-300
                         flex items-center space-x-2 text-sm font-medium
                         hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isConnected && (
        <div className="md:hidden border-t border-slate-800">
          <div className="px-2 py-3 space-y-1 bg-slate-900/50 backdrop-blur-sm">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${
                    location.pathname === item.path
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
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
