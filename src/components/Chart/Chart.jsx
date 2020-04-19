import React from 'react'
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
const Chart = ({ dailyData }) => {
    console.log(dailyData);

    const LineChart = () => (
        dailyData.length > 1 ? <Line

            data={{
                labels: dailyData.map(({ reportDate }) => reportDate),
                datasets: [{
                    data: dailyData.map(({ totalConfirmed }) => totalConfirmed),
                    label: "Infected",
                    borderColor: "#3333ff",
                    backgroundColor: "rgba(0,0,255,.7)",
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths.total),
                    label: "Deaths",
                    backgroundColor: 'rgba(255,0,0,.7)',
                    borderColor: 'red',
                    fill: true
                }]
            }}
        /> : <CircularProgress />
    )

    return (
        <div className={styles.container}>
            <LineChart />
        </div>
    )
}

export default Chart
