import CircularProgressBar from "./CircularProg";
import { useEffect, useState } from "react";
import { useBudgets } from "../contexts/BudgetContext";
import Plot from 'react-plotly.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";



function StatsPage(props) {
    const [monthly, setMonthly] = useState(0);
    const [yearly, setYearly] = useState(0);
    const [weekly, setWeekly] = useState(0);
    const [total, setTotal] = useState(0);
    const [dataOfYear, setDataOfYear] = useState([]);
    const [dataOfMonth, setDataOfMonth] = useState([]);
    const { getExpensesOfMonth, getExpensesOfWeek,
        expensesStorage, getExpensesOfYear, weekNumber, formatAmount, expenses } = useBudgets();

    useEffect(() => {
        // alert(expensesStorage[0].amount)
        // localStorage.clear()
        let m = new Date().getMonth() + 1
        let y = new Date().getFullYear()
        let x = 0


        expensesStorage.map((e) => {
            x += parseFloat(e.amount)
        })
        setTotal(x)
        x = 0


        let monthlyExpenses = getExpensesOfMonth(m)
        monthlyExpenses.map((e) => {
            x += parseFloat(e.amount)
        })
        setMonthly(x)
        x = 0

        let yearlyExpenses = getExpensesOfYear(y)
        yearlyExpenses.map((e) => {
            x += parseFloat(e.amount)
        })
        setYearly(x)
        x = 0

        let weeklyExpneses = getExpensesOfWeek(weekNumber())
        weeklyExpneses.map((e) => {
            // alert(e.week)
            x += parseFloat(e.amount)
        })
        setWeekly(x)

        x = 0
        let u = 0
        for (let i = 1; i <= parseInt(new Date().getMonth() + 1); i++) {
            getExpensesOfMonth(i).map((e) => {
                x += parseFloat(e.amount)
            })
            dataOfYear[u] = {
                name: monthsMap.get(i), spendigs: x
            }
            u++
            x = 0
        }
        u = 0;

        let startingWeek = parseInt(new Date().getMonth() + 1) * 4
        let endingWeek = startingWeek + 4
        for (let i = startingWeek; i < endingWeek; i++) {
            getExpensesOfWeek(i).map((e) => {
                x += parseFloat(e.amount)
            })
            dataOfMonth[u] = {
                name: `week ${u}`, spendigs: x
            }
            u++
            x = 0
        }

    }, [expensesStorage])


    const monthsMap = new Map([
        [1, 'January'],
        [2, 'February'],
        [3, 'March'],
        [4, 'April'],
        [5, 'May'],
        [6, 'June'],
        [7, 'July'],
        [8, 'August'],
        [9, 'September'],
        [10, 'October'],
        [11, 'November'],
        [12, 'December']
    ]);




    return (
        <div style={{ display: props.display }} className="stats">

            <div className="container-stats">
                <div id="total">Total spending: &nbsp;
                    <span>{formatAmount(total)}</span>
                </div>
                <div className="card">
                    <div className="col">
                        <h2>Weekly rate </h2>
                        <p>This is the percantage of your spending this week in comparison with other weeks
                            of the current month.
                        </p>
                        <p style={{ opacity: 1, fontWeight: 600 }}>Total: {formatAmount(weekly)}</p>

                    </div>
                    <div className="container-month">
                        <CircularProgressBar className="prog" stroke="#4db8ff"
                            progress={(weekly / total) * 100 > 0 ? ((weekly / total) * 100).toString().split(".")[0]
                                : 0} />
                    </div>
                </div>
                <div className="card">
                    <div className="col">
                        <h2>Monthly rate </h2>
                        <p>This is the percantage of your spending this month in comparison with other months
                            this year.
                        </p>
                        <p style={{ opacity: 1, fontWeight: 600 }}>Total: {formatAmount(monthly)}</p>

                    </div>
                    <div className="container-month">
                        <CircularProgressBar className="prog" stroke="#4db8ff"
                            progress={(monthly / total) * 100 > 0 ? (monthly / total) * 100 : 0} />
                    </div>
                </div>
                {/* <div>
                    <div className="container-month">
                        <CircularProgressBar className="prog" stroke="#4db8ff" progress={(monthly / total) * 100} />
                        <p>{monthly}</p>
                    </div>
                    <h3>Monthly spending</h3>
                </div>
                <div>
                    <div className="container-month">
                        <CircularProgressBar className="prog" stroke="#4db8ff" progress={(yearly / total) * 100} />
                        <p>{yearly}</p>
                    </div>
                    <h3>Yearly spending</h3>
                </div> */}
                <div className="plot">
                    <h2>This Month</h2>
                    <p>{"(" + monthsMap.get(new Date().getMonth() + 1) + ")"}
                    </p>

                    <ResponsiveContainer className={"inner"} width="80%" height={350}>
                        <BarChart data={dataOfMonth}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="spendigs" fill="#069d86" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="plot">
                    <h2>This Year</h2>
                    <p>{"(" + new Date().getFullYear() + ")"}
                    </p>
                    <ResponsiveContainer className={"inner"} width="80%" height={350}>
                        <BarChart data={dataOfYear}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="spendigs" fill="#069d86" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    )
}

export default StatsPage
