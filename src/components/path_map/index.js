import React from 'react';
import usePath from '../../hooks/usePath';
import {
    Container,
    Span,
} from '../../theme';

export default function Path_Map() {
    const { path } = usePath()

    return (
        <Container
            display={"flex"}
            direction={"row"}
            aContent={"center"}
            width={"100%"}
            height={"fit-content"}
            margin={"4px 0 0 0"}
        >
            <Span>
                {`Você está em: ${String(path && path.atual ? String(path.pathCompleto).replace("_", " ") : "painel").replace(/\//gm, " > ")}`}
            </Span>
        </Container>
    )
}
