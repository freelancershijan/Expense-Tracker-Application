import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortBy, setSortOrder } from "../../features/filters/filterSlice";
import Search from "../common/Search";
import ArrowSortDownIcon from "../icons/ArrowSortDownIcon";
import ArrowSortUpIcon from "../icons/ArrowSortUpIcon";

export default function BaseTable({ columns, values, isLoading, isError, isShowDelete }) {
  console.log('values', values);

  const { sort_by, sort_order } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  console.log('Search', search);

  let valuesData;
  if (isLoading) valuesData = <div>Loading...</div>
  if (!isLoading && isError) valuesData = <div>Error...</div>
  if (!isLoading && !isError && values?.length === 0) valuesData = <div>No Data Found...</div>
  if (!isLoading && !isError && values?.length > 0) {
    valuesData = values
  }

  const onSortUp = (data) => {
    dispatch(setSortBy(data?.sort_by));
    dispatch(setSortOrder('desc'));
  }

  const onSortDown = (data) => {
    dispatch(setSortBy(data?.sort_by));
    dispatch(setSortOrder('asc'));
  }

  const onSort = (data) => {
    dispatch(setSortBy(data?.sort_by));

    // Toggle sort order
    if (sort_order === 'desc') {
      dispatch(setSortOrder('asc'));
    } else {
      dispatch(setSortOrder('desc'));
    }
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
                        <th key={column.name} onClick={() => onSort(column)} scope="col" class="px-6 py-3 cursor-pointer text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                          <div className="flex">
                            <span>{column?.name}</span>
                            <div class="flex flex-col gap-0 ml-2" v-if="column?.isSort">
                              <div className="mb-[-4px]" onClick={() => onSortUp(column)}>
                                <ArrowSortUpIcon />
                              </div>
                              <div onClick={() => onSortDown(column)}>
                                <ArrowSortDownIcon />
                              </div>
                            </div>
                          </div>
                        </th>
                      ))
                    }

                    {
                      isShowDelete && <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                    }

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