import * as actionTypes from './constants'
const defaultstate = {
    listData: [],
}

export default function carListreducer(state = defaultstate, action) {
    switch (action.type) {
        case actionTypes.GETCAR:
            state = {
                ...state,
                listData: action.payload
            }
        default:
            return state
    }
}