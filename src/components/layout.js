import React, { useEffect, useState } from 'react';
import { Container } from '../theme';

import Header from '../../src/components/header';

export default function Layout({ setarModalChildren, children }) {
    const minContainerWidth = "768px"
    const maxContainerWidth = "1657px"

    const [addPadding, setAddPadding] = useState(false)

    const handleWindowWidth = () => {
        if (window.innerWidth <= 1672) {
            setAddPadding(true)
        } else {
            setAddPadding(false)
        }
    }

    useEffect(() => {
        handleWindowWidth()

        window.addEventListener('resize', handleWindowWidth)

        return () => {
            window.removeEventListener('resize', handleWindowWidth)
        }
    }, [window])

    return (
        <Container
            display={"flex"}
            direction={"column"}
            jContent={"center"}
            aContent={"center"}
            width={"100vw"}
            height={"100%"}
            jContent={"center"}
            padding={addPadding ? "0 60px" : null}
        >
            <Header
                minContainerWidth={minContainerWidth}
                maxContainerWidth={maxContainerWidth}
                setarModalChildren={setarModalChildren}
            />

            <Container
                display={"flex"}
                direction={"column"}
                minWidth={minContainerWidth}
                width={"100%"}
                maxWidth={maxContainerWidth}
                height={"100%"}
                jContent={"center"}
            >
                {children}
            </Container>
        </Container>
    )
}
