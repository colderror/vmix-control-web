import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Documentation from "../Documentation";
import VmixControlPanel from "../VmixControlPanel";
import ConnectionPage from "../ConnectionPage";
import axios from "axios";
import { ConnectionContext } from "../App";


const Root = () => {
    const [connected, setConnected] = useContext(ConnectionContext)
    
    let url = window.location.hostname === 'localhost' ? 'http://localhost:4001' : 'https://vmix-backend.herokuapp.com/';
    const handleConnect = ({ipAddress, port, username, password}) => {
        console.log("Connecting to vMix API")
        axios
        .post(`${url}/connect`, { ipAddress, port, username, password })
        .then((response) => {
            console.log("Connected to vMix API")
            console.log("response", response)
            console.log("Setting connected to true")
            setConnected(true);
            // Set the token and expiration time in localStorage
            const token = JSON.stringify(response.data);
            const expirationTime = new Date().getTime() + 4 * 60 * 60 * 1000; // 4 hours 0 days from now
            localStorage.setItem('vmix-control-panel-token', token);
            localStorage.setItem('vmix-control-panel-token-expiration', expirationTime);
        })
        .catch((error) => {
            console.error('Failed to connect to vMix API', error);
            alert('Failed to connect. Please check your credentials and try again.');
        });
    };

    const routes = [
        {
            path: '/login',
            element: <ConnectionPage connected={connected} onConnect={handleConnect} />,
            private: false,
        },
        {
            path: '/',
            element: connected ? <VmixControlPanel /> : <ConnectionPage connected={connected} onConnect={handleConnect} />,
            needsConnection: true,
        },
        {
            path: '/documentation',
            element: <Documentation />,
            private: false,
        },
    ];

    // Get the token and expiration time from localStorage
    const token = localStorage.getItem('vmix-control-panel-token');
    const expirationTime = localStorage.getItem('vmix-control-panel-token-expiration');
    
    // If there's a token and it hasn't expired, use it to connect to vMix API
    if (token && new Date().getTime() < expirationTime) {
        // const {ipAddress, port, username, password} = token;
        console.log("token", JSON.parse(token))
        let {ipAddress, port, username, password} = JSON.parse(token);
        handleConnect({ipAddress, port, username, password})
    // Connect to vMix API using the stored settings
    } else {
    // Prompt the user to enter their connection settings
    }

    useEffect(() => {
    }, []);

    return (
    <BrowserRouter>
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    </BrowserRouter>
    );
}

export default Root;