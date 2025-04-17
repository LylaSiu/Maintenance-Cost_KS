import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';

type MaintenanceType = 'labour' | 'comprehensive';

interface MaintenanceSettings {
  hospitalName: string;
  duration: number;
  maintenanceType: MaintenanceType;
  totalListPrice: number;
  incrementRate: number;
}

export default function MaintenanceCalculator() {
  const [settings, setSettings] = useState<MaintenanceSettings>({
    hospitalName: '',
    duration: 6,
    maintenanceType: 'labour',
    totalListPrice: 0,
    incrementRate: 1.05,
  });

  const baseRates = {
    labour: 0.06,
    comprehensive: 0.10,
  };

  const calculateMaintenanceCosts = () => {
    const costs: number[] = [];
    const baseRate = baseRates[settings.maintenanceType];
    let previousYearCost = settings.totalListPrice * baseRate;

    for (let year = 2; year <= settings.duration + 1; year++) {
      if (year === 2) {
        costs.push(previousYearCost);
      } else {
        previousYearCost *= settings.incrementRate;
        costs.push(previousYearCost);
      }
    }

    return costs;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // The costs are calculated on-demand in the render
  };

  const costs = calculateMaintenanceCosts();

  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">
            Hospital Name
          </label>
          <input
            type="text"
            id="hospitalName"
            required
            className="input mt-1"
            value={settings.hospitalName}
            onChange={(e) => setSettings({ ...settings, hospitalName: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="totalListPrice" className="block text-sm font-medium text-gray-700">
            Total List Price (HK$)
          </label>
          <input
            type="number"
            id="totalListPrice"
            required
            min="0"
            step="0.01"
            className="input mt-1"
            value={settings.totalListPrice}
            onChange={(e) => setSettings({ ...settings, totalListPrice: Number(e.target.value) })}
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Maintenance Duration (Years)
          </label>
          <input
            type="number"
            id="duration"
            required
            min="1"
            max="10"
            className="input mt-1"
            value={settings.duration}
            onChange={(e) => setSettings({ ...settings, duration: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maintenance Type
          </label>
          <RadioGroup
            value={settings.maintenanceType}
            onChange={(value: MaintenanceType) => setSettings({ ...settings, maintenanceType: value })}
            className="mt-2"
          >
            <RadioGroup.Label className="sr-only">Maintenance Type</RadioGroup.Label>
            <div className="space-y-2">
              <RadioGroup.Option
                value="labour"
                className={({ checked }) =>
                  `${checked ? 'bg-blue-50 border-blue-200' : 'bg-white'}
                   relative flex cursor-pointer rounded-lg px-5 py-4 border focus:outline-none`
                }
              >
                {({ checked }) => (
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium ${checked ? 'text-blue-900' : 'text-gray-900'}`}
                        >
                          Labour Only (6%)
                        </RadioGroup.Label>
                      </div>
                    </div>
                    {checked && (
                      <div className="text-blue-500">
                        <CheckIcon className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                )}
              </RadioGroup.Option>

              <RadioGroup.Option
                value="comprehensive"
                className={({ checked }) =>
                  `${checked ? 'bg-blue-50 border-blue-200' : 'bg-white'}
                   relative flex cursor-pointer rounded-lg px-5 py-4 border focus:outline-none`
                }
              >
                {({ checked }) => (
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium ${checked ? 'text-blue-900' : 'text-gray-900'}`}
                        >
                          Comprehensive (10%)
                        </RadioGroup.Label>
                      </div>
                    </div>
                    {checked && (
                      <div className="text-blue-500">
                        <CheckIcon className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                )}
              </RadioGroup.Option>
            </div>
          </RadioGroup>
        </div>

        <div>
          <label htmlFor="incrementRate" className="block text-sm font-medium text-gray-700">
            Annual Increment Rate
          </label>
          <input
            type="number"
            id="incrementRate"
            required
            min="1"
            max="2"
            step="0.01"
            className="input mt-1"
            value={settings.incrementRate}
            onChange={(e) => setSettings({ ...settings, incrementRate: Number(e.target.value) })}
          />
        </div>
      </form>

      {settings.totalListPrice > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Maintenance Cost Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost (HK$)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {costs.map((cost, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Year {index + 2}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cost.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                    Total:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {costs.reduce((sum, cost) => sum + cost, 0).toFixed(2)}
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

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="currentColor" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
} 