import { combineReducers } from "redux";
import loginreducer from '../pagegs/login/store/reducer'
import userListreducer from '../pagegs/userList/store/reducer'
import carListreducer from '../pagegs/carList/store/reducer'
const reducer = combineReducers({
    login: loginreducer,
    userList: userListreducer,
    carList: carListreducer
})
export default reducer