import React, { useContext, useEffect } from 'react'

import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css'
import { MainContextProvider, MainContext } from './Context/MainContext'

const MainComponent = () => {

  const { fetchData, deaths, recovered, confirmed, lastUpdate, fetchDailyData, dailyData } = useContext(MainContext);
  let data = {
    deaths, recovered, confirmed, lastUpdate
  }
  //fetches all the data
  useEffect(() => {
    fetchData();
    fetchDailyData();
  }, [])


  return (
    <div className={styles.container}>
      <Cards data={data} />
      <CountryPicker />
      <Chart dailyData={dailyData} />
    </div>
  )
}

const App = () => {
  return (
    <MainContextProvider>
      <MainComponent />
    </MainContextProvider>
  )
}

export default App
