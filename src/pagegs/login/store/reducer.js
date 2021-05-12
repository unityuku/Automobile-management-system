
const defaultstate = {
    user: [
        {
            username: 'root',
            password: '123'
        }
    ]
}

export default function loginreducer(state = defaultstate, action) {
    switch (action.type) {

        default:
            return state
    }
}