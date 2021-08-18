import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import Routes from "./routes/Routes";
import sidebar from './reducers/sidebarReducer';
const store = createStore(sidebar);

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>, 
    document.getElementById("root")
);