import { FETCH_ALL, GET_DAILY_DATA, GET_ALL_COUNTRIES, GET_COUNTRY_DETAILS } from "./Types";

export default (state, { type, payload }) => {
    switch (type) {
        case FETCH_ALL:
            return {
                ...state,
                deaths: payload.deathCount,
                recovered: payload.recoveredCount,
                confirmed: payload.confirmCount,
                lastUpdate: payload.lastUpdate
            }
        case GET_DAILY_DATA:
            return {
                ...state,
                dailyData: payload
            }
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: payload
            }
        case GET_COUNTRY_DETAILS:
            return {
                ...state,
                countryData: payload
            }
        default:
            return state;
    }
}
