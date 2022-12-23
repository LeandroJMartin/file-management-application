import React, { useEffect, useState } from 'react';
import usePath from '../../hooks/usePath';
import {
    borderRadius,
    Button,
    Container,
    Input,
    inputsHeight,
    theme,
} from '../../theme';


import Close_Icon from '../svg/close_x_icon_svg';


export default function Index() {
    const [textoPesquisa, setTextoPesquisa] = useState('')
    const [restoreFiles, setRestoreFiles] = useState([])

    const { files, setFiles } = usePath()


    // CLICK BTN PESQUISAR
    const handleClickPesquisa = e => {
        if (e) e.preventDefault()

        if (textoPesquisa === '' || !textoPesquisa) return

        if (files) {
            setRestoreFiles(files)

            setFiles(files.filter((file, index) => {
                const lowerCase = String(file.fileInfo.filename).toLowerCase()

                return lowerCase.includes(textoPesquisa)
            }))
        }
    }

    // CLICK BTN CLEAR
    const handleClickClear = e => {
        e.preventDefault()

        if (textoPesquisa === '' || !textoPesquisa) return

        if (restoreFiles) setFiles(restoreFiles)
        setTextoPesquisa('')
        return
    }

    // RESETAR E VOLTAR OS ARQUIVOS
    useEffect(() => {
        if (textoPesquisa.length === 0 && restoreFiles) {
            setFiles(restoreFiles)
        }
    }, [textoPesquisa])

    return (
        <Container
            display={"flex"}
            direction={"row"}
            aContent={"center"}
            minWidth={"30%"}
            width={"70%"}
            height={"auto"}
            margin={"0 0 0 19px"}
        >
            <Input
                type="text"
                placeholder="Pesquise aqui"
                fWeight={"bold"}
                phColor={theme.color.ligth_green}
                padding={"0 0 0 6px"}
                width={"100%"}
                height={inputsHeight}
                border={`1px solid ${theme.color.primary}`}
                bRadius={borderRadius}
                value={textoPesquisa}
                onChange={e => setTextoPesquisa(e.target.value)}
                onKeyPress={e => {
                    if (e.key === "Enter" && textoPesquisa !== '') {
                        handleClickPesquisa()
                    }
                }}
            />

            <Container
                display={"flex"}
                position={"absolute"}
                width={"fit-content"}
                right={"120px"}
                padding={"4px"}
                cursor={"pointer"}
                onClick={handleClickClear}
            >
                <Close_Icon size={34} color={"#d5d5d5"} />
            </Container>
            
            <Button
                fSize={"1.2rem"}
                color={theme.color.secondary}
                bgColor={theme.color.primary}
                border={`1px solid ${theme.color.primary}`}
                padding={"14px 22px"}
                margin={"0 0 0 11px"}
                bRadius={borderRadius}
                cursor={"pointer"}
                onClick={handleClickPesquisa}
            >
                Buscar
            </Button>
        </Container>
    )
}
