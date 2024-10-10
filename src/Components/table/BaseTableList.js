import { useDispatch } from "react-redux";
import { setRefresh } from "../../features/filters/filterSlice";
import BaseDatePicker from "../common/BaseDatePicker";
import Search from "../common/Search";
import RefreshIcon from "../icons/RefreshIcon";
import BaseTable from "./BaseTable";

export default function BaseTableList({ columns, values, total, isLoading, error, isError, isShowDelete = true, isShowDate = true, isShowSearch = true, isRefresh = true }) {

  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(setRefresh())
  }

  return (
    <div className="flex flex-col bg-white rounded-lg">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
            <div className="flex z-50">
            {
              isShowSearch &&
              <div className="py-3 px-4">
                <Search width="300px" />
              </div>
            }
            {
              isShowDate &&
              <div className="py-3 px-4 w-[300px]">
                <BaseDatePicker />
              </div>
            }
            {
              isRefresh &&
              <div className="flex items-center justify-center">
                <button onClick={handleRefresh} className="bg-primary text-white p-2 rounded-lg">
                  <RefreshIcon />
                </button>
              </div>
            }
            </div>

            <BaseTable
              columns={columns}
              total={total}
              isShowDelete={isShowDelete}
              isLoading={isLoading}
              lists={values}
              isError={isError}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}