import React from 'react'

import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Blue'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
//   plugins: {
//     legend: {
//       position: 'right',
//     },
//   },
};

const Score = (props:any) => {
    return (
        <div className="card box box-upper">
            <div className="card-header score-header text-end">
                <div className="box-score-sub">
                    音程ボーナス
                </div>
                <div>
                    1.125点
                </div>
            </div>
            <div className="card-body score-main box-score-main">
                <p>{props.score}<span className="score-char">点</span></p>
            </div>
            <div className="card-footer text-end">
                <div>
                    <span className="box-score-sub">全国平均 82.454点</span><span className="box-score-standard">2018/06/25</span>
                </div>
                <div>
                    {/* <Bar data={data} options={options} /> */}
                </div>
            </div>
        </div>
    )
}

export default Score
