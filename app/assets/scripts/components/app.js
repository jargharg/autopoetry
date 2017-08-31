import React, { Component } from "react"
import TopNav from "./top_nav"
import PoemForm from "./poem_form"
import PoemContainer from "./poem_container"

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <TopNav />
                <PoemForm />
                <PoemContainer />
            </div>
        )
    }
}
