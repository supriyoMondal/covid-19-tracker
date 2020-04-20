import React, { useContext, useEffect, useState } from 'react'

import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css'
import { MainContextProvider, MainContext } from './Context/MainContext'

import coronaImage from './img/image.png'

const MainComponent = () => {
  const [country, setCountry] = useState('global');
  const { deaths, recovered, confirmed, lastUpdate, dailyData, countries, fetchAll, getCountryData } = useContext(MainContext);
  let data = {
    deaths, recovered, confirmed, lastUpdate
  }
  const handleCountryChange = (val) => {
    setCountry(val);
    getCountryData(val);
  }
  //fetches all the data
  useEffect(() => {
    fetchAll()
  }, [])



  return (
    <div className={styles.container}>
      <img src={coronaImage} alt="COVID-19" style={{ width: '60%', maxWidth: 200 }} />
      <h5 style={{ textAlign: 'center', color: "grey", marginBottom: 5 }}>All the data is taken from https://covid19.mathdro.id/api.</h5>
      <Cards data={data} />
      <CountryPicker countries={countries} country={country}
        handleCountryChange={handleCountryChange} />
      <Chart dailyData={dailyData} country={country} />
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
