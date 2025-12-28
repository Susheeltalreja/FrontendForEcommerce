import React from 'react'

import { Navigate, useLocation } from 'react-router-dom'

function RouteAuth({ isAuth, UserData, children }) {

    const locate = useLocation();

    if (!isAuth && !locate.pathname.includes("/auth/login")
        && !locate.pathname.includes("/auth/register")
        && !locate.pathname.includes("/auth/otp") &&
        !locate.pathname.includes("/auth/forget") &&
        !locate.pathname.includes("/auth/update")
    ) {
        return <Navigate to="/auth/login"></Navigate>
    }

    if (isAuth && (locate.pathname.includes("/auth/login") || locate.pathname.includes("/auth/register"))) {
        if (UserData?.role === "admin") {
            return <Navigate to="/admin/dashboard"></Navigate>
        } else {
            return <Navigate to="/User/home"></Navigate>
        }
    }
    if (isAuth && locate.pathname.includes('admin') && UserData?.role !== 'admin') {
        return <Navigate to="*"></Navigate>
    }
    if (isAuth && locate.pathname.includes('User') && UserData?.role !== 'user') {
        return <Navigate to="/admin/dashboard"></Navigate>
    }

    return (
        <div>{children}</div>
    )
}

export default RouteAuth