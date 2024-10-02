import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-tailwindcss-datepicker";
import { setDate } from "../../features/filters/filterSlice";

const BaseDatePicker = () => { 
    const dispatch = useDispatch()
    const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null
    });

     // Function to format date to YYYY-MM-DD
     const formatDate = (date) => {
        return date ? format(new Date(date), 'yyyy-MM-dd') : "";
    };

    useEffect(()=> {
        dispatch(setDate({
            start_date: formatDate(value.startDate),
            end_date: formatDate(value.endDate),
        }))
    }, [dispatch, setDate])

    // Logging the formatted dates
    console.log('Formatted Value', {
        startDate: formatDate(value.startDate),
        endDate: formatDate(value.endDate)
    });
    

    return (
        <div classNames="border-2 border-primary">
          <DatePicker 
            primaryColor={"blue"}
            value={value} 
            onChange={newValue => setValue(newValue)}
        /> 
        </div>
    );
};

export default BaseDatePicker;
