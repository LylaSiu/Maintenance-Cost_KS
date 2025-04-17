import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { DocumentArrowUpIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

interface QuotationItem {
  productCode: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export default function QuotationInput() {
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPdfFile(file);
      // TODO: Implement PDF parsing logic
    }
  };

  const handleManualAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    const newItem: QuotationItem = {
      productCode: formData.get('productCode') as string,
      description: formData.get('description') as string,
      quantity: Number(formData.get('quantity')),
      unitPrice: Number(formData.get('unitPrice')),
      amount: Number(formData.get('quantity')) * Number(formData.get('unitPrice')),
    };

    setItems([...items, newItem]);
    form.reset();
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-t-lg bg-blue-900/20 p-1">
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
             ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
             ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            <div className="flex items-center justify-center space-x-2">
              <DocumentArrowUpIcon className="h-5 w-5" />
              <span>PDF Upload</span>
            </div>
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
             ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
             ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            <div className="flex items-center justify-center space-x-2">
              <PencilSquareIcon className="h-5 w-5" />
              <span>Manual Entry</span>
            </div>
          </Tab>
        </Tab.List>
        <Tab.Panels className="p-6">
          <Tab.Panel>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <DocumentArrowUpIcon className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF file only</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <form onSubmit={handleManualAdd} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="productCode" className="block text-sm font-medium text-gray-700">
                    Product Code
                  </label>
                  <input
                    type="text"
                    name="productCode"
                    id="productCode"
                    required
                    className="input mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    required
                    className="input mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    min="1"
                    required
                    className="input mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">
                    Unit Price
                  </label>
                  <input
                    type="number"
                    name="unitPrice"
                    id="unitPrice"
                    min="0"
                    step="0.01"
                    required
                    className="input mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">
                  Add Item
                </button>
              </div>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {items.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Quotation Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.productCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                    Total:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 