import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk';

import TopNav from "./components/top_nav"
import PoemForm from "./components/poem_form"
import PoemContainer from "./components/poem_container"
import reducers from "./reducers"

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <div className="container">
            <TopNav />
            <PoemForm />
            <PoemContainer />
        </div>
    </Provider>,
    document.querySelector("#app")
)
