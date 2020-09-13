import React from 'react';
import ReactEcharts from "echarts-for-react";

function Charts({dateData, amountData}) {
    return (
        <div>
            <ReactEcharts
            option={{
            xAxis: {
                type: "category",
                data: dateData,
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                data: amountData,
                type: "line",
                },
            ],
            }}
        />
        </div>
    )
}

export default Charts
