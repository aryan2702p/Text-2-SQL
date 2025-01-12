"use client";
import { useQueryContext } from "@/context/QueryContext";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "@/app/api/api";
import toast from "react-hot-toast";
import { useQueryStore } from "@/store/QueryStore";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const { resetAllStates } = useQueryStore();

  const handleReset = () => {
   resetAllStates();

    router.push("/upload");
  };

  const handleLogout = async () => {
    const response = await logout();

    if (response.status === 200) {
      toast.success("Logout successful", { icon: "🎉" });
      router.push("/login");
    } else {
      toast.error("Logout failed", { icon: "❌" });
    }
  };

  return (
    <nav className="flex items-center justify-between p-6 pb-0">
      <button
        onClick={handleReset}
        className="text-[#8BA7B4] text-2xl font-mono hover:text-white"
      >
        tex2SQL
      </button>

      <div className="flex items-center gap-6">
        {/* Display Upload button only if not on the /upload page */}
        {pathname !== "/upload" && (
          <button
            className="ml-auto text-[#8BA7B4] font-mono hover:text-white"
            onClick={handleReset}
          >
            Upload
          </button>
        )}

        {/* Display Logout button only if not on the /login or /signup pages */}
        {pathname !== "/login" && pathname !== "/signup" && (
          <button
            className="ml-auto text-[#8BA7B4] font-mono hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
