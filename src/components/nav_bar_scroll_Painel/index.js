import React, { useEffect, useState } from 'react';
import { borderRadius, Container, Span, theme } from '../../theme';
import { useTransition } from 'react-spring';
import usePath from '../../hooks/usePath';
import useFetch from '../../hooks/useFetch';

import HomeIcon from '../svg/home_icon_svg';
import BackIcon from '../svg/arrow_up_back_svg';
import ReloadIcon from '../svg/reload_icon_svg';
import FolderIcon from '../svg/folder_svg';

export default function Index() {
    const { path, setPath, diretorios, buscar, back_home, voltar_pasta } = usePath()
    const [buttonsDisabled, setButtonsDisabled] = useState(false)

    const { loadingFetch } = useFetch()

    const transitions = useTransition(path, {
        from: { opacity: 0, transform: `translate3d(${path.ultimaAcao === "enter" ? '100%' : '-50%'},0,0)` },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: `translate3d(${path.ultimaAcao === "enter" ? '-50%' : '100%'},0,0)` },
        config: { mass: 1, tension: 350, friction: 30 },
    })

    const icon_settings = {
        size: 28,
        color: theme.color.secondary,
    }

    const icons = [
        {
            acao: "home",
            icon: <HomeIcon size={icon_settings.size} color={icon_settings.color} />,
        },
        {
            acao: "backFolder",
            icon: <BackIcon size={icon_settings.size} color={icon_settings.color} />,
        },
        {
            acao: "reload",
            icon: <ReloadIcon size={icon_settings.size} color={icon_settings.color} />,
        },
    ]


    // ATIVA O CLICK DOS BOTOES NOVAMENTE DEPOIS DE 70MS
    useEffect(() => {
        if (buttonsDisabled) {
            setTimeout(() => setButtonsDisabled(false), 70)
        }
    }, [buttonsDisabled])


    // FUNCAO QUE EXECUTA QUANDO CLICA EM UMA 'PASTA'
    const handleClickNavigation = async (e, dir) => {
        e.preventDefault()

        const dir_atual = (String(dir))
        
        if (dir_atual === path.atual || buttonsDisabled) return

        setButtonsDisabled(true)

        setPath(prev => {
            if (prev.atual) {
                return (
                    {
                        pathCompleto: `${[prev.pathCompleto]}/${dir_atual}`,
                        atual: dir_atual,
                        ultimaAcao: "enter",
                    }
                    )
                } else {
                    return (
                        {
                            pathCompleto: `painel/${dir_atual}`,
                            atual: dir_atual,
                            ultimaAcao: "enter",
                        }
                    )
                }
        })
    }


    // MENU DE HOME, VOLTAR E RELOAD
    const Opcoes_superior = () => {
        // FUNCAO DE EXECUTAR AS ACOES
        const handleClickIconsSuperiores = async (e, acao) => {
            e.preventDefault()
            
            if (buttonsDisabled) return
            setButtonsDisabled(true)

            // CLICK NO BTN HOME
            if (acao === "home") {
                if (!path.atual) return

                back_home()
            }

            // CLICK NO BTN VOLTAR PASTA
            if (acao === "backFolder") {
                voltar_pasta()
            }

            //CLICK NO BTN DE RELOAD
            if (acao === "reload") {
                await buscar()
            }
        }

        // RENDERIZA OS BOTOES EM TELA
        return (
            <Container
                display={"flex"}
                direction={"row"}
                position={"absolute"}
                top={"0"}
                left={"0"}
                width={"100%"}
                height={"fit-content"}
                zIndex={"10"}
                bRadiusTopLeft={`${borderRadius} !important`}
                bRadiusTopRight={`${borderRadius} !important`}
                bgColor={"white"}
                bBottom={`1px solid ${theme.color.primary}`}
            >
                {icons?.map((icon, index) => {
                    return (
                        <Container
                            key={`${index}`}
                            display={"flex"}
                            flex={"1"}
                            jContent={"center"}
                            aContent={"center"}
                            minHeight={"40px"}
                            bRight={index !== icons.length - 1 ? `1px solid ${theme.color.primary}` : null}
                            cursor={"pointer"}
                            transition={"all .1s"}
                            bgColorHover={theme.color.primary}
                            onClick={e => handleClickIconsSuperiores(e, icon.acao)}
                        >
                            {icon.icon}
                        </Container>
                    )
                })}
            </Container>
        )
    }


    return (
        <Container
            display={"flex"}
            direction={"column"}
            width={"100%"}
            height={"100%"}
            overflow={"hidden"}
        >
            <Opcoes_superior />

            {transitions((props, item) => (
                <Container
                    display={"flex"}
                    position={"absolute"}
                    direction={"column"}
                    width={"100%"}
                    height={"100%"}
                    margin={"48px 0 0 0"}
                    padding={"12px 0 12x 0"}
                    overflowY={"auto"}
                    overflowX={"hidden"}
                    style={{...props}}
                    key={`${item}`}
                >
                    {diretorios?.map((pasta, index) => {
                        return (
                            <Container
                                key={`${index}${pasta}`}
                                display={"flex"}
                                direction={"row"}
                                width={"100%"}
                                height={"fit-content"}
                                aContent={"center"}
                                padding={"4px"}
                                cursor={"pointer"}
                                onClick={e => handleClickNavigation(e, pasta.name)}
                            >
                                <FolderIcon
                                    size={icon_settings.size}
                                    color={theme.color.primary}
                                    pathFill={theme.color.primary}
                                />

                                <Span
                                    margin={"0 0 0 4px"}
                                    cursor={"pointer"}
                                    userSelect={"none"}
                                >
                                    {pasta.name}
                                </Span>
                            </Container>
                        )
                    })}

                    {diretorios && diretorios?.length === 0 && !loadingFetch &&
                        <Container
                            display={"flex"}
                            direction={"row"}
                            width={"100%"}
                            height={"fit-content"}
                            aContent={"center"}
                            padding={"4px"}
                            cursor={"default"}
                        >
                        <FolderIcon
                            size={icon_settings.size}
                            color={theme.color.primary}
                            pathFill={null}
                        />

                        <Span
                            margin={"0 0 0 4px"}
                            cursor={"default"}
                            userSelect={"none"}
                        >
                            {path?.atual}
                        </Span>
                    </Container>
                    }
                </Container>
            ))}
        </Container>
    )
}
