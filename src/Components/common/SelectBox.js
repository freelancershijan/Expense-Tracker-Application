import { useEffect, useState } from "react";

export default function SelectBox({setYear}){
  const currentYear = new Date().getFullYear();
  
    // Create state to store the last 5 years
    const [years, setYears] = useState([]);
   
   useEffect(()=> {
     const getYears = () => {
      const lastFiveYears = [];
      for(let i = 0; i<5; i++){
        lastFiveYears.push(currentYear - i);
      }

      return lastFiveYears;
     }
     setYears(getYears);
   }, [setYears])


    return (
      <div className="relative">
      <select onClick={(e)=> setYear(e.target.value)} className="border border-primary w-32">
          {
            years?.map((year)=> <option value={year}>{year}</option>)
          }
      </select>
    </div>
    );
}