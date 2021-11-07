import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Paper } from "@mui/material"
import { Box } from '@mui/system';
import { Container } from '@material-ui/core'
import { makeStyles } from "@material-ui/core"
import { LinearProgress, Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {FormControl} from '@mui/material';
//import FormHelperText from '@mui/material/FormHelperText';
import { Select } from '@mui/material';


const News = () => {
    const [newsT, setNewsT] = useState();
    const [category, setCategory] = useState("trending");

    const categories = [
        {
            label: "handpicked",
            value: "handpicked",
          },
          {
            label: "trending",
            value: "trending",
          },
          {
            label: "latest",
            value: "latest",
          },
          {
            label: "bullish",
            value: "bullish",
          },
          {
            label: "bearish",
            value: "bearish",
          },
      ];

    useEffect(() => {
        getNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[category])


    const getNews = async() => {
        const { data } = await axios.get(`https://api.coinstats.app/public/v1/news/${category}?skip=0&limit=5`)

        setNewsT(data.news);
        console.log(data.news);
    }

    const useStyles = makeStyles((theme) => ({
    
        card: {
            width: "90%",
          [theme.breakpoints.down("md")]: {
            width: "90%",
            flexDirection: "column"
          },
          display: "flex",
          margin: "auto",
          marginBottom: 20,
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          
        },
        img: {
            objectFit:"cover",
            width: "280px",
            height: "220px",
            borderRadius: "4px",
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            flexDirection: "column",
            objectFit: "cover",
            borderRadius: "4px",
                    width: "100%",
                    height: "100%",
                    paddingBottom: 20,
        }
        },
        sec: { 
            padding: "0 0 0 10px",
            display: "flex",
            flexDirection: "column",
            [theme.breakpoints.down("sm")]: {
                display: "flex",
            }
          },
        }));
  
      const classes = useStyles();
  

    if (!newsT) return <LinearProgress style={{backgroundColor: "#16C79A"}} />;

    return( 
        <Container style={{ textAlign: "center" }}> 
             <FormControl  
                style={{marginTop: 20, marginBottom: 20,width: "90%",
                        }}
                variant="outlined"
                        >
             <InputLabel id="demo-simple-select-label" >Select</InputLabel>
                <Select 
                label="Select..."
                style={{marginBottom: 20,width: "100%", }}
                value={category} 
                onChange={(e)=> setCategory(e.target.value)}>
                    {categories.map((option) => (
                        <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}

                </Select>
                
            </FormControl>
            <Box  >
            {newsT.map((newsData) => {
                const fulldate = new Date(newsData.feedDate);
                var date = fulldate.toString().split(" "); // ["Sat", "Jan", "09", "2021", "17:45:30", "GMT+0530"]
                const hour = parseInt(date[4].substring(0, 2)); //
                const time = hour > 12 ? true : false;
                return(<Paper elevation={1} key={newsData.id} className={classes.card} >
                     <img
                    className={classes.img}
                    src={newsData.imgURL}
                    alt={newsData.source}
                    />
                    <div 
                    className={classes.sec}
                    >
                        <Typography variant="h5"
                        style={{
                            fontFamily: "sans-serif",
                            fontWeight: "lighter",
                            }}>
                            {newsData?.title}
                        </Typography>
                        <span style={{marginBottom: 25, textAlign: "left",
                         paddingLeft: 20, color: "grey", fontSize: 12}}>
                            Posted on :
                        {time
                            ? `${hour - 12}:${date[4].substring(3, 5)} pm`
                            : `${hour}:${date[4].substring(3, 5)} am`}{" "}
                        on {date[2]} {date[1]} {date[3]}, {date[0]}
                       </span>
                       
                        <Typography variant="subtitle1"
                        style ={{
                            color: "grey",
                            fontSize: 16,
                            padding: 10
                        }} >
                        {ReactHtmlParser(newsData?.description)}.
                        </Typography>
                    </div>
                         
                </Paper>
                   
                )
            })}

        </Box>
        
        </Container>
        
    )
};

export default News