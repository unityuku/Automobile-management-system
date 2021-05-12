import * as actionTypes from './constants'
const defaultstate = {
    dataSource: [],
}

export default function userListreducer(state = defaultstate, action) {
    switch (action.type) {
        case actionTypes.GETUSER:
            state = {
                ...state,
                dataSource: action.payload
            }
        case actionTypes.DETUSER:
            state = {
                ...state,
                dataSource: action.payload
            }
        default:
            return state
    }
}