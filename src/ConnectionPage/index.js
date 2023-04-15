import React, { useContext } from "react";
import ConnectForm from "./ConnectForm";
import { Navigate } from "react-router-dom";
import { ConnectionContext } from "../App";

const ConnectionPage = ({connected, onConnect}) => {
    const connection = useContext(ConnectionContext)
    console.log(connection)
        if(connected) {
            return (
                <Navigate to="/vmix-control-panel" replace />
            )
        }
        else{return <ConnectForm onConnect={onConnect}/>}
        
};

export default ConnectionPage;
