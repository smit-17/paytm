import React, { useState } from "react";
import { Search } from "lucide-react"; // Install Lucide Icons: `npm install lucide-react`

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-md border border-gray-600 rounded-full px-4 py-2 shadow-md w-full max-w-md">
      <Search className="text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="bg-transparent text-black ml-2 outline-none w-full placeholder-gray-300"
      />
    </div>
  );
};

export default SearchBar;
