
export default function DynamicTableSection({ setSelectedTab, selectedTab, children }) {

  const tabs = [
    {
      id: 'funds',
      name: 'Incomes'
    },
    {
      id: 'costs',
      name: 'Expenses'
    },
  ]

  return (
    <div className="bg-white rounded-lg">
      <div className="p-3 md:flex grid gap-3 text-center md:justify-between">
        <div>
          <h1 className="font-semibold text-xl">Recent Transactions</h1>
        </div>
        <div>
          <ul className="flex gap-3 justify-center">
            {
              tabs.map((tab) => <li onClick={() => setSelectedTab(tab.id)} className={`${ selectedTab === tab.id ? 'bg-primary text-white' : 'bg-gray-200' } px-3 py-1 text-md rounded-md cursor-pointer`} key={tab.id}>{tab.name}</li>)
            }
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
}