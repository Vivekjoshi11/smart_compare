import { useState } from 'react';

interface SelectProps<T> {
  label: string;
  options: Array<{ value: T; label: string }>;
  value: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
}

export const Select = <T>({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option'
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const handleSelect = (optionValue: T | null) => {
    setIsOpen(false);
    onChange(optionValue);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <button
          onClick={toggleOpen}
          className={`w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md 
            bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200
            ${isOpen ? 'border-b-0 rounded-t-md' : 'rounded-md'}`}
        >
          <span className="text-left flex-1">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full border border-gray-300 rounded-b-md bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
            {options.map(option => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 
                  ${option.value === value ? 'bg-blue-50 text-blue-800' : ''}`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};