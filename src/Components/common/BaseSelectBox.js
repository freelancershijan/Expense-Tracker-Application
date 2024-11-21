
export default function BaseSelectBox({ isLoading = false, isError, error, lists = [], value = '', setValue }) {

  let content;
  if (isLoading) {
    content = <option>Loading...</option>;
  } else if (isError) {
    content = <option>{error.message}</option>;
  } else if (!isLoading && !isError && lists?.length === 0) {
    content = <option>No data found</option>;
  } else {
    content = lists.map((list) => <option key={list._id} value={list._id}>{list.name}</option>);
  }

  return (
    <select 
    disabled={isLoading}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    data-hs-select='{
  "hasSearch": true,
  "searchLimit": 5,
  "searchPlaceholder": "Search Category...",
  "searchClasses": "block w-full text-black text-sm border-gray-200 rounded-lg before:absolute before:inset-0 before:z-[1] py-2 px-3",
  "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0",
  "placeholder": "Select Category...",
  "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span class=\"me-2\" data-icon></span><span class=\"text-gray-800 \" data-title></span></button>",
  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none",
  "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",
  "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none",
  "optionTemplate": "<div><div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div class=\"text-gray-800 \" data-title></div></div></div>",
  "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
}' class="w-full">
      <option value="">Choose</option>
      {content}
    </select>

  );
}