import React, { createContext, useReducer } from 'react'
import Reducer from './Reducers'
import axios from 'axios'
import { FETCH_ALL, GET_DAILY_DATA, GET_ALL_COUNTRIES, GET_COUNTRY_DETAILS } from './Types';

const baseUrl = 'https://covid19.mathdro.id/api'

const initialState = {
    deaths: 0,
    recovered: 0,
    confirmed: 0,
    countryData: {},
    lastUpdate: '',
    dailyData: [],
    countries: [],
};

export const MainContext = createContext(initialState);

export const MainContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    async function fetchData() {
        try {
            let res = await axios.get(baseUrl);
            const { deaths, recovered, confirmed, lastUpdate } = res.data;

            let payload = {
                deathCount: deaths.value,
                recoveredCount: recovered.value,
                confirmCount: confirmed.value,
                lastUpdate
            }
            dispatch({
                type: FETCH_ALL,
                payload
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    async function fetchDailyData() {
        try {
            let res = await axios.get(`${baseUrl}/daily`);
            res = res.data
            dispatch({
                type: GET_DAILY_DATA,
                payload: res
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    async function getAllCountries() {
        try {
            let res = await axios.get(`${baseUrl}/countries`);
            res = res.data;
            let payload = res.countries.map((country) => country.name);
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    function fetchAll() {
        getAllCountries();
        fetchDailyData();
        fetchData();
    }
    async function getCountryData(name) {
        try {
            let res = await axios.get(`${baseUrl}/countries/${name}`);
            res = res.data;
            let payload = {
                confirmed: res.confirmed.value,
                recovered: res.recovered.value,
                deaths: res.deaths.value,
            }
            dispatch({
                type: GET_COUNTRY_DETAILS,
                payload
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <MainContext.Provider value={{
            ...state,
            fetchAll,
            getCountryData
        }}>
            {children}
        </MainContext.Provider>
    )
}