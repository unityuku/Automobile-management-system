const data = {
    dataSource: [
        {
            key: '1',
            username: '673943796',
            password: 'abcdefg',
            message: '2021-04-07',
        },
        {
            key: '2',
            username: '155248362',
            password: '12555252',
            message: '2021-04-08',
        },
    ],
    columns: [
        {
            title: '账号',
            // dataINdex 对应上面数组的名字
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: '用户信息',
            dataIndex: 'message',
            key: 'message',
        },
    ]
}
export const getuser = (test) => {
    console.log(test);
    return data
}
export const adduser = (user) => {
    data.dataSource.push(user)
}