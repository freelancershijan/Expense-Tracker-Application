import BaseDatePicker from "../common/BaseDatePicker";
import Search from "../common/Search";
import BaseTable from "./BaseTable";

export default function BaseTableList({ columns, values, total, isLoading, error, isError, isShowDelete, isShowSearch }) {

  return (
    <div className="flex flex-col bg-white rounded-lg">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
            <div className="flex">
            {
              isShowSearch &&
              <div className="py-3 px-4">
                <Search width="300px" />
              </div>
            }
            {
              isShowSearch &&
              <div className="py-3 px-4 w-[300px]">
                <BaseDatePicker />
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