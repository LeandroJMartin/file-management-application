import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import useAuth from '../../hooks/useAuth';
import usePath from '../../hooks/usePath';
import { useNavigate } from 'react-router-dom';
import ReactLoading from "react-loading";
import {
    borderRadius,
    Container,
    theme,
 } from '../../theme';

import Modal from '../../../src/components/modal';
import Path_Map from '../../components/path_map';
import Navegacao_Scroll from '../../components/nav_bar_scroll_Painel';
import Card from '../../components/card';

import Comp_filho_modal from '../../components/modal/comp_filho_modal';

export default function Index() {
    const [showModal, setShowModal] = useState(false)
    const [modalChildren, setModalChildren] = useState(null)

    const { loading, revalidade_token } = useAuth()
    const { path, buscar, files, back_home } = usePath()
    const navigate = useNavigate()


    // ACIONA QUAL COMPONENTE VAI RENDERIZAR DENTRO DO MODAL
    const setarModalChildren = fromComp => {
        setModalChildren(<Comp_filho_modal setShowModal={state => setShowModal(state)} props={fromComp} />)
    }

    // CHECA E REVALIDA O TOKEN
    useEffect(() => {
        (async () => {
            const resultado = await revalidade_token()
            if (!resultado) navigate("/", { replace: true })
        })();
    }, [])
    
    // ACIONA O MODAL QUANDO UM FILHO DO MODAL É SETADO
    useEffect(() => {
        if (modalChildren) setShowModal(true)
    }, [modalChildren])


    // BACK TO HOME ON LOAD COMP
    useEffect(() => back_home(), [loading])


    // FAZ UM REQUEST NO BACKEND PARA PEGAR OS ITENS DENTRO DA PASTA
    useEffect(() => {
        (async () => {
            await buscar()
        })()
    }, [path])



    // RENDER COMPONENTE
    return (
        !loading
            ?
                <>
                    {showModal &&
                        <Modal
                            setShowModal={state => setShowModal(state)}
                        >
                            {modalChildren}
                        </Modal>
                    }

                    <Layout
                        setarModalChildren={obj => setarModalChildren(obj)}
                    >
                        <Path_Map />

                        <Container
                            display={"flex"}
                            direction={"row"}
                            width={"100%"}
                            height={"100%"}
                            padding={"6px 0 0 0"}
                        >   
                            <Container
                                display={"flex"}
                                direction={"row"}
                                minWidth={"258px"}
                                maxWidth={"258px"}
                                aContent={"center"}
                                height={"calc(100vh * .785)"}
                                border={`1px solid ${theme.color.primary}`}
                                bRadius={borderRadius}
                                >
                                <Navegacao_Scroll />
                            </Container>

                            <Container
                                display={"flex"}
                                direction={"column"}
                                height={"calc(100vh * .785)"}
                                padding={"4px"}
                                jContent={files.length === 0 ? "center" : "start"}
                                overflowY={"auto"}
                                overflowX={"hidden"}
                            >
                                <Card
                                    setarModalChildren={obj => setarModalChildren(obj)}
                                />
                            </Container>
                        </Container>
                    </Layout>
                </>
            :
                <Container
                    display={"flex"}
                    width={"100vw"}
                    height={"100vh"}
                    jContent={"center"}
                    aContent={"center"}
                >
                    <ReactLoading type={"spinningBubbles"} color={theme.color.primary} height={90} width={90}/>
                </Container>
    )
}
