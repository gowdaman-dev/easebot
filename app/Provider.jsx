'use client'

import {SessionContext, SessionProvider} from "next-auth/react"

export const AuthProvider = ({children}) =>{
    return <SessionProvider>
        {children}
    </SessionProvider>
}