import axios from 'axios';
import { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { LinearProgress } from '@mui/material';
import { Pagination } from '@mui/material';
import { Table, TableHead,
TableRow, TableCell,
TableBody, TableContainer, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
  row: {
    cursor: "pointer",
    "&:hover":{
      backgroundColor:"whitesmoke",
    }
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#16C79A !important",
  },
})

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Lists = () => {
  const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false);
    const [ crypto, setCrypto ] = useState([]);
    const [page, setPage] = useState(1);

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        getCrypto();
    },[])

    const getCrypto = async()=> {
      setLoading(true);
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false`)

        setCrypto(data);
        //console.log(data);
        setLoading(false);
    };

    const handleSearch =() => {
      return crypto.filter(
        (coin) => coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
      );
    }

    return(<Container style={{ textAlign: "center" }}>
      <Typography
      variant="h3"
      style={{ margin: 18, fontFamily: "roboto", fontWeight: 50,
      color: "#343A40"}}>
        Get info of trending Cryptocurrencies here
      </Typography>
      
      <TextField
        //disabled
        label="search coin here..."
        variant="outlined"
        // here inputProps is used to override outline color
        InputProps={{
          classes:{
            notchedOutline:classes.notchedOutline,
          }
        }}
        style={{marginBottom: 20,width: "100%",
        fontStyle: "oblique",}}
        onChange={(e)=> setSearch(e.target.value)} />

        <TableContainer component={Paper}
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
          {loading ? (
            <LinearProgress style={{backgroundColor: "#16C79A"}} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{backgroundColor:"#16C79A"}}>
                  <TableRow>
                    {["Coin", "Price", "Change", "Market Cap."].map((heading) => (
                      <TableCell
                        style={{
                          fontSize: "16px",
                          color: "white",
                          fontWeight: "700",
                          fontFamily: "sans-serif",
                        }}
                        key={heading}
                        align={heading === "Coin" ? "" : "right"}>
                            {heading}
                      </TableCell>
                    ))}
                  </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                .slice((page-1)* 10, (page-1 )* 10 + 10).map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                    onClick={()=> history.push(`/coin/${row.id}`)}
                    className={classes.row}
                    key={row.name}
                    >
                      <TableCell
                      component="th"
                      scope="row"
                      style={{
                        display:"flex",
                        gap: 5,
                      }}
                      >
                        <img
                        src={row.image}
                        alt={row.name}
                        height="50"
                        style={{marginBottom: 10, marginRight: 5}}
                         />

                         <div
                         style={{display:"flex", flexDirection:"column"}}
                         >
                           <span
                           style={{
                             textTransform:"uppercase",
                             fontSize: 28,
                             fontFamily: "Bebas Neue"
                           }}>
                             {row.symbol}
                           </span>
                            <span
                            style={{
                              fontSize: 16,
                              fontWeight: "500",
                              fontFamily: "sans-serif"
                            }}>
                              {row.name}
                            </span>
                         </div>
                      </TableCell>

                      <TableCell align="right">
                           {"₹"}{""}
                           {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>

                      <TableCell align="right"
                      style={{
                        color: profit > 0 ? "rgb(57,255,20)" : "red",
                        fontWeight: 600,
                      }}>
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>

                      <TableCell align="right">
                      {"₹"}{""}
                      {numberWithCommas(row.market_cap.toString().slice(0, -6))}Cr.
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
               </Table>
          )}
        </TableContainer>

        <Pagination
          count={(handleSearch().length/10).toFixed(0)}
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
          />

    </Container>
        
    );
}

export default Lists