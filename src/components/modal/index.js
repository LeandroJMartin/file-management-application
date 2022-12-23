import React from 'react';
import { useSpring } from 'react-spring';
import { borderRadius, Container, theme } from '../../theme';

import Close_Icon from '../../components/svg/close_icon_svg';

export default function Index({ setShowModal, children }) {

    const animatedValues = useSpring({
        from: {
            transform: "translateY(-15%)",
            opacity: 0,
        },
        to: {
            transform: "translateY(0)",
            opacity: 1,
        },
        config: {
            mass: 1,
            tension: 900,
            friction: 100,
        },
    })

    return (
        <Container
            display={"flex"}
            position={"absolute"}
            top={"0"}
            left={"0"}
            width={"100vw"}
            height={"100vh"}
            bgColor={"rgba(0, 0, 0, .8)"}
            zIndex={"100"}
            jContent={"center"}
            aContent={"center"}
        >
            <Container
                display={"flex"}
                direction={"column"}
                aContent={"center"}
                width={"90%"}
                maxWidth={"678px"}
                height={"auto"}
                padding={"28px 0"}
                bgColor={"white"}
                bRadius={borderRadius}
                style={animatedValues}
            >
                <Container
                    display={"flex"}
                    position={"absolute"}
                    width={"fit-content"}
                    height={"fit-content"}
                    top={"0"}
                    right={"0"}
                    bRadius={"50%"}
                    transition={"all .2s"}
                    cursor={"pointer"}
                    bgColorHover={theme.color.primary}
                    onClick={e => {
                        e.preventDefault()

                        setShowModal(false)
                    }}
                >
                    <Close_Icon size={32} color={theme.color.secondary} />
                </Container>

                {children}
            </Container>
        </Container>
    )
}
