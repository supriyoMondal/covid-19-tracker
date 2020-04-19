import { FETCH_ALL, GET_DAILY_DATA } from "./Types";

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
        default:
            return state;
    }
}
