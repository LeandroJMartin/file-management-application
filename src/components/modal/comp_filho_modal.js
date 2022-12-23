import React, { useState } from 'react';
import usePath from '../../hooks/usePath';
import {
    borderRadius,
    Button,
    Container,
    Input,
    Span,
    theme,
} from '../../theme';

export default function Comp_filhos_modal({ setShowModal, props }) {
    const { path, deletar_arquivo, buscar, voltar_pasta, criar_pasta, renomear_pasta, deletar_pasta, renomear_arquivo } = usePath()
    const { name, acao, fileID = null } = props

    const [newNameArquivo, setNewNameArquivo] = useState('')
    const [nameNewPaste, setNewNamePaste] = useState('')
    const [novoNomePasta, setNovoNomePasta] = useState('')


    // FUNCAO FECHAR O MODAL
    const handleCloseModal = e => {
        if (e) e.preventDefault()

        setShowModal(false)
    }




    // FUNCAO CONFIMAÇÂO CRIAR PASTA
    const handleClickCreatePaste = async e => {
        e.preventDefault()

        if (!path || nameNewPaste === '' || !nameNewPaste) return

        const resultado = await criar_pasta(nameNewPaste)
        if (resultado) {
            await buscar()
            handleCloseModal()
        } else {
            alert("Occoreu um erro.")
        }
    }

    // FUNCAO CONFIMAÇÂO RENAME PASTA
    const handleClickRenamePasta = async e => {
        e.preventDefault()

        if (!path || novoNomePasta === '' || !novoNomePasta) return

        const resultado = await renomear_pasta(novoNomePasta)
        if (resultado) {
            handleCloseModal()
            return voltar_pasta()
        } else {
            alert("Occoreu um erro.")
        }
    }




    // FUNCAO CONFIMAÇÂO DO RENAME
    const handleClickRename = async e => {
        e.preventDefault()

        if (!fileID || newNameArquivo === '' || !newNameArquivo) return

        const resultado = await renomear_arquivo(fileID, newNameArquivo)
        if (resultado) {
            await buscar()
            handleCloseModal()
        } else {
            alert("Occoreu um erro.")
        }
    }

    // FUNCAO CONFIMAÇÂO DO DELETE ARQUIVO
    const handleClickDeleteArquivo = async e => {
        e.preventDefault()

        if (!fileID) return

        const resultado = await deletar_arquivo(fileID)
        if (resultado) {
            handleCloseModal()
        } else {
            alert("Occoreu um erro.")
        }
    }
    
    // FUNCAO CONFIMAÇÂO DO DELETE ARQUIVO
    const handleClickDeletePasta = async e => {
        e.preventDefault()
        
        const resultado = await deletar_pasta()
        if (resultado) {
            handleCloseModal()
            return voltar_pasta()
        } else {
            alert("Occoreu um erro.")
        }
    }


    // ALTERAR NOME DO ARQUIVO
    if (acao === "editar") {
        return (
            <>
            <Span>
                {`Você está alterando o nome do arquivo: ${name}`}
            </Span>
    
            <Input
                type="text"
                placeholder="digite o novo nome do arquivo..."
                width={"95%"}
                padding={"0 0 0 4px"}
                margin={"8px 0"}
                border={`1px solid ${theme.color.primary}`}
                bRadius={borderRadius}
                value={newNameArquivo}
                onChange={e => {
                    e.preventDefault()
    
                    setNewNameArquivo(e.target.value)
                }}
            />

            <Container
                display={"flex"}
                direction={"row"}
                jContent={"end"}
                width={"95%"}
                height={"auto"}
            >
                <Button
                    fSize={"1.2rem"}
                    color={theme.color.secondary}
                    bgColor={"transparent"}
                    border={`1px solid ${theme.color.secondary}`}
                    bRadius={borderRadius}
                    padding={"14px"}
                    margin={"0 8px 0 0"}
                    cursor={"pointer"}
                    onClick={handleCloseModal}
                >
                    Cancelar
                </Button>

                <Button
                    fSize={"1.2rem"}
                    color={theme.color.secondary}
                    bgColor={theme.color.primary}
                    border={`1px solid ${theme.color.primary}`}
                    bRadius={borderRadius}
                    padding={"14px"}
                    margin={"0 8px 0 0"}
                    cursor={"pointer"}
                    onClick={handleClickRename}
                >
                    Alterar
                </Button>
            </Container>
            </>
        )
    }

    // DELETAR UM ARQUIVO ESPECIFICO
    if (acao === "deletar") {
        return (
            <>
                <Span>
                    {`Você tem certeza que deseja excluir: ${name}`}
                </Span>

                <Container
                    display={"flex"}
                    direction={"row"}
                    jContent={"center"}
                    width={"95%"}
                    height={"auto"}
                    margin={"14px 0 0 0"}
                >
                    <Button
                        fSize={"1.2rem"}
                        color={theme.color.secondary}
                        bgColor={"transparent"}
                        border={`1px solid ${theme.color.secondary}`}
                        bRadius={borderRadius}
                        padding={"14px"}
                        margin={"0 8px 0 0"}
                        cursor={"pointer"}
                        onClick={handleCloseModal}
                    >
                        Cancelar
                    </Button>

                    <Button
                        fSize={"1.2rem"}
                        color={theme.color.secondary}
                        bgColor={theme.color.primary}
                        border={`1px solid ${theme.color.primary}`}
                        bRadius={borderRadius}
                        padding={"14px"}
                        margin={"0 8px 0 0"}
                        cursor={"pointer"}
                        onClick={handleClickDeleteArquivo}
                    >
                        DELETAR
                    </Button>
                </Container>
            </>
        )
    }



    // NOVA PASTA
    if (acao === "Nova pasta") {
        return (
            <>
            <Span>
                {`Criar uma nova pasta em: ${String(path.pathCompleto).substring(path.pathCompleto.indexOf("/") + 1).replace(/\_/gm, " ")}`}
            </Span>
    
            <Input
                type="text"
                placeholder="digite o nome da nova pasta..."
                width={"95%"}
                padding={"0 0 0 4px"}
                margin={"8px 0"}
                border={`1px solid ${theme.color.primary}`}
                bRadius={borderRadius}
                value={nameNewPaste}
                onChange={e => {
                    e.preventDefault()
    
                    setNewNamePaste(e.target.value)
                }}
            />

            <Container
                display={"flex"}
                direction={"row"}
                jContent={"end"}
                width={"95%"}
                height={"auto"}
            >
                <Button
                    fSize={"1.2rem"}
                    color={theme.color.secondary}
                    bgColor={"transparent"}
                    border={`1px solid ${theme.color.secondary}`}
                    bRadius={borderRadius}
                    padding={"14px"}
                    margin={"0 8px 0 0"}
                    cursor={"pointer"}
                    onClick={handleCloseModal}
                >
                    Cancelar
                </Button>

                <Button
                    fSize={"1.2rem"}
                    color={theme.color.secondary}
                    bgColor={theme.color.primary}
                    border={`1px solid ${theme.color.primary}`}
                    bRadius={borderRadius}
                    padding={"14px"}
                    margin={"0 8px 0 0"}
                    cursor={"pointer"}
                    onClick={handleClickCreatePaste}
                >
                    Criar
                </Button>
            </Container>
            </>
        )
    }

    // RENOMEAR PASTA
    if (acao === "Renomear pasta") {
        return (
            <>
            <Span>
                {`Você está renomeado a pasta ${path.atual} em ${String(path.pathCompleto).substring(path.pathCompleto.indexOf("/") + 1, path.pathCompleto.lastIndexOf("/")).replace(/\_/gm, " ")}`}
            </Span>
    
            <Input
                type="text"
                placeholder="digite o novo nome da pasta..."
                width={"95%"}
                padding={"0 0 0 4px"}
                margin={"8px 0"}
                border={`1px solid ${theme.color.primary}`}
                bRadius={borderRadius}
                value={novoNomePasta}
                onChange={e => {
                    e.preventDefault()
    
                    setNovoNomePasta(e.target.value)
                }}
            />

            <Container
                display={"flex"}
                direction={"row"}
                jContent={"end"}
                width={"95%"}
                height={"auto"}
            >
                <Button
                    fSize={"1.2rem"}
                    color={theme.color.secondary}
                    bgColor={"transparent"}
                    border={`1px solid ${theme.color.secondary}`}
                    bRadius={borderRadius}
                    padding={"14px"}
                    margin={"0 8px 0 0"}
                    cursor={"pointer"}
                    onClick={handleCloseModal}
                >
                    Cancelar
                </Button>

                <Button
                    fSize={"1.2rem"}
                    color={theme.color.secondary}
                    bgColor={theme.color.primary}
                    border={`1px solid ${theme.color.primary}`}
                    bRadius={borderRadius}
                    padding={"14px"}
                    margin={"0 8px 0 0"}
                    cursor={"pointer"}
                    onClick={handleClickRenamePasta}
                >
                    Renomear
                </Button>
            </Container>
            </>
        )
    }

    // DELETAR PASTA ATUAL
    if (acao === "Excluir pasta atual") {
        return (
            <>
            <Span>
                {`Você tem certeza que deseja excluir a pasta: ${path.atual} em ${String(path.pathCompleto).substring(path.pathCompleto.indexOf("/") + 1, path.pathCompleto.lastIndexOf("/")).replace(/\_/gm, " ")}`}
            </Span>

            <Container
                display={"flex"}
                direction={"row"}
                jContent={"center"}
                width={"95%"}
                height={"auto"}
                margin={"14px 0 0 0"}
            >
                <Button
                    fSize={"1.2rem"}
                    color={theme.color.secondary}
                    bgColor={"transparent"}
                    border={`1px solid ${theme.color.secondary}`}
                    bRadius={borderRadius}
                    padding={"14px"}
                    margin={"0 8px 0 0"}
                    cursor={"pointer"}
                    onClick={handleCloseModal}
                >
                    Cancelar
                </Button>

                <Button
                    fSize={"1.2rem"}
                    color={theme.color.secondary}
                    bgColor={theme.color.primary}
                    border={`1px solid ${theme.color.primary}`}
                    bRadius={borderRadius}
                    padding={"14px"}
                    margin={"0 8px 0 0"}
                    cursor={"pointer"}
                    onClick={handleClickDeletePasta}
                >
                    DELETAR
                </Button>
            </Container>
            </>
        )
    }
}
