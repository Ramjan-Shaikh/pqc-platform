import { Shield, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = location.pathname !== "/";

  if (!isLoggedIn) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 shadow-sm">
      <div className="h-full max-w-screen-2xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-900" />
            <span className="font-semibold text-lg text-gray-900">CryptoGuard</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </Link>
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              Documentation
            </a>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}