import { useState } from "react";
import CostsTableList from "../views/recentTransactions/costs/view/TableList";
import FundsTableList from "../views/recentTransactions/funds/view/TableList";
import DynamicTableSection from "./table/DynamicTableSection";

export default function Recent() {
    const [selectedTab, setSelectedTab] = useState("funds");

    return (
        <div>
            <DynamicTableSection selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
                {
                    selectedTab === 'funds' ? <FundsTableList /> : <CostsTableList />
                }
            </DynamicTableSection>
        </div>
    );
}