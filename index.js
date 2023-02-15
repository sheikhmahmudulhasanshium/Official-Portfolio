import React from "react"
import ReactDOM from "react-dom"
import Header from "./components/Header.js"
import Body from "./components/Body.js"
import Footer from "./components/Footer.js"

function App()
{
    return(
        <nav>
            <Header/>
            <Body/>
            <Footer/>
        </nav>
        
    )
}
ReactDOM.render(<App/>,document.getElementById("root"))