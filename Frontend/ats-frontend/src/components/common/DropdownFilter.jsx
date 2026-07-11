import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, Check } from "lucide-react";

function DropdownFilter({
  label,
  options = [],
  selected = [],
  onChange,
  multiple = true,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () =>
      document.removeEventListener("mousedown", handler);
  }, []);

  const filteredOptions = useMemo(() => {
    return options.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  const toggle = (value) => {
    if (multiple) {
      if (selected.includes(value)) {
        onChange(selected.filter((v) => v !== value));
      } else {
        onChange([...selected, value]);
      }
    } else {
      onChange(value);
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="min-w-[180px] h-11 px-4 rounded-xl border border-gray-300 bg-white hover:border-blue-500 flex items-center justify-between"
      >
        <span className="text-sm font-medium truncate">
          {multiple
            ? selected.length
              ? `${label} (${selected.length})`
              : label
            : selected || label}
        </span>

        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute mt-2 w-72 bg-white rounded-2xl border shadow-2xl z-50">

          {/* Search */}

          <div className="p-3 border-b">

            <div className="relative">

              <Search
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${label}`}
                className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none"
              />

            </div>

          </div>

          {/* Buttons */}

          {multiple && (
            <div className="flex justify-between px-3 py-2 border-b">

              <button
                onClick={() => onChange(filteredOptions)}
                className="text-blue-600 text-sm"
              >
                Select All
              </button>

              <button
                onClick={() => onChange([])}
                className="text-red-500 text-sm"
              >
                Clear
              </button>

            </div>
          )}

          {/* List */}

          <div className="max-h-64 overflow-y-auto">

            {filteredOptions.length === 0 && (
              <p className="p-4 text-gray-400 text-sm">
                No data found
              </p>
            )}

            {filteredOptions.map((item) => (
              <button
                key={item}
                onClick={() => toggle(item)}
                className="w-full flex justify-between items-center px-4 py-3 hover:bg-blue-50 text-left"
              >
                <span>{item}</span>

                {multiple ? (
                  selected.includes(item) && (
                    <Check
                      size={18}
                      className="text-blue-600"
                    />
                  )
                ) : (
                  selected === item && (
                    <Check
                      size={18}
                      className="text-blue-600"
                    />
                  )
                )}
              </button>
            ))}

          </div>

        </div>
      )}
    </div>
  );
}

export default DropdownFilter;