import React from 'react'
import App from './App'

import { createStore } from "redux";
import { Provider } from "react-redux"
import reducer from "./store/reducers"

const persistedState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : null
const store = persistedState != null ? createStore(reducer, persistedState) : createStore(reducer);
store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()))
})

export default (props) => {
    return (
        <Provider store={store}>
            <App {...props} />
        </Provider>
    )
}
