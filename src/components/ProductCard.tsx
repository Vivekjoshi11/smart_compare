import { ReactNode } from 'react';

interface ProductCardProps {
  brandName: string;
  productName: string;
  price: number;
  quantity: number;
  total: number;
  isSelected?: boolean;
  children?: ReactNode;
}

export const ProductCard = ({
  brandName,
  productName,
  price,
  quantity,
  total,
  isSelected = false,
  children
}: ProductCardProps) => {
  return (
    <div className={`border rounded-lg p-4 hover:shadow-md transition-shadow 
      ${isSelected ? 'border-2 border-blue-500 bg-blue-50' : 'border-gray-200'}
      dark:${isSelected ? 'border-2 border-blue-500 bg-blue-900/20' : 'border-gray-700'}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{brandName}</h3>
        <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          {quantity} ×
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{productName}</p>
      <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
        <span className="font-medium text-gray-800 dark:text-gray-100">₹{price.toFixed(2)}</span>
        <span className="font-bold text-lg text-gray-900 dark:text-gray-100">₹{total.toFixed(2)}</span>
      </div>
      {children}
    </div>
  );
};