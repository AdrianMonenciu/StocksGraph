import React from 'react';
import Plot from 'react-plotly.js';

export default function StocksGraph(props) {
    const {
        stockXValue, 
        stockYValue,
    } = props

    return (
        <div>
            <Plot
                data={[
                {
                    x: stockXValue,
                    y: stockYValue,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                },
                {type: 'bar', x: stockXValue, y: stockYValue},
                ]}
                layout={{width: 750, height: 450, title: 'Graph'}}
            />
        </div>
    )
}