import { CircularProgress, Paper } from "@mui/material"
import { Line } from "react-chartjs-2"
import axios from "axios";
import React, {useState, useEffect} from "react"
import { makeStyles } from "@material-ui/core";


const Chart = ({ coin }) => {
    const [chartData, setCHartData] = useState();
    const [day, setDay] = useState(1);

    const chartDays = [
        {
          label: "24 hrs",
          value: 1,
        },
        {
          label: "30 Days",
          value: 30,
        },
        {
          label: "90 Days",
          value: 90,
        },
        {
          label: "1 Year",
          value: 365,
        },
      ];

    const useStyles = makeStyles((theme) =>({
        container: {
            width: "65%",
            justifyContent: "center",
            padding: 10,
            [theme.breakpoints.down("md")]: {
            width: "90%",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 15,
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        },

        thatButton: {
            border: "1px solid #16C79A",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "sans-serif",
            cursor: "pointer",
            
            "&:hover": {
                backgroundColor: "#16C79A",
                color: "white",
            },
            width: "22%",
            
            },
        
    }));

    const classes = useStyles();

    

    useEffect(()=>{
        getChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[day])

    const getChart = async() => {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=inr&days=${day}`)
       
        setCHartData(data.prices);
        console.log(data.prices);
    };

    
        
    return(
        <Paper className={classes.container}>

            {!chartData ?
             (<CircularProgress 
                style={{ color: "#16C79A" }}
                size={250}
                thickness={1} />):(
                    <>
                 <Line
                 data={{
                     labels: chartData.map((coinChart) => {
                         let date = new Date(coinChart[0]);
                         let time = date.getHours() > 12 ?
                         `${date.getHours() - 12}:${date.getMinutes()} PM`
                         : `${date.getHours()}:${date.getMinutes()} AM`;

                        return day === 1 ? time : date.toLocaleDateString(); 
                     }),

                 datasets: [{
                     data: chartData.map((coinChart) => (coinChart[1])),
                     label: `Price ( Past ${day <= 1 ? `${day} Day`:`${day} Days`}  ) in INR`,
                     borderColor: "#16C79A",
                     borderWidth: "2"

                 },]       
                 }}
                    options={{
                        elements:{
                            point:{
                                radius: 0,
                            }
                        },
                        legend: {
                            display: true,
                          position: 'bottom',
                            labels: {
                                fontColor: '#333',
                                usePointStyle:true
                            }
                        }

                    }}
                     />
             
             <div
             style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
                
              }}>
                 {chartDays.map((days) => {
                    return <button
                    className={classes.thatButton}
                     key={days.value}
                     onClick={() => setDay(days.value)}
                     style={{
                        backgroundColor: days.value === day ? "#16C79A" : "",
                        color: days.value === day ? "white" : "",
                        fontWeight: days.value === day ? 700 : 500,
                     }}
                     >
                         {days.label}
                     </button>
                 })}
             </div>
             </>
           )}  
        </Paper>
    )
};

export default Chart