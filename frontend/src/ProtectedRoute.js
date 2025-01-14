import React from "react";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ rola, allowedRoles, children }) => {
    if(!rola){
        return <Navigate to="/login" replace />
    }

    if(!allowedRoles.includes(rola)){
        return <Navigate to="/main" replace />
    }

    return children
}

export default ProtectedRoute