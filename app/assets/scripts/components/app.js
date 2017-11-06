import React, { Component } from "react"
import TopNav from "./top_nav"
import InputForm from "./input_form"
import PoemContainer from "./poem_container"

class App extends Component {
    render() {
        return (
            <div className="container">
                <TopNav />
                <InputForm />
                <PoemContainer />
            </div>
        )
    }
}

export default App
