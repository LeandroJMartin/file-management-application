import React, { memo, useState } from 'react';
import usePath from '../../hooks/usePath';
import useAuth from '../../hooks/useAuth';
import ReactLoading from "react-loading";
import useArquivosSelecionados from '../../hooks/useArquivosSelecionados';
import {
    Container,
    Span,
    theme,
} from '../../theme';

import Barra_Selecionados from '../barra_selecionados';
import Card_item from './Card_item';

function Card({ setarModalChildren }) {
    const [selecionados, setSelecionados] = useState([])
    const { user } = useAuth()
    const { files, realizandoBusca } = usePath()
    const { totalSelecionados } = useArquivosSelecionados()


    return (
        realizandoBusca
            ?
                <Container
                    display={"grid"}
                    gridTemCol={"repeat(auto-fit, minmax(246px, 246px))"}
                    gGap={"20px"}
                    jContent={files?.length === 0 || files?.length > 5 ? "center" : "start"}
                    padding={files?.length > 0 && files?.length <= 5 ? "0 40px" : null}
                    width={"100%"}
                >
                    <ReactLoading type={"spinningBubbles"} color={theme.color.primary} height={90} width={90}/>
                </Container>
            :
                <>
                    {user && user.level === "admin" && totalSelecionados > 0 &&
                        <Barra_Selecionados
                            comp={"card"}
                        />
                    }

                    <Container
                        display={"grid"}
                        gridTemCol={"repeat(auto-fit, minmax(246px, 246px))"}
                        gGap={"20px"}
                        jContent={files?.length === 0 || files?.length > 5 ? "center" : "start"}
                        padding={files?.length > 0 && files?.length <= 5 ? "0 40px" : null}
                        width={"100%"}
                    >
                        {files?.map((item, index) => {
                            return (
                                    <Card_item
                                        key={`${index}${item.name}`}
                                        item={item}
                                        index={index}
                                        setarModalChildren={setarModalChildren}
                                        selecionados={selecionados}
                                        setSelecionados={setSelecionados}
                                    />
                                )
                            })
                        }

                        {!files || files.length === 0 &&
                            <Span
                                width={"max-content"}
                                fSize={"min(2rem, 3vw)"}
                            >
                                Nenhum arquivo a ser exibido.
                            </Span>
                        }
                    </Container>
                </>
    )
}

export default memo(Card)
