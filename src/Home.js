import React from 'react';
import AllCategories from './Categories/AllCategories';
import PieChart from './Components/PieChart';
import TotalCount from './TotalCount/TotalCount';


const Home = () => {
    /*     const [theme, setTheme] = useState("light");
    
        useEffect(() => {
            if (theme === 'dark') {
                document.documentElement.classList.add("dark");
            }
            else {
                document.documentElement.classList.remove("dark");
            }
        }, [theme]);
    
        const handleThemeSwitch = () => {
            setTheme(theme === "dark" ? "light" : "dark")
        } */

    return (
        <div>


            {/* <button
                className="btn btn-primary"
                onClick={handleThemeSwitch}
                style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-text)',
                }}
            >
                Click me
            </button> */}


            <TotalCount />
            <AllCategories />
            <PieChart></PieChart>

        </div >
    );
};

export default Home;