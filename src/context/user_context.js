import React, { createContext, useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import useFetch from '../hooks/useFetch';
import FetchActions from '../fetch_backend_actions/fetch';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)
    const { fetchData } = useFetch()

    // DECODE TOKEN ON TOKEN CHANGE AND SET USER INFO'S
    useEffect(() => {
        if (token) {
            setLoading(true)

            const decoded_token = decodeToken(token)
            if (decoded_token) {
                setUser(decoded_token)
            } else {
                setToken(null)
                setUser(null)
            }

            setTimeout(() => setLoading(false), 2000)
        }
    }, [token])

    // REVALIDA O TOKEN NO BACKEND
    const revalidade_token = async () => {
        setLoading(true)

        const token_in_sessionStorage = sessionStorage.getItem('acess_token')
        if (!token_in_sessionStorage) {
            setUser(null)
            setToken(null)
            setTimeout(() => setLoading(false), 2000)
            return false
        }
        
        const request_options = FetchActions.revalidar_token(token_in_sessionStorage)
        
        const resultado = await fetchData(request_options)
        if (resultado && resultado.result === 'success') {
            setToken(token_in_sessionStorage)
            setTimeout(() => setLoading(false), 2000)
            return true
        }else {
            setTimeout(() => setLoading(false), 2000)
            return false
        }
    }

    // LOGOUT
    const logout = () => {
        sessionStorage.removeItem('acess_token')
        setToken(null)
        setUser(null)
        return true
    }

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            loading,
            revalidade_token,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
