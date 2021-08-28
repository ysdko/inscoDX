import React from 'react'
import  {Radar}  from "react-chartjs-2";
import { useRouter } from "next/router"


const Chart = (props:any) => {
  const router = useRouter()
  const {
    facial_expression,
    attitude,
    voice_energy,
    speaking_speed,
    voice_stability
  } = router.query;
    const RadarData = {
        labels: ["facial_expression", "attitude", "voice_energy", "speaking_speed", "voice_stability"],
        datasets: [
          {
            label: "March",
            backgroundColor: "rgba(34, 202, 236, .2)",
            borderColor: "rgba(34, 202, 236, 1)",
            pointBackgroundColor: "rgba(34, 202, 236, 1)",
            poingBorderColor: "#000",
            pointHoverBackgroundColor: "#000",
            pointHoverBorderColor: "rgba(34, 202, 236, 1)",
            data: [
              facial_expression,
              attitude,
              voice_energy,
              speaking_speed,
              voice_stability
            ]
          }
        ]
      };
      const RadarOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scale: {
          ticks: {
            min: 0,
            max: 16,
            stepSize: 2,
            showLabelBackdrop: false,
            backdropColor: "rgba(0, 0, 0, 1)"
          },
          angleLines: {
            color: "rgba(0, 0, 0, .3)",
            lineWidth: 1
          },
          gridLines: {
            color: "rgba(0, 0, 0, .3)",
            circular: true
          }
        }
      };
      
    return (
        <div className="chart-bg">
            <Radar 
                data={RadarData}   
                options={RadarOptions} 
                height={300}
            />
        </div>
    )
}

export default Chart
