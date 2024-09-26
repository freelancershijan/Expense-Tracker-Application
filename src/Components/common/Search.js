import { useEffect, useState } from "react";

export default function Search({ setSearch }) {

  const [inputValue, setInputValue] = useState("");

  // Use debounce effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearch(inputValue);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  const handleSearchValue = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="max-w-md">
      <div className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 pl-3.5">
            <svg className="shrink-0 size-4 text-gray-400 dark:text-white/60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <input
            className="py-3 pl-12 pe-4 block w-full border-primary rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
            type="text" role="combobox"
            aria-expanded="false"
            placeholder="Type a name"
            value={inputValue}
            onChange={handleSearchValue}
            data-hs-combo-box-input="" />
        </div>

      </div>
    </div>
  );
}