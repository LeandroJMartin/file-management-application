import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import usePath from '../../hooks/usePath';
import useFetch from '../../hooks/useFetch';
import FetchActions from '../../fetch_backend_actions/fetch';
import {
    borderRadius,
    Button,
    Container,
    Input,
    inputsHeight,
    Span,
    theme,
} from '../../theme';

import Barra_Selecionados from '../barra_selecionados';

export default function Index({ comp, setarModalChildren }) {
    const [filesUpload, setFilesUpload] = useState([])
    const [desativado, setDesativado] = useState(true)
    const [pastaBloqueada, setPastaBloqueada] = useState(false)
    const { path, retornar_caminho_completo_for_request, buscar } = usePath()
    const { user } = useAuth()

    const { fetchData } = useFetch()

    useEffect(() => {
        if (path?.atual) {
            setDesativado(false)
        } else {
            setDesativado(true)
        }
    }, [path])

    const pastas_bloqueadas_rename_delete = ["Campanhas mensais", "Institucionais", "Produtos"]

    const file_input_ref = useRef()

    const botoes_painel = ["Adicionar arquivos", "Nova pasta", "Renomear pasta", "Excluir pasta atual"]

    const handleClick = item => {
        if (desativado) return
        if (item === "Renomear pasta" && pastaBloqueada || item === "Excluir pasta atual" && pastaBloqueada) return
        

        if (item === "Adicionar arquivos") {
            file_input_ref.current.click()
        }

        if (item === "Nova pasta") {
            setarModalChildren({acao: item})
            return
        }

        if (item === "Renomear pasta") {
            setarModalChildren({acao: item})
            return
        }

        if (item === "Excluir pasta atual") {
            setarModalChildren({acao: item})
            return
        }
    }


    // BLOQUEAR DE DELETAR AS PASTAS RAIZ
    useEffect(() => {
        if (path.atual) {
            if (pastas_bloqueadas_rename_delete.includes(path.atual)) {
                setPastaBloqueada(true)
            } else {
                setPastaBloqueada(false)
            }
        }
    }, [path])


    // UPLOAD DOS ARQUIVOS QUANDO SELECIONADOS
    useEffect(() => {
        if (filesUpload.length > 0) {
            const upload = async (request_options) => {
                const resultado = await fetchData(request_options)
                if (resultado) {
                    await buscar()
                }
            }

            const uploadFormData = new FormData()

            filesUpload.forEach((file, index) => (
                uploadFormData.append(`Files-${index}`, file)
            ))

            const path_atual = retornar_caminho_completo_for_request()
            uploadFormData.append("path", path_atual)
            uploadFormData.append("acao", "upload")

            const request_options = FetchActions.fetch_upload_arqs(uploadFormData)
            upload(request_options)
        }
    }, [filesUpload])


    return (
        <Container
            display={"flex"}
            direction={"row"}
            width={"100%"}
            height={inputsHeight}
        >
            <Container
                display={"flex"}
                direction={"row"}
                jContent={"space-between"}
                aContent={"center"}
                minWidth={"150px"}
                width={"100%"}
                height={"100%"}
                border={desativado && user && user.level === "admin" ? "1px solid gray" : `1px solid ${theme.color.primary}`}
                bRadius={borderRadius}
            >
                {user && user.level === "admin"
                    ?
                        botoes_painel?.map((item, index) => {
                            return (
                                <Span
                                    key={`${index}`}
                                    fSize={"min(1.4rem, 1.2vw)"}
                                    flex={1}
                                    height={"100%"}
                                    padding={"0 6px"}
                                    jContent={"center"}
                                    aContent={"center"}
                                    cursor={desativado || index >= 2 && pastaBloqueada ? "default" : "pointer"}
                                    color={desativado || index >= 2 && pastaBloqueada ? "gray" : theme.color.secondary}
                                    bRight={index !== botoes_painel.length - 1 ? desativado ? `1px solid gray` : `1px solid ${theme.color.primary}` : null}
                                    transition={"all .1s"}
                                    colorHover={desativado || index >= 2 && pastaBloqueada ? null : theme.color.secondary}
                                    bgColorHover={desativado || index >= 2 && pastaBloqueada ? null : theme.color.primary}
                                    userSelect={"none"}
                                    onClick={() => handleClick(item)}
                                >
                                    {`${item}`}
                                </Span>
                            )
                        })
                    :
                        <Barra_Selecionados
                            comp={comp}
                        />
                }
            </Container>

            {false &&
                <Button
                    fSize={"1.2rem"}
                    color={theme.color.secondary}
                    bgColor={theme.color.primary}
                    border={`1px solid ${theme.color.primary}`}
                    padding={"14px 22px"}
                    margin={"0 0 0 11px"}
                    bRadius={borderRadius}
                    cursor={"pointer"}
                >
                    Filtrar
                </Button>
            }

            <Input
                type="file"
                display={"none"}
                ref={file_input_ref}
                multiple
                onClick={e => e.target.value = null}
                onChange={e => setFilesUpload([...e.target.files])}
            />
        </Container>
    )
}
