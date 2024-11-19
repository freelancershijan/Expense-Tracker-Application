import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-tailwindcss-datepicker";
import { setDate } from "../../features/filters/filterSlice";

const BaseDatePicker = ({ refreshTrigger }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    // Function to format date to YYYY-MM-DD
    const formatDate = (date) => {
        return date ? format(new Date(date), 'yyyy-MM-dd') : "";
    };

    useEffect(() => {
        // Dispatch the action even if dates are cleared
        dispatch(setDate({
            start_date: formatDate(value?.startDate),
            end_date: formatDate(value?.endDate),
        }));
    }, [value, dispatch]);

    // Reset Value when refresh button click
    useEffect(() => {
        setValue({
            startDate: null,
            endDate: null
        });
    }, [refreshTrigger])

    return (
        <div className="border-2 border-primary rounded-lg py-[2px]">
            <DatePicker
                primaryColor={"blue"}
                value={value}
                onChange={newValue => setValue(newValue)}
            />
        </div>
    );
};

export default BaseDatePicker;
