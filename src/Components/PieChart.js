import { useContext, useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import { AuthContext } from "../Context/AuthProvider";
import { useGetUserYearDetailsQuery } from "../features/user/userAPI";
import noDataFoundImage from "../images/no-data-found.png";
import { formatNumbersWithCommas } from "../utils/formatNumbersWithCommas";
import SelectBox from "./common/SelectBox";
import Skeleton from "./Loading/Skeleton";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

export default function PieChart() {
  const { user } = useContext(AuthContext);
  const [year, setYear] = useState(2024)
  const { data: userYearData, isLoading, isSuccess, isError } = useGetUserYearDetailsQuery({
    email: user?.email,
    year
  })

  useEffect(() => {
    console.log('userYearData', userYearData?.result);
  }, [userYearData])


  const state = {
    series: [{
      name: 'Income',
      data: userYearData?.result?.income?.resultData
    }, {
      name: 'Expense',
      data: userYearData?.result?.expense?.resultData
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      colors: ['#185519', '#B8001F'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val
          }
        }
      }
    },
  }

  const pieState = {
    series: [userYearData?.result?.incomePercentage, userYearData?.result?.expensePercentage],
    options: {
      chart: {
        width: 340,
        type: 'pie',
      },
      legend: {
        position: 'bottom'
      },
      labels: ['Income', 'Expense'],
      colors: ['#185519', '#B8001F'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 340
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };

  return (
    <div className="grid xl:grid-cols-3 gap-5">
      <div id="chart" className="xl:col-span-2 col-span-1 bg-white p-2 rounded-lg shadow-lg">
        {
          isLoading
            ?
            <div className="h-[350px] w-full flex justify-center items-center">
              <LoadingSpinner />
            </div>
            :
            <div>
              <div className="md:flex grid md:justify-between text-center gap-3 md:items-center py-3">
                <SelectBox setYear={setYear} />
                <div className="md:flex gap-3">
                  <p>Total Income: {isLoading ? <Skeleton /> : <span className="font-bold text-[#185519]">{formatNumbersWithCommas(userYearData?.result?.income?.total)}</span>}</p>
                  <p>Total Expense: {isLoading ? <Skeleton /> : <span className="font-bold text-[#B8001F]">{formatNumbersWithCommas(userYearData?.result?.expense?.total)}</span>}</p>
                </div>
              </div>
              <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
            </div>
        }
      </div>
      <div id="chart" className="xl:col-span-1 col-span-1 bg-white p-2 rounded-lg shadow-lg">
        {
          isLoading
            ?
            <div className="h-[350px] w-full flex justify-center items-center">
              <LoadingSpinner />
            </div>
            :
            <div className="flex justify-center items-center h-full">
              {
                userYearData?.result?.incomePercentage === null && userYearData?.result?.expensePercentage === null ? <div className="h-[450px] flex justify-center items-center">
                  <img className="h-80 overflow-hidden" src={noDataFoundImage} alt="No Data Found" />
                </div> :
                  <ReactApexChart options={pieState.options} series={pieState.series} type="pie" width={380} />
              }
            </div>
        }
      </div>
    </div>
  );
}