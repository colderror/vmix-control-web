import { useEffect } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const SecuredRoute = ({ connected, element, path }) => {

    if (!connected) {
        return <Navigate to="/" replace />;
    }
    
    return <Route element={element} path={path} />;
};

export default SecuredRoute;