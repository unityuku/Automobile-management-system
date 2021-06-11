import * as actionType from './constants'
// import { getuser, adduser } from '../../../api/test'
import axios from '../../../api/axios'
export const getUsers = (payload) => ({
    type: actionType.GETUSER,
    payload: payload
})

export const detUsers = (payload) => ({
    type: actionType.DETUSER,
    payload: payload
})

export const todogetUser = (test) => {

    return (dispatch) => {
        axios.get('/list').then(({ data }) => {
            console.log(data);
            dispatch(getUsers(data))
            // setList(data)
        })
    }
}

export const todoDetUsers = () => {
    return (dispatch) => {
        axios.get('./detuser').then(({ data }) => {
            dispatch(detUsers(data))
        })
    }
}