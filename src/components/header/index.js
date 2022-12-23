import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useSpring } from 'react-spring';
import { useNavigate } from 'react-router';
import {
    borderRadius,
    Button,
    Container,
    Img,
    Span,
    theme,
} from '../../theme';

import logo from '../../assets/img/logo.svg';
import Dropdown from '../dropdown';
import BarraPesquisa from '../../components/barra_Pesquisa';
import UserCircle from '../svg/avatar_svg';
import MoreOption from '../svg/more_option_svg/index';
import Logout from '../svg/logout_svg';

export default function Index({ totalSelecionado, minContainerWidth, maxContainerWidth, setarModalChildren }) {
    const { user, logout } = useAuth()
    const [showDropdown, setShowDropdown] = useState(false)
    const navigate = useNavigate()

    const animatedValue = useSpring({
        to: {
            opacity: showDropdown ? 1 : 0,
        },
        config: {
            mass: 1,
            tension: 900,
            friction: 80,
        }
    })


    const handleClickShowDropdown = e => {
        e.preventDefault()

        setShowDropdown(prev => !prev)
    }

    const handleClickLogout = async () => {
        const resultado = logout()
        if (resultado) navigate("/", { replace: true })
    } 

    return (
        <Container
            display={"flex"}
            direction={"column"}
            position={"relative"}
            width={"100%"}
            height={"auto"}
            padding={"20px 0"}
            aContent={"center"}
        >

            <Container
                display={"flex"}
                direction={"row"}
                jContent={"space-between"}
                aContent={"center"}
                minWidth={minContainerWidth}
                width={"100%"}
                maxWidth={maxContainerWidth}
                height={"100%"}
                margin={"0 0 30px 0"}
            >
                <Img
                    src={logo}
                    width={"fit-content"}
                    height={"55px"}
                    margin={"0 110px 0 0"}
                />

                <Container
                    display={"flex"}
                    direction={"row"}
                    width={"fit-content"}
                    aContent={"center"}
                >
                    <Container
                        display={"flex"}
                        direction={"column"}
                        width={"fit-content"}
                        Content={"center"}
                    >
                        <Span>
                            Olá, {user?.name || null}
                        </Span>
                    </Container>

                    <UserCircle
                        size={"50px"}
                        color={theme.color.secondary}
                    />

                    <Container
                        width={"18px"}
                        cursor={"pointer"}
                        onClick={handleClickShowDropdown}
                    >
                        <MoreOption size={30} color={"gray"} />

                        <Container
                            display={"flex"}
                            direction={"row"}
                            position={"absolute"}
                            width={"fit-content"}
                            height={"fit-content"}
                            top={"5px"}
                            right={"16px"}
                            jContent={"center"}
                            aContent={"center"}
                            padding={"12px"}
                            bgColor={"white"}
                            bRadius={borderRadius}
                            bShadow={"2px 4px 4px 0 rgba(0, 0, 0, .2)"}
                            zIndex={"99"}
                            style={animatedValue}
                            onMouseLeave={e => setShowDropdown(false)}
                        >
                            <Button
                                display={"flex"}
                                fWeight={"bold"}
                                jContent={"center"}
                                aContent={"center"}
                                padding={"4px"}
                                bgColor={"white"}
                                cursor={"pointer"}
                                onClick={handleClickLogout}
                            >
                                SAIR <Logout size={26} />
                            </Button>
                        </Container>
                    </Container>
                </Container>
            </Container>

            <Container
                display={"flex"}
                direction={"row"}
                aContent={"center"}
                minWidth={minContainerWidth}
                width={"100%"}
                maxWidth={maxContainerWidth}
                height={"100%"}
            >
                <Container
                    display={"flex"}
                    direction={"row"}
                    width={"100%"}
                >
                    <Dropdown
                        comp={"header"}
                        setarModalChildren={setarModalChildren}
                    />

                    <BarraPesquisa />
                </Container>
            </Container>

            {/* RISK */}
            <Container
                position={"absolute"}
                width={"4000px"}
                bottom={"0"}
                bBottom={`1px solid ${theme.color.primary}`}
            />

        </Container>
    )
}
