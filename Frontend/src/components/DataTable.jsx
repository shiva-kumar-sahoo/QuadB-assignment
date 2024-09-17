import React from "react";

const DataTable = ({ cryptoData }) => {
  const calculateSavings = (buy, sell) => {
    if (buy && sell && buy !== "0.0" && sell !== "0.0") {
      return ((sell - buy) / buy) * 100;
    }
    return 0;
  };

  const calculateDifference = (buy, sell) => {
    if (buy && sell && buy !== "0.0" && sell !== "0.0") {
      return sell - buy;
    }
    return 0;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
          <thead className="text-gray-600 dark:text-gray-300 font-bold text-2xl">
            <tr className="text-left text-gray-600 dark:text-gray-300">
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                #
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Platform
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Last Traded Price
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Buy / Sell Price
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Difference
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Savings
              </th>
            </tr>
          </thead>
          <tbody className="text-black bg-gray-200 dark:bg-gray-800 dark:text-white font-bold text-lg">
            {cryptoData.map((crypto, index) => (
              <tr
                key={crypto.base_unit}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  {crypto.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  ₹ {crypto.last}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  ₹ {crypto.buy} / ₹ {crypto.sell}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  {calculateDifference(
                    parseFloat(crypto.buy),
                    parseFloat(crypto.sell)
                  ).toFixed(2)}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  {calculateSavings(
                    parseFloat(crypto.buy),
                    parseFloat(crypto.sell)
                  ).toFixed(2)}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
