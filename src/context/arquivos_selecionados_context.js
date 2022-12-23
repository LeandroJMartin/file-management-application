import React, { createContext, useEffect, useState } from 'react';
import usePath from '../hooks/usePath';

const SelecinadosContext = createContext()

export const SelecionadosProvider = ({ children }) => {
    const [selecionados, setSelecionados] = useState([])
    const [totalSelecionados, setTotalSelecionados] = useState(0)

    const { path, files } = usePath()


    useEffect(() => {
        setTotalSelecionados(selecionados.length)
    }, [selecionados])



    useEffect(() => {
        setSelecionados([])
    }, [path, files])

    
    const setarSelecionados = (fileID) => {
        if (!fileID) return

        if (selecionados.includes(fileID)) {
            const nArray = [...selecionados.filter((id) => fileID !== id)]
            setSelecionados(nArray)
        } else {
            setSelecionados(prev => [...prev, fileID])
        }
    }

    return (
        <SelecinadosContext.Provider value={{
            selecionados,
            setarSelecionados,
            totalSelecionados,
        }}>
            {children}
        </SelecinadosContext.Provider>
    )
}

export default SelecinadosContext;
