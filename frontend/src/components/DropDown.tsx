import { useState, ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa";

interface DropdownProps {
  label: string;
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative w-full">
    
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2  rounded-lg transition"
      >
        <span className="text-sm text-purple-500 font-medium">{label}</span>
        <FaChevronDown className={`w-4 h-4 text-purple-500 transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full  shadow-lg  rounded-lg overflow-hidden">
          <div className="max-h-80 overflow-y-auto">{children}</div>
        </div>
      )}
      <hr></hr>
    </div>
  );
};

export default Dropdown;