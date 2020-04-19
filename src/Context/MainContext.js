import React, { createContext, useReducer } from 'react'
import Reducer from './Reducers'
import axios from 'axios'
import { FETCH_ALL, GET_DAILY_DATA } from './Types';

const baseUrl = 'https://covid19.mathdro.id/api'

const initialState = {
    deaths: 0,
    recovered: 0,
    confirmed: 0,
    country: {},
    lastUpdate: '',
    dailyData: []
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
            let res = await axios.get(`https://covid19.mathdro.id/api/daily`);
            res = res.data
            dispatch({
                type: GET_DAILY_DATA,
                payload: res
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <MainContext.Provider value={{
            ...state,
            fetchData,
            fetchDailyData
        }}>
            {children}
        </MainContext.Provider>
    )
}