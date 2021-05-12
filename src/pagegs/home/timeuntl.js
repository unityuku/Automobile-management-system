export function getNowDate(time) {
    let date = new Date(time)
    let Y = date.getFullYear()
    let M = date.getMonth() + 1
    let D = date.getDate()
    M = M < 10 ? `0${M}` : M
    D = D < 10 ? `0${D}` : D
    return `${Y}-${M}-${D}`
}