import React, { useContext, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MainContext } from '../../Context/MainContext'

const Chart = ({ dailyData, country }) => {
    const { countryData } = useContext(MainContext);
    const { recovered, confirmed, deaths } = countryData;
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
    const BarChart = () => (
        Object.values(countryData).length > 0 ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgb(0, 0, 255,0.5)',
                            'rgb(0, 255, 0,0.5)',
                            'rgb(255, 0, 0,0.7)',
                        ],
                        data: [confirmed, recovered, deaths]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current State in ${country}.` }
                }} />
        ) : <CircularProgress />
    )

    return (
        <div className={styles.container}>
            {country == 'global' ? <LineChart /> : <BarChart />}
        </div>
    )
}

export default Chart
