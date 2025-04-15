import React from "react"
import { Navigate } from "react-router-dom"


export const AuthRedirect = ({children}: {children: React.ReactNode}) => {
    const token = localStorage.getItem("token")
    if (token){
        return <Navigate to="/dashboard"/>
    }

    return <>{children}</>
}


export const PravitRoute = ({children}: {children: React.ReactNode}) => {
    const token = localStorage.getItem("token")
    if (!token){
        return <Navigate to="/signin"/>
    }
    return <>{children}</>
}