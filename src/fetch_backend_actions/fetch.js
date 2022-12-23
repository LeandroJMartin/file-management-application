export default {
    login: (email, senha) => {
        return {
            acao: "login",
            options: {
                method: "post",
                mode: "cors",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    senha,
                }),
            },
        }
    },

    revalidar_token: (token_in_sessionStorage) => {
        return {
            acao: "revalidarToken",
            options: {
                method: "post",
                mode: "cors",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token_in_sessionStorage}),
            },
        }
    },

    fetch_buscar_pastas_arquivos: (path) => {
        return {
            acao: "buscarPaths",
            options: {
                method: "post",
                mode: "cors",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({path}),
            },
        }
    },

    fetch_upload_arqs: (formdate) => {
        return {
            acao: "upload",
            options: {
                method: "post",
                mode: "no-cors",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                },
                body: formdate,
            },
        }
    },

    fetch_deletar_arquivo: ({ id }) => {
        const formD = new FormData()
        formD.append('fileID', id)
        formD.append('acao', "deletar")

        return {
            acao: "deletar_arquivo",
            options: {
                method: "post",
                mode: "cors",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                },
                body: formD,
            },
        }
    },

    fetch_renomear_arquivo: ({ id }, newNameFile) => {
        const formD = new FormData()
        formD.append('fileID', id)
        formD.append('acao', "renomear")
        formD.append('newNameFile', newNameFile)

        return {
            acao: "renomear_arquivo",
            options: {
                method: "post",
                mode: "cors",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                },
                body: formD,
            },
        }
    },

    fetch_criar_pasta: (path, name) => {
        return {
            acao: "criar_pasta",
            options: {
                method: "post",
                mode: "cors",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    path,
                    name,
                    acao: "criar_pasta",
                }),
            },
        }
    },

    fetch_renomear_pasta: (path, nName) => {
        return {
            acao: "renomear_pasta",
            options: {
                method: "post",
                mode: "cors",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    path,
                    nName,
                    acao: "renomear_pasta",
                }),
            },
        }
    },

    fetch_deletar_pasta: (path) => {
        return {
            acao: "deletar_pasta",
            options: {
                method: "post",
                mode: "cors",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    path,
                    acao: "deletar_pasta",
                }),
            },
        }
    },

    fetch_multiple_download: (arrayID) => {
        return {
            acao: "multiple_download",
            options: {
                method: "post",
                mode: "cors",
                responseType: "blob",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/zip',
                },
                body: JSON.stringify({
                    acao: "multipleDownload",
                    arrayID,
                }),
            },
        }
    },

    fetch_multiple_delete: (path, arrayID) => {
        return {
            acao: "multiple_delete",
            options: {
                method: "post",
                mode: "cors",
                body: JSON.stringify({
                    acao: "multipleDelete",
                    path,
                    arrayID,
                }),
            },
        }
    },
}