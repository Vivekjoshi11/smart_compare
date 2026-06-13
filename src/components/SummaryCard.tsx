interface SummaryCardProps {
  title: string;
  totalAmount: number;
  taxRate?: number;
  isBestValue?: boolean;
}

export const SummaryCard = ({
  title,
  totalAmount,
  taxRate = 18,
  isBestValue = false
}: SummaryCardProps) => {
  const taxAmount = (totalAmount * taxRate) / 100;
  const finalAmount = totalAmount + taxAmount;

  return (
    <div className={`border rounded-lg p-6 text-center 
      ${isBestValue ? 'border-2 border-green-500 bg-green-50' : 'border-gray-200'}
      dark:${isBestValue ? 'border-2 border-green-500 bg-green-900/20' : 'border-gray-700'}`}>
      <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
      <div className="space-y-3">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Base Amount: <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Tax ({taxRate}%): <span className="font-medium">₹{taxAmount.toFixed(2)}</span>
        </div>
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <p className="font-bold text-xl text-gray-900 dark:text-gray-100">
            Total: ₹{finalAmount.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Inclusive of all taxes
          </p>
        </div>
      </div>
    </div>
  );
};