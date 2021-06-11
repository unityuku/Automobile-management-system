import React, { useState, useEffect, useCallback } from 'react'
import { Card } from 'antd'
import axios from '../../api/axios'
// import echarts from 'echarts'
//按需导入
import echarts from 'echarts/lib/echarts'
//导入柱形图
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
//引入样式



const BarA = (props) => {
    const [carState, setCarState] = useState([])
    const [leasecarState, setleaseCarState] = useState([])
    const [brandArray, setbrandArray] = useState([])
    const [leaseArray, setleaseArray] = useState([])
    useEffect(() => {
        axios.get('/carlist').then(({ data }) => {
            setCarState(data)
            // console.log(data);
        })
        getlist()
        var id = 1
        axios.post(`/selectcar/${id}`).then(({ data }) => {
            // console.log(data);
            setleaseCarState(data)
        })
        getlease()
    }, [carState])

    const getlist = useCallback(() => {

        const brandList = [0, 0, 0, 0]
        carState.map((item) => {
            switch (item.brand) {
                case "奔驰": brandList[0]++; break
                case "大众": brandList[1]++; break
                case "东风日产": brandList[2]++; break
                case "奥迪": brandList[3]++; break
                default: break;
            }
            return 1
        })

        setbrandArray(brandList)

    }, [])
    const getlease = () => {

        const brandList = [0, 0, 0, 0]
        leasecarState.map((item) => {
            switch (item.brand) {
                case "奔驰": brandList[0]++; break
                case "大众": brandList[1]++; break
                case "东风日产": brandList[2]++; break
                case "奥迪": brandList[3]++; break
                default: break;
            }
            return 1
        })
        // console.log(brandList);
        setleaseArray(brandList)
        // console.log(brandArray);
    }
    const getOption = () => {

        let option = {
            title: {
                text: '车辆品牌统计'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['奔驰', '大众', '东风日产', '奥迪']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '数量',
                    type: 'bar',
                    barWidth: '50%',
                    data: brandArray
                }
            ]
        }
        return option;
    }
    const gOption = () => {
        let option = {
            title: {
                text: '汽车品牌租赁量',

                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '数据量',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: brandArray[0], name: '奔驰' },
                        { value: brandArray[1], name: '大众' },
                        { value: brandArray[2], name: '东风日产' },
                        { value: brandArray[3], name: '奥迪' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option;
    }
    const lOption = () => {
        let option = {
            xAxis: {
                type: 'category',
                data: ['奔驰', '大众', '东风日产', '奥迪']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [leaseArray[0], leaseArray[1], leaseArray[2], leaseArray[3]],
                type: 'line'
            }]
        };
        return option;
    }

    return (

        <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Card.Grid>
                <div style={{ textAlign: "center" }}>汽车品牌分布</div>
            </Card.Grid>
            <Card.Grid>
                <div style={{ textAlign: "center" }}>汽车品牌分布</div>
            </Card.Grid>
            <Card.Grid>
                <div style={{ textAlign: "center" }}>出租量</div>
            </Card.Grid>
            <Card.Grid className="bar_a">
                <ReactEcharts option={getOption()} />

            </Card.Grid>
            <Card.Grid className="bar_a">

                <ReactEcharts option={gOption()} />
            </Card.Grid>
            <Card.Grid className="bar_a">

                <ReactEcharts option={lOption()} />
            </Card.Grid>
        </div>

    )
}
export default BarA