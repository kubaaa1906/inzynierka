import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAdmin } from './auth';

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAdmin() ? <Component {...props} /> : <Navigate to="/login" />
        }
    />
);

export default AdminRoute;