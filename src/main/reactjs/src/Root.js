import React from 'react';
import {BrowserRouter} from "react-router-dom";
import RouteMain from "./RouteMain";
import './App.css';

function Root(props) {
    return (
        <div>
            <BrowserRouter>
                <RouteMain/>
            </BrowserRouter>
        </div>
    );
}

export default Root;