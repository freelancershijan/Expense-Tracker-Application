import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setRefresh } from "../../features/filters/filterSlice";
import BaseButton from "../button/BaseButton";
import BaseDatePicker from "../common/BaseDatePicker";
import BreadCrumbs from "../common/BreadCrumbs";
import Search from "../common/Search";
import RefreshIcon from "../icons/RefreshIcon";
import BaseTable from "./BaseTable";

export default function BaseTableList({ columns, values, total, isLoading, error, isError, isShowDelete = true, isShowDate = true, isShowSearch = true, isRefresh = true, breadcrumbs = [] }) {

  const dispatch = useDispatch();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { category } = useParams();

  const handleRefresh = () => {
    dispatch(setRefresh());
    setRefreshTrigger((prev) => prev + 1);
  }

  return (
    <div className="flex flex-col bg-white rounded-lg">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
            <div className="flex justify-between px-5 items-center">
            <div>
              <h1 className="text-xl font-semibold text-primary capitalize">{category}</h1>
              {breadcrumbs.length > 0 && <BreadCrumbs breadcrumbs={breadcrumbs} className="mt-2" />}
            </div>
            <div className="flex z-50">
              {
                isShowSearch &&
                <div className="py-3 px-4">
                  <Search refreshTrigger={refreshTrigger} width="w-64" />
                </div>
              }
              {
                isShowDate &&
                <div className="py-3 px-4 w-[300px]">
                  <BaseDatePicker refreshTrigger={refreshTrigger} />
                </div>
              }
              {
                isRefresh &&
                <div className="flex items-center justify-center">
                  <BaseButton handleClick={handleRefresh}>
                    <RefreshIcon />
                  </BaseButton>
                </div>
              }
            </div>
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