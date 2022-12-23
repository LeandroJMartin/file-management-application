import React, { createContext, useState } from 'react';
import FetchActions from '../fetch_backend_actions/fetch';
import useFetch from '../hooks/useFetch';

const PathContext = createContext()

export const PathProvider = ({ children }) => {
    const [realizandoBusca, setRealizandoBusca] = useState(false)
    const [diretorios, setDiretorios] = useState([])
    const [files, setFiles] = useState([])
    const [path, setPath] = useState({
        pathCompleto: "painel/",
        atual: null,
        ultimaAcao: "enter",
    })

    const { fetchData } = useFetch()


    const back_home = () => {
        setPath({
            pathCompleto: "painel/",
            atual: null,
            ultimaAcao: "back",
        })
    }


    const retornar_caminho_completo_for_request = () => {
        const caminho = path.pathCompleto.substr(path.pathCompleto.indexOf("/") + 1, path.pathCompleto.length)

        if (!caminho) {
            return ""
        } else {
            return caminho
        }
    }

    const buscar = async () => {
        setRealizandoBusca(true)

        const request_options = FetchActions.fetch_buscar_pastas_arquivos(retornar_caminho_completo_for_request())
        const resultado = await fetchData(request_options)
        if (resultado && resultado.result !== "erro") {
            const json_parse = JSON?.parse(resultado)

            const diretorios = json_parse.filter(item => item.type === "dir")
            const arquivos = json_parse.filter(item => item.type === "file")

            setDiretorios(diretorios)
            setFiles(arquivos)
            setRealizandoBusca(false)
            return
        }
    }

    const voltar_pasta = () => {
        if (!path.atual) return
                
        const dir_atual = path.pathCompleto.split("/")

        const anterior = dir_atual[dir_atual.length - 2]
        const newBackPath = path.pathCompleto.substr(0, path.pathCompleto.lastIndexOf("/"))

        if (dir_atual.length <= 2) {
            return setPath({
                pathCompleto: "painel/",
                atual: null,
                ultimaAcao: "back",
            })
        }

        return setPath({
            pathCompleto: newBackPath,
            atual: anterior,
            ultimaAcao: "back",
        })
    }

    const criar_pasta = async (name) => {
        const request_options = FetchActions.fetch_criar_pasta(retornar_caminho_completo_for_request(), name)
        const resultado = await fetchData(request_options)
        if (resultado && resultado.result !== "erro") {
            return true
        } else {
            return false
        }
    }

    const renomear_pasta = async (nName) => {
        const request_options = FetchActions.fetch_renomear_pasta(retornar_caminho_completo_for_request(), nName)
        const resultado = await fetchData(request_options)
        if (resultado && resultado.result !== "erro") {
            return true
        } else {
            return false
        }
    }
    
    const deletar_pasta = async () => {
        const request_options = FetchActions.fetch_deletar_pasta(retornar_caminho_completo_for_request())
        const resultado = await fetchData(request_options)
        if (resultado && resultado.result !== "erro") {
            return true
        } else {
            return false
        }
    }




    const deletar_arquivo = async (fileID) => {
        const request_options = FetchActions.fetch_deletar_arquivo(fileID)
        const resultado = await fetchData(request_options)
        if (resultado && resultado.result !== "erro") {
            return true
        } else {
            return false
        }
    }

    const renomear_arquivo = async (fileID, newNameFile) => {
        const request_options = FetchActions.fetch_renomear_arquivo(fileID, newNameFile)
        const resultado = await fetchData(request_options)
        if (resultado && resultado.result !== "erro") {
            return true
        } else {
            return false
        }
    }

    return (
        <PathContext.Provider value={{
            path,
            setPath,
            diretorios,
            files,
            setFiles,
            back_home,
            retornar_caminho_completo_for_request,
            buscar,
            voltar_pasta,
            realizandoBusca,
            criar_pasta,
            renomear_pasta,
            deletar_pasta,
            deletar_arquivo,
            renomear_arquivo,
        }}>
            {children}
        </PathContext.Provider>
    )
}

export default PathContext;
