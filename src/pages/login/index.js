import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import FetchActions from '../../fetch_backend_actions/fetch';
import {
    theme,
    Container,
    Img,
    Input,
    Span,
    Button,
    borderRadius,
  } from '../../theme';

import banner from '../../../src/assets/img/banner.jpg';
import logo from '../../../src/assets/img/logo.svg';

export default function Index() {
    const [email, setEmail] = useState('')
    const [emailRecover, setEmailRecover] = useState('')
    const [senha, setSenha] = useState('')
    const [showRecoverPass, setShowRecoverPass] = useState(false)
    const [erro, setErro] = useState('')

    const { token, setToken } = useAuth()
    const { fetchData, loadingFetch } = useFetch()
    const navigate = useNavigate()


    // REDIRECT ON TOKEN SUCCESS
    useEffect(() => {
        if (token) {
            navigate("/painel", { replace: true })
        }
    }, [token])

    // REDIRECT TO PAINEL IF HAS TOKEN
    useEffect(() => {
        setTimeout(() => {
            if (sessionStorage.getItem('acess_token')) navigate("/painel", { replace: true })
        }, 350)
    }, [])


    // FUNCOES DA PAGINA
    const handleClickShowRecoverPass = () => {
        setEmailRecover('')
        setShowRecoverPass(prev => !prev)
    }

    const handleClickRecover = () => {
        setErro('')
        
        if (emailRecover === '') return setErro('Preencher o campo')

        if (loadingFetch) return
    }

    const handleClickLogin = async (e) => {
        if (e) e.preventDefault()

        setErro('')

        if (email === '' || senha === '') return setErro('Preencher os campos')

        if (loadingFetch) return

        const request_options = FetchActions.login(email, senha)

        const resultado = await fetchData(request_options)
        if (resultado && resultado.result === 'erro') {
            setErro(resultado.erro)
            return
        } else {
            sessionStorage.setItem("acess_token", resultado)
            setToken(resultado)
            return
        }
    }




    // RENDER DO COMPONENTE
    return (
        <Container
            display={"flex"}
            height={"auto"}
        >

            <Container
                display={"flex"}
                flex={1}
                width={"50vw"}
                height={"100vh"}
            >
                <Img
                src={banner}
                objFit={"Cover"}
                />
            </Container>

            <Container
                display={"flex"}
                flex={1}
                direction={"column"}
                bgColor={"white"}
                jContent={"center"}
                aContent={"center"}
            >
                <Container
                    direction={"column"}
                    width={"560px"}
                    aContent={"flex-start !important"}
                    padding={"0 16px"}
                >
                    <Img
                        src={logo}
                        width={"fit-content"}
                        height={"90px"}
                        margin={"0 0 67px 0"}
                    />

                    {erro &&
                        <Span
                            fSize={"1.2rem"}
                            fWeight={"bold"}
                            color={"red"}
                        >
                            {erro}
                        </Span>
                    }
                    
                    {!showRecoverPass
                        ?
                            <>
                                <Input
                                    type={"text"}
                                    placeholder="Email"
                                    phColor={theme.color.ligth_green}
                                    fWeight={"bold"}
                                    width={"100%"}
                                    border={`1px solid ${theme.color.primary}`}
                                    bRadius={borderRadius}
                                    margin={"6px 0"}
                                    padding={"0 0 0 8px"}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />

                                <Input
                                    placeholder="Senha"
                                    phColor={theme.color.ligth_green}
                                    fWeight={"bold"}
                                    width={"100%"}
                                    border={`1px solid ${theme.color.primary}`}
                                    bRadius={borderRadius}
                                    margin={"6px 0"}
                                    padding={"0 0 0 8px"}
                                    type={"password"}
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                    onKeyPress={e => {
                                        if (email !== '' && senha !== '' && e.key === "Enter") {
                                            handleClickLogin()
                                        }
                                    }}
                                />

                                <Span
                                    color={theme.color.primary}
                                    fSize={"1rem"}
                                    fWeight={"bold"}
                                    cursor={"pointer"}
                                    onClick={handleClickShowRecoverPass}
                                >
                                    Esqueci minha senha
                                </Span>
                            </>
                        :
                            <Input
                                type={"text"}
                                placeholder="E-mail"
                                phColor={theme.color.ligth_green}
                                fWeight={"bold"}
                                width={"100%"}
                                border={`1px solid ${theme.color.primary}`}
                                bRadius={borderRadius}
                                margin={"6px 0"}
                                padding={"0 0 0 8px"}
                                value={emailRecover}
                                onChange={e => setEmailRecover(e.target.value)}
                            />
                    }

                    {!showRecoverPass
                        ?
                            <Button
                                fSize={"1.2rem"}
                                color={theme.color.secondary}
                                bgColor={loadingFetch ? "transparent" : theme.color.primary}
                                border={loadingFetch ? `1px solid ${theme.color.primary}` : null}
                                padding={"16px 22px"}
                                margin={"18px 0"}
                                bRadius={borderRadius}
                                cursor={"pointer"}
                                onClick={handleClickLogin}
                                disabled={loadingFetch}
                            >
                                {loadingFetch ? "Aguarde..." : "Entrar"}
                            </Button>
                        :
                            <Container
                                display={"flex"}
                                direction={"row"}
                                width={"100%"}
                            >
                                <Button
                                    fSize={"1.2rem"}
                                    color={theme.color.secondary}
                                    bgColor={loadingFetch ? "transparent" : theme.color.primary}
                                    border={loadingFetch ? `1px solid ${theme.color.primary}` : null}
                                    padding={"16px 22px"}
                                    margin={"18px 0"}
                                    bRadius={borderRadius}
                                    cursor={"pointer"}
                                    onClick={handleClickRecover}
                                    disabled={loadingFetch}
                                >
                                    {loadingFetch ? "Enviando..." : "Enviar Email"}
                                </Button>

                                <Button
                                    fSize={"1.2rem"}
                                    color={theme.color.secondary}
                                    bgColor={"transparent"}
                                    border={`1px solid ${theme.color.ligth_green}`}
                                    padding={"16px 22px"}
                                    margin={"18px 0 0 16px"}
                                    bRadius={borderRadius}
                                    cursor={"pointer"}
                                    onClick={handleClickShowRecoverPass}
                                    disabled={loadingFetch}
                                >
                                    Cancelar
                                </Button>
                            </Container>
                    }
                </Container>
            </Container>
        </Container>
    )
}