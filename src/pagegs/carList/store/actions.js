import * as actionType from './constants'
// import { getuser, adduser } from '../../../api/test'
import axios from '../../../api/axios'
export const getCars = (payload) => ({
    type: actionType.GETCAR,
    payload: payload
})
export const todogetCars = () => {

    return (dispatch) => {
        axios.get('/carlist').then(({ data }) => {
            console.log(data);
            dispatch(getCars(data))
            // setList(data)
        })
    }
}
