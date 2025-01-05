"use client";
import { useQueryContext } from "@/context/QueryContext";
import { FileUpload } from "@/components/file-upload";
import { QuerySection } from "@/components/query-section";
import { ResultsGrid } from "@/components/results-grid";
import { NavBar } from "@/components/nav-bar";

export default function Home() {
  const { tableName } = useQueryContext();

  const handleClick = () => {
    // Add any navbar click handling logic here
  };

  return (
    <div className="min-h-screen bg-[#051421] h-[75%] mb-[50px]">
      {!tableName && (
        <div className="absolute top-0 left-0 w-full h-full z-[999] bg-[#051421] bg-opacity-100">
          <FileUpload />
        </div>
      )}
      <NavBar handleClick={handleClick} />
      <main className="container mx-auto p-6 pb-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <QuerySection />
          </div>
          <div>
            <ResultsGrid />
          </div>
        </div>
      </main>
    </div>
  );
}
