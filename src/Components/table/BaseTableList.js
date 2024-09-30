import { useState } from "react";
import Search from "../common/Search";
import BaseTable from "./BaseTable";

export default function BaseTableList({ columns, values, total, isLoading, error, isError, isShowDelete, isShowSearch }) {

  const [search, setSearch] = useState("");

  console.log('Search', search);

  return (
    <div class="flex flex-col bg-white rounded-lg">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
            {
              isShowSearch &&
              <div class="py-3 px-4">
                <Search setSearch={setSearch} />
              </div>
            }

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