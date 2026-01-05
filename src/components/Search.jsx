import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const HeaderSearch = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);

  // Trigger search
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setSearching(true);
    try {
      const res = await axiosInstance.get("/products/", {
        params: { search: searchTerm },
      });

      onSearchResults(res.data.results || []);
    } catch (err) {
      console.error("Search API error:", err);
    } finally {
      setSearching(false);
    }
  };

  // Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        className="border border-[#017F80] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#017F80] outline-none"
      />

      <button
        onClick={handleSearch}
        className="bg-[#017F80] text-white px-4 py-2 rounded-md hover:bg-[#025f5f] transition"
      >
        Search
      </button>

      {searching && (
        <p className="text-xs text-[#017F80] ml-2 animate-pulse">
          Searching...
        </p>
      )}
    </div>
  );
};

export default HeaderSearch;
