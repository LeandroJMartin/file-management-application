import React, { memo } from 'react';
import useAuth from '../../hooks/useAuth';
import useArquivosSelecionados from '../../hooks/useArquivosSelecionados';
import { borderRadius, Button, Container, Img, Span, theme } from '../../theme';

import Edit_Icon from '../svg/edit_icon_svg';
import Delete_Icon from '../svg/delete_icon_svg';
import Download_Icon from '../svg/download_icon_svg';
import Check_select_Icon from '../svg/check_select_icon_svg';
import File_Icon from '../svg/file_icon_svg';

function Card_item({ item, index, setarModalChildren }) {
    const { user } = useAuth()
    const { selecionados, setarSelecionados } = useArquivosSelecionados()

    const images_types = ["jpg", "jpeg", "jfif", "pjpeg", "pjp", "png", "gif", "webp", "gif"]

    const edit_icons_size = 24

    const Edit_item_icons = [
        {
            acao: "editar",
            icon_comp: <Edit_Icon size={edit_icons_size} color={theme.color.secondary} />,
        },
        {
            acao: "deletar",
            icon_comp: <Delete_Icon size={edit_icons_size} color={"red"} />,
        },
        {
            acao: "download",
            icon_comp: <Download_Icon size={edit_icons_size} color={theme.color.secondary} />,
        },
    ]


    // FUNCOES DE CLICK DOS BOTOES DE EDITAR, DELETAR e BAIXAR DO CARD
    const handleClickAlterar = async (e, acao, item) => {
        e.preventDefault()

        // ACIONA A FUNCAO DE DOWNLOAD SE CLICAKDO NO BOTÂO DE DOWNLOAD
        if (acao === "download") {
            handleClickDownload(`http://localhost:8888/app_vazoli${String(item.fileInfo.dirname).replace("..", "")}/${item.fileInfo.basename}`)
            return
        }

        // ATIVA O COMP FILHO DO MODAL E O MODAL DE CONFIRMAÇÂO
        setarModalChildren({...item, acao})
    }


    // FUNCAO DE DOWNLOAD
    const handleClickDownload = url => {
        window.open(url, '_self')
    }


    // COMPONENTE DE CIRCULO TIPO 'CHECKBOX' PARA SELECIONAR
    const Marker_select = ({ fileID }) => {
        return(
            !selecionados.includes(fileID)
                ?
                    <Container
                        display={"flex"}
                        position={"absolute"}
                        top={"6px"}
                        left={"6px"}
                        width={"20px"}
                        height={"20px"}
                        border={`1px solid ${theme.color.ligth_green}`}
                        bgColor={"transparent"}
                        bRadius={"50%"}
                        cursor={"pointer"}
                        onClick={e => {
                            e.preventDefault()

                            setarSelecionados(fileID)
                        }}
                    />
                :
                    <Container
                        display={"flex"}
                        position={"absolute"}
                        top={"5px"}
                        left={"5px"}
                        width={"fit-content"}
                        height={"fit-content"}
                        bgColor={theme.color.primary}
                        bRadius={"50%"}
                        cursor={"pointer"}
                        onClick={e => {
                            e.preventDefault()

                            setarSelecionados(fileID)
                        }}
                    >
                        <Check_select_Icon size={"22px"} color={"white"} />
                    </Container>
        )
    }



    return (
        <Container
            key={`${index}${item.name}`}
            display={"flex"}
            direction={"column"}
            width={"246px"}
            height={"auto"}
        >
            <Container
                display={"flex"}
                direction={"column"}
                width={"100%"}
                minHeight={"198px"}
                height={"198px"}
                aContent={"center"}
                jContent={"center"}
                border={selecionados.includes(item.fileID.id) ? `1px solid ${theme.color.primary}` : `1px solid ${theme.color.ligth_green}`}
                bRadius={borderRadius}
                bColor={theme.color.primary}
                overflow={"hidden"}
            >
                <Marker_select fileID={item.fileID.id} />

                {images_types.includes(item.fileInfo.extension)
                    ?
                        <Img
                            src={`http://localhost:8888/app_vazoli${String(item.fileInfo.dirname).replace("..", "")}/${item.fileInfo.basename}`}
                            width={"70%"}
                            height={"70%"}
                            objFit={"cover"}
                            bRadius={borderRadius}
                            loading="lazy"
                        />
                    :   
                        <>
                            <File_Icon size={90} color={theme.color.secondary} />
                            <Span>
                                {`.${item?.fileInfo?.extension}`}
                            </Span>
                        </>
                }
            </Container>


            <Container
                margin={"6px 0"}
            >
                <Span
                    fSize={"1rem"}
                    fWeigth={"bold"}
                    color={theme.color.secondary}
                    title={`${item.fileInfo.filename}`}
                    padding={"0 0 4px 4px"}
                >
                    {`${String(item.fileInfo.filename).substring(0, 24)}${item.fileInfo.filename.length > 24 ? '...' : '' }`}
                </Span>

                <Span
                    fSize={"1rem"}
                    color={theme.color.ligth_green}
                    padding={"0 0 0 4px"}
                >
                    {`Tamanho: ${item.fileSize}`}
                </Span>

                <Span
                    fSize={"1rem"}
                    color={theme.color.ligth_green}
                    padding={"0 0 0 4px"}
                >
                    {`Extensão: .${item.fileInfo.extension}`}
                </Span>
            </Container>



            {/* BOTOES DE EDITAR EXCLUIR E BAIXAR DO ADMIN */}
            {user && user.level === "admin" &&
                <Container
                    display={"flex"}
                    direction={"row"}
                    width={"100%"}
                    jContent={"center"}
                    margin={"4px 0 0 0"}
                    border={`1px solid ${theme.color.ligth_green}`}
                    bRadius={borderRadius}
                >
                    {Edit_item_icons?.map((icon, index) => {
                        return (
                            <Container
                                key={`${index}`}
                                display={"flex"}
                                flex={"1"}
                                width={"fit-content"}
                                padding={"6px 0"}
                                jContent={"center"}
                                bRight={index !== Edit_item_icons.length - 1 ? `1px solid ${theme.color.ligth_green}` : null}
                                transition={"all .1s"}
                                bgColorHover={theme.color.primary}
                                cursor={"pointer"}
                                onClick={e => handleClickAlterar(e, icon.acao, item)}
                            >
                                {icon.icon_comp}
                            </Container>
                        )
                    })}
                </Container>
            }

            {!user || user && user.level === "cliente" &&
                <Button
                    fSize={"1rem"}
                    width={"100%"}
                    jContent={"center"}
                    color={theme.color.secondary}
                    bgColor={theme.color.primary}
                    border={theme.color.primary}
                    padding={"16px 22px"}
                    margin={"14px 0"}
                    bRadius={borderRadius}
                    cursor={"pointer"}
                    onClick={e => {
                        e.preventDefault()

                        handleClickDownload(`http://localhost:8888/app_vazoli${String(item.fileInfo.dirname).replace("..", "")}/${item.fileInfo.basename}`)
                    }}
                >
                    Fazer download
                </Button>
            }
        </Container>
    )
}

export default memo(Card_item)
