import { useState } from "react";
import Search from "../common/Search";

export default function BaseTable({ columns, values, isLoading, isError }) {
  console.log('col', columns);

  const [search, setSearch] = useState("");
  console.log('Search', search);

  let valuesData;
  if (isLoading) valuesData = <div>Loading...</div>
  if (!isLoading && isError) valuesData = <div>Error...</div>
  if (!isLoading && !isError && values?.length === 0) valuesData = <div>No Data Found...</div>
  if (!isLoading && !isError && values?.length > 0) {
    valuesData = values.map(value => (
      <tr>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">John Brown</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">45</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">New York No. 1 Lake Park</td>
        <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
          <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Delete</button>
        </td>
      </tr>
    ))
  }


  return (
    <div class="flex flex-col bg-white rounded-lg">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
            <div class="py-3 px-4">
              <Search setSearch={setSearch} />
            </div>
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead class="bg-gray-50 dark:bg-neutral-700">
                  <tr>
                    {
                      columns?.map(column => (
                        <th key={column.name} scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">{column?.name}</th>
                      ))
                    }

                    <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                  {valuesData}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}