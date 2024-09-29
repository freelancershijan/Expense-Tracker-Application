import { useDispatch, useSelector } from "react-redux";
import { setSortBy, setSortOrder } from "../../features/filters/filterSlice";
import ArrowSortDownIcon from "../icons/ArrowSortDownIcon";
import ArrowSortUpIcon from "../icons/ArrowSortUpIcon";
import { formatNumbersWithCommas } from './../../utils/formatNumbersWithCommas';

export default function BaseTable({ columns, lists, total, isLoading, isError, isShowDelete }) {

  const { sort_by, sort_order } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

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
    <div class="overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead class="bg-primary text-white">
          <tr>
            {
              columns?.map(column => (
                <th key={column.name} onClick={() => onSort(column)} scope="col" class="px-6 py-3 cursor-pointer text-start text-xs font-medium uppercase">
                  <div className="flex">
                    <span>{column?.name}</span>
                    <div class="flex flex-col gap-0 ml-2" v-if="column?.isSort">
                      <div className="mb-[-6px]" onClick={() => onSortUp(column)}>
                        <ArrowSortUpIcon
                          color={sort_by === column?.sort_by && sort_order === "desc"}
                        />
                      </div>
                      <div onClick={() => onSortDown(column)}>
                        <ArrowSortDownIcon
                          color={sort_by === column?.sort_by && sort_order === "asc"}
                        />
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
          {lists}
        </tbody>
        <tfoot class="bg-primary text-white">
          <tr>
            <th></th>
            <th class="px-6 py-3 cursor-pointer text-start font-semibold">Total</th>
            <th class="px-6 py-3 cursor-pointer text-start font-semibold">{formatNumbersWithCommas(total)}</th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}