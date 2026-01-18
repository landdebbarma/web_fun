import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StarBorder from "@/components/ui/StarBorder";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full fixed top-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* LEFT: Desktop Menu */}
        <div className="hidden md:flex text-white rounded-full px-20 py-5 items-center gap-10">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/bglogo.png"
              alt="AnToAnt Logo"
              className="h-10 w-10 rounded-lg object-cover"
            />
            {/* <span className="text-2xl font-bold flex items-center gap-1">
              AnToAnt <sup className="text-xs">®</sup>
            </span> */}
          </a>

          <a
            href="/product"
            className="text-sm font-medium hover:text-gray-300"
          >
            Product
          </a>
          <a
            href="/features"
            className="text-sm font-medium hover:text-gray-300"
          >
            Features
          </a>
          <a
            href="/pricing"
            className="text-sm font-medium hover:text-gray-300"
          >
            Pricing
          </a>
          <a href="/about" className="text-sm font-medium hover:text-gray-300">
            About Us
          </a>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          {/* Mobile Logo */}
          <a href="/" className="flex items-center gap-2 md:hidden">
            <img
              src="/bglogo.png"
              alt="AnToAnt Logo"
              className="h-9 w-9 rounded-lg object-cover"
            />
            <span className="text-2xl font-bold text-white flex items-center gap-1">
              AnToAnt <sup className="text-xs">™</sup>
            </span>
          </a>

          {/* Desktop Buttons */}
          <div className="hidden md:flex text-white rounded-full px-5 py-2 items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium hover:text-gray-300"
            >
              Login
            </button>

            {/* Desktop Get Demo */}
            <StarBorder
              as="button"
              onClick={() => navigate("/login")}
              color="white"
              speed="4s"
              thickness={1}
              className="text-sm"
            >
              Get Demo
            </StarBorder>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full backdrop-blur-md border-t border-white/10 text-white flex flex-col items-center gap-6 py-6">
          <a
            href="/product"
            onClick={() => setIsOpen(false)}
            className="text-base hover:text-gray-300"
          >
            Product
          </a>
          <a
            href="/features"
            onClick={() => setIsOpen(false)}
            className="text-base hover:text-gray-300"
          >
            Features
          </a>
          <a
            href="/pricing"
            onClick={() => setIsOpen(false)}
            className="text-base hover:text-gray-300"
          >
            Pricing
          </a>
          <a
            href="/about"
            onClick={() => setIsOpen(false)}
            className="text-base hover:text-gray-300"
          >
            About
          </a>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/login");
            }}
            className="text-base hover:text-gray-300"
          >
            Login
          </button>

          {/* Mobile Get Demo */}
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/login");
            }}
            className="text-base bg-white/10 px-6 py-2 rounded-full"
          >
            Get Demo
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
