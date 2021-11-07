import React from 'react'
import {AppBar, Container, Toolbar, Typography} from '@mui/material'
import "../App.css"


export default function Footer() {
    return (
        <AppBar position="static" style={{
            backgroundColor:"#16C79A", zIndex :-1,
        }}>
          <Container maxWidth="md" style={{textAlign: "center"}}>
            <Toolbar style={{display:"flex", flexDirection:"column",
             justifyContent: "center"}}>
              <Typography variant="subtitle2" color="inherit" style={{marginBottom: 10}}>
               Made with ❤️,⌨️ and 🖱️ by Varun 
               </Typography>
               <span>
               <a href="https://github.com/vrun1208" style={{color:"white", marginLeft:10,
              marginRight:30}}>
                    <i className="fab fa-github fa-lg"> </i> 
                </a>

                <a href="https://twitter.com/extinctT_T" style={{color:"white"}}>
                    <i className="fab fa-twitter fa-lg"> </i> 
                </a>
               </span>
               
                  
            </Toolbar>
          </Container>
        </AppBar>
    )
}