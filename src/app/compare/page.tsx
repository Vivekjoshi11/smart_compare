/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { brands, categories, productItems, getProductsByCategory, getProductByBrandAndCategory } from "../mockData";
import { InputNumber } from "../../components/InputNumber";
import { Select } from "../../components/Select";
import { ProductCard } from "../../components/ProductCard";
import { SummaryCard } from "../../components/SummaryCard";

export default function ComparePage () {
  // Form state
  const [projectName, setProjectName] = useState('');
  const [selectedPlateSize, setSelectedPlateSize] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<Array<{
    categoryId: number;
    quantity: number;
    brandSelections: Record<number, number>;
  }>>([]);
  
  // UI state
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<Array<{
    brand: typeof brands[0];
    items: Array<{
      category: typeof categories[0];
      product: typeof productItems[0] | null;
      quantity: number;
    }>;
    subtotal: number;
    tax: number;
    total: number;
    totalModules: number;
  }>>([]);
  const [bestValueIndex, setBestValueIndex] = useState<number | null>(null);

  const calculateTotalModules = (selections: Array<{
    categoryId: number;
    quantity: number;
  }>) => {
    return selections.reduce((total, selection) => {
      const category = categories.find(cat => cat.id === selection.categoryId);
      return total + (category ? category.module_size * selection.quantity : 0);
    }, 0);
  };

  const handleAddItem = () => {
    setSelectedItems(prev => [
      ...prev,
      {
        categoryId: 0,
        quantity: 1,
        brandSelections: {}
      }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (itemIndex: number, categoryId: number | null) => {
    if (categoryId === null) return;
    
    setSelectedItems(prev => {
      const newItems = [...prev];
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        categoryId,
        brandSelections: {}
      };
      return newItems;
    });
  };

  const handleQuantityChange = (itemIndex: number, quantity: number) => {
    setSelectedItems(prev => {
      const newItems = [...prev];
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        quantity
      };
      return newItems;
    });
  };

  const handleBrandSelection = (itemIndex: number, brandId: number | null, quantity: number) => {
    if (brandId === null) {
      setSelectedItems(prev => {
        const newItems = [...prev];
        delete newItems[itemIndex].brandSelections[brandId ?? 0];
        return newItems;
      });
      return;
    }
    
    setSelectedItems(prev => {
      const newItems = [...prev];
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        brandSelections: {
          ...newItems[itemIndex].brandSelections,
          [brandId]: quantity
        }
      };
      return newItems;
    });
  };

  const handleCalculate = () => {
    if (!selectedPlateSize || selectedItems.length === 0) {
      alert('Please select a plate size and add at least one item');
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const brandResults: Array<{
        brand: typeof brands[0];
        items: Array<{
          category: typeof categories[0];
          product: typeof productItems[0] | null;
          quantity: number;
        }>;
        subtotal: number;
        tax: number;
        total: number;
        totalModules: number;
      }> = [];

      brands.forEach(brand => {
        let subtotal = 0;
        let totalModules = 0;
        const brandItems: Array<{
          category: typeof categories[0];
          product: typeof productItems[0] | null;
          quantity: number;
        }> = [];

        selectedItems.forEach(item => {
          const category = categories.find(cat => cat.id === item.categoryId);
          if (!category) return;

          const quantityForThisBrand = item.brandSelections[brand.id] || 0;
          
          if (quantityForThisBrand > 0) {
            const product = getProductByBrandAndCategory(brand.id, item.categoryId) ?? null;
            const itemTotal = product ? product.price * quantityForThisBrand : 0;
            
            brandItems.push({
              category,
              product,
              quantity: quantityForThisBrand
            });
            
            subtotal += itemTotal;
            totalModules += category.module_size * quantityForThisBrand;
          }
        });

        const tax = (subtotal * 18) / 100;
        const total = subtotal + tax;
        
        brandResults.push({
          brand,
          items: brandItems,
          subtotal,
          tax,
          total,
          totalModules
        });
      });

      const bestValueIndex = brandResults.reduce((lowestIndex, current, currentIndex) => {
        return current.total < brandResults[lowestIndex].total ? currentIndex : lowestIndex;
      }, 0);

      setResults(brandResults);
      setBestValueIndex(bestValueIndex);
      setIsCalculating(false);
    }, 1000);
  };

  const isValidSelection = (totalModules: number) => {
    return selectedPlateSize !== null && totalModules <= selectedPlateSize;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex space-x-4 items-center mb-4">
            <Image
              src="/next.svg"
              alt="Next.js Logo"
              width={394}
              height={80}
              className="h-8 w-auto dark:invert"
            />
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={1155}
              height={1000}
              className="h-8 w-auto dark:invert ml-4"
            />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
            Compare in Detail
          </h1>
          <p className="mt-1 text-center text-gray-600 dark:text-gray-400 max-w-xl">
            Compare prices across brands and validate component compatibility for your electrical projects
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Project Details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name (e.g., Master Bedroom)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Modular Plate Size (in modules)
                </label>
                <Select
                  label="Plate Size"
                  options={[
                    { value: 1, label: '1 Module' },
                    { value: 2, label: '2 Modules' },
                    { value: 3, label: '3 Modules' },
                    { value: 4, label: '4 Modules' },
                    { value: 6, label: '6 Modules' },
                    { value: 8, label: '8 Modules' },
                    { value: 12, label: '12 Modules' }
                  ]}
                  value={selectedPlateSize}
                  onChange={setSelectedPlateSize}
                  placeholder="Select plate size"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-between text-gray-900 dark:text-gray-100">
              Electrical Components
              <button
                onClick={handleAddItem}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-sm font-medium disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </h2>
            
            {selectedItems.map((item, index) => (
              <div key={index} className="border-t pt-4 first:border-t-0">
                <div className="flex items-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Item {index + 1}
                  </h3>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <Select
                      label="Category"
                      options={categories.map(cat => ({
                        value: cat.id,
                        label: `${cat.name} (${cat.module_size} module${cat.module_size > 1 ? 's' : ''})`
                      }))}
                      value={item.categoryId || null}
                      onChange={(value) => handleCategoryChange(index, value)}
                      placeholder="Select category"
                    />
                  </div>
                  
                  <div>
                    <InputNumber
                      label="Quantity"
                      min={1}
                      max={20}
                      value={item.quantity}
                      onChange={(value) => handleQuantityChange(index, value)}
                    />
                  </div>
                  
                  <div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Brand Selections
                      </label>
                      <div className="space-y-2">
                        {brands.map(brand => (
                          <div key={brand.id} className="flex items-center">
                            <InputNumber
                              label={brand.name}
                              min={0}
                              max={20}
                              value={item.brandSelections[brand.id] || 0}
                              onChange={(value) => handleBrandSelection(index, brand.id, value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {selectedItems.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No items added. Click the &quot;+&quot; button to add electrical components.
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleCalculate}
              disabled={isCalculating || selectedItems.length === 0 || selectedPlateSize === null}
              className={`px-6 py-3 font-medium rounded-lg shadow-sm 
                ${isCalculating || selectedItems.length === 0 || selectedPlateSize === null 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}
                disabled:opacity-50
                transition-colors`}
            >
              {isCalculating ? 'Calculating...' : 'Compare Prices'}
            </button>
          </div>

          {results.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                Price Comparison Results
              </h2>
              
                {selectedItems.length > 0 && selectedPlateSize !== null && (
                  <div className={`mb-6 p-4 rounded-lg ${results.every(r => isValidSelection(r.totalModules)) 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
                  }`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {results.every(r => isValidSelection(r.totalModules)) 
                          ? '✓' 
                          : '✗'}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          {results.every(r => isValidSelection(r.totalModules)) 
                            ? 'All selections fit within the selected plate size' 
                            : 'Some selections exceed the selected plate size'}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Selected plate size: {selectedPlateSize} modules
                        </p>
                        {!results.every(r => isValidSelection(r.totalModules)) && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Please reduce quantities or select a larger plate size.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((result, index) => (
                  <div key={result.brand.id} className="group">
                    <ProductCard
                      brandName={result.brand.name}
                      productName="Various Items"
                      price={result.subtotal}
                      quantity={1}
                      total={result.subtotal}
                      isSelected={index === bestValueIndex}
                    >
                      {result.items.filter(item => item.product && item.quantity > 0).map((item, itemIndex) => (
                        <div key={itemIndex} className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex justify-between">
                          <span>{item.category.name} × {item.quantity}</span>
                          <span>₹{(item.product!.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </ProductCard>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((result, index) => (
                  <SummaryCard
                    key={result.brand.id}
                    title={result.brand.name}
                    totalAmount={result.subtotal}
                    taxRate={18}
                    isBestValue={index === bestValueIndex}
                  />
                ))}
              </div>
              
              {bestValueIndex !== null && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Best Value: {results[bestValueIndex].brand.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Save ₹{(Math.max(...results.map(r => r.total)) - results[bestValueIndex].total).toFixed(2)} 
                    compared to the most expensive option.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
