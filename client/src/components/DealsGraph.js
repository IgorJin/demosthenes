import React from 'react';
import 'react-vis/dist/style.css';
import {
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis,
    AreaSeries,
    linearGradient,
    GradientDefs,
    VerticalBarSeries,
    LineSeries,
    MarkSeries
} from 'react-vis';

const DealsGraph = () => {
    const gradient = (<GradientDefs>
        <linearGradient
            id="myGradient"
            gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2="000" y2="200">
            <stop offset="0%" stopColor="#109CF1" />
            <stop offset="30%" stopColor="rgba(16, 156, 241, 0.3)" />
            <stop offset="60%" stopColor="rgba(16, 156, 241, 0.2)" />
            <stop offset="90%" stopColor="rgba(16, 156, 241, 0.1)" />
        </linearGradient>
    </GradientDefs>);
    const data = [
        { x: 0, y: 8 },
        { x: 1, y: 5 },
        { x: 2, y: 4 },
        { x: 3, y: 9 },
        { x: 4, y: 1 },
        { x: 5, y: 7 },
        { x: 6, y: 6 },
        { x: 7, y: 3 },
        { x: 8, y: 2 },
        { x: 9, y: 0 }
    ];
    return (
        <div style={{ display: 'flex' }}>

            <XYPlot height={300} width={300}>
            {gradient}

                <XAxis />
                <YAxis />
                
                <LineSeries data={data} curve="curveNatural" />
                <AreaSeries
                    className="area-series-example"
                    curve="curveNatural" 
                    data={data}
                    color={'url(#myGradient)'}
                    stroke='none'
                    //onNearestX ={(event)=> console.log(event)}
                />
            </XYPlot>
        </div>
    )
}
export default DealsGraph;