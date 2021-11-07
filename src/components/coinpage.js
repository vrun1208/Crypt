import axios from 'axios';
import { LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { numberWithCommas } from './table';
import ReactHtmlParser from 'react-html-parser';
import Chart from './chart';
import { Paper } from '@mui/material';
//import { useCallback } from 'react';
import { Box } from '@mui/system';
//import { Paper } from '@mui/material';


const CoinPage = () => {
    let { id } = useParams();
    const [coin, setCoin] = useState();

    useEffect(()=>{
      getCoin();
      // eslint-disable-next-line react-hooks/exhaustive-deps
     },[]);

    const getCoin = async() => {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)

        setCoin(data);
    };

  
    

    const useStyles = makeStyles((theme) => ({
      container: {
        display: "flex",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center",
        },
      },
      sidebar: {
        width: "30%",
        [theme.breakpoints.down("md")]: {
          width: "90%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 15,
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        
      },
      heading: {
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Bebas Neue",
      },
      description: {
        width: "90%",
        fontFamily: "sans-serif",
        fontSize: 15,
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
      },
      marketData: {
        alignSelf: "start",
        paddingLeft: 25,
        paddingTop: 10,
        width: "90%",
        [theme.breakpoints.down("md")]: {
          display: "flex",
          justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
          alignItems: "start",
        },
      },
      }));

    const classes = useStyles();

    if (!coin) return <LinearProgress style={{backgroundColor: "#16C79A"}} />;

    return(
        <Box className={classes.container}>
          
      <Paper elevation={1} className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20, marginTop: 5 }}
        />
        <Typography variant="h3" style={{
          fontFamily: "Bebas Neue",
          fontWeight: "bolder",
          marginBottom: 20,
        }}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1"  className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "sans-serif",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "sans-serif",
              }}
            >
              {"₹"}{" "}
              {numberWithCommas(
                coin?.market_data.current_price.inr
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "sans-serif",
              }}
            >
              {"₹"}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap.inr
                  .toString()
                  .slice(0, -6)
              )}
              Cr.
            </Typography>
          </span>
        </div>
      </Paper>
            <Chart coin={coin}/>
        </Box>
    )
};

export default CoinPage;