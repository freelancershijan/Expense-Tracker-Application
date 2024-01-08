import React, { useContext, useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { AuthContext } from '../Context/AuthProvider';
import axios from 'axios';
        

const PieChart = () => {
    const {user} = useContext(AuthContext)
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [totalIncome, setTocalIncome] = useState(0);
    const [totalExpense, setTocalExpense] = useState(0)

    console.log(totalIncome)
    
  
  
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, index) => currentYear - index); 
  
    const [searchYear, setYear] = useState(currentYear);
    const [selectedYear, setSelectedYear] = useState('');
    
    const handleSearch = () => {
        setYear(selectedYear);
        console.log(searchYear)
    };

    useEffect(() => {
        // Fetch income data
        axios.get(`${process.env.REACT_APP_API_URL}/funds/month/${user.email}/${searchYear}`)
            .then(incomeResponse => {
              
            setTocalIncome(Object.values(incomeResponse.data).reduce((p, n) => p + n, 0))
                
            // Fetch expense data
            axios.get(`${process.env.REACT_APP_API_URL}/costs/month/${user.email}/${searchYear}`)
                .then(expenseResponse => {
                  
                    setTocalExpense(Object.values(expenseResponse.data).reduce((p, n) => p + n, 0))

                const documentStyle = getComputedStyle(document.documentElement);
                const textColor = documentStyle.getPropertyValue('--text-color');
                const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
                const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      
                const data = {
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                  datasets: [
                    {
                      type: 'bar',
                      label: 'Income',
                      backgroundColor: documentStyle.getPropertyValue('--green-700'),
                      data: Object.values(incomeResponse.data),
                      borderColor: 'white',
                      borderWidth: 2
                    },
                    {
                      type: 'bar',
                      label: 'Expense',
                      backgroundColor: documentStyle.getPropertyValue('--red-700'),
                      data: Object.values(expenseResponse.data),
                      borderColor: 'white',
                      borderWidth: 2
                    }
                  ]
                };
      
                const options = {
                  maintainAspectRatio: false,
                  aspectRatio: 0.6,
                  plugins: {
                    legend: {
                      labels: {
                        color: textColor
                      }
                    }
                  },
                  scales: {
                    x: {
                      ticks: {
                        color: textColorSecondary
                      },
                      grid: {
                        color: surfaceBorder
                      }
                    },
                    y: {
                      ticks: {
                        color: textColorSecondary
                      },
                      grid: {
                        color: surfaceBorder
                      }
                    }
                  }
                };
      
                setChartData(data);
                setChartOptions(options);
              })
              .catch(expenseError => {
                console.log('Error fetching expense data:', expenseError.message);
              });
          })
          .catch(incomeError => {
            console.log('Error fetching income data:', incomeError.message);
          });
      }, [user, searchYear]);
      
    return (
        <div>
            <div className='flex flex-wrap justify-center items-center gap-5 mb-5 sm:justify-between'>
            <div>
                <select
                    className='px-3 py-1'
                    id="yearSelect"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="" disabled>Select Year</option>
                    {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                    ))}
                </select>
                <button className='px-3 ml-2 py-1 bg-primary text-white rounded-sm' type='submit' onClick={handleSearch}>Search</button>
                </div>
                <div>
                    <p className='font-medium'>Total Income: <span className='font-semibold'>{totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</span></p>
                    <p className='font-medium'>Total Expense: <span className='font-semibold'>{totalExpense.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</span></p>
                </div>
            </div>
             <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    );
};

export default PieChart;