import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange(e.currentTarget.value);
  };

  return (
    <input
      type="text"
      placeholder="Search by name, username or email..."
      value={value}
      onChange={handleChange}
    className="
w-full
p-4
bg-slate-800
text-white
border
border-slate-700
rounded-xl
focus:outline-none
focus:ring-2
focus:ring-cyan-500
placeholder:text-slate-400
"
    />
  );
};

export default SearchBar;