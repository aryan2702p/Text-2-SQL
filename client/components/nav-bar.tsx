"use client";
import { useQueryContext } from "@/context/QueryContext";

interface NavBarProps {

  handleClick: () => void;

}

export const NavBar: React.FC<NavBarProps> = ({ handleClick }) => {
  const { setIsFileUploaded, setTableName } = useQueryContext();

  const handleReset = () => {
  
    setIsFileUploaded(false);
    setTableName("");
  };

  return (
    <nav className="flex items-center justify-between p-6 pb-0">
      <button
        onClick={handleReset}
        className="text-[#8BA7B4] text-2xl font-mono hover:text-white"
      >
        tex2SQL
      </button>
      <button
        className="ml-auto text-[#8BA7B4] font-mono hover:text-white"
        onClick={handleReset}
      >
        Upload
      </button>
    </nav>
  );
}
