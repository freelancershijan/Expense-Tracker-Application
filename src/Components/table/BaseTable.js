import { useDispatch, useSelector } from "react-redux";
import { setSortBy, setSortOrder } from "../../features/filters/filterSlice";
import noDataFoundImage from "../../images/no-data-found.png";
import ArrowSortDownIcon from "../icons/ArrowSortDownIcon";
import ArrowSortUpIcon from "../icons/ArrowSortUpIcon";
import { formatNumbersWithCommas } from './../../utils/formatNumbersWithCommas';

export default function BaseTable({ columns, lists, total, isLoading, isError, isShowDelete }) {

  console.log('lists', lists);


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

  let tableRowsData;
  if (isLoading) {
    const skeletonItems = Array.from({ length: 10 });
    tableRowsData = (
      <tr>
        <td colSpan={columns?.length}>
          <div class="table-skeleton skeleton-gradient">
            <div class="skeleton-content">
              <ul>
                {skeletonItems.map((_, index) => (
                  <li key={index} className="my-3">
                    <div class="h-6 mx-5 bg-slate-200 rounded animate-pulse"></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  if (!isLoading && isError) {
    tableRowsData = <tr>
      <td colSpan={columns?.length}>
        <div className="h-[450px] flex justify-center items-center">
          <img className="h-80 overflow-hidden" src={noDataFoundImage} alt="No Data Found" />
        </div>
      </td>
    </tr>
  }

  if (!isLoading && !isError && lists?.length > 0) {
    tableRowsData = lists
  }

  return (
    <div class="overflow-auto min-h-[500px]">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-primary text-white sticky top-0 z-10">
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
          {tableRowsData}
        </tbody>
        {
          lists?.length && <tfoot class="bg-primary text-white">
            <tr>
              <th></th>
              <th class="px-6 py-3 cursor-pointer text-start font-semibold">Total</th>
              <th class="px-6 py-3 cursor-pointer text-start font-semibold">{formatNumbersWithCommas(total)}</th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        }
      </table>
    </div>
  );
}