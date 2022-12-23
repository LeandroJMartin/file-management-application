import React from 'react';
import FetchActions from '../../fetch_backend_actions/fetch';
import useArquivosSelecionados from '../../hooks/useArquivosSelecionados';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import usePath from '../../hooks/usePath';
import {
    borderRadius,
    Button,
    Container,
    Span,
    theme,
} from '../../theme';

export default function Index({ comp }) {
    const { user, loading } = useAuth()
    const { files, retornar_caminho_completo_for_request, buscar } = usePath()
    const { selecionados, totalSelecionados } = useArquivosSelecionados()
    const { fetchData } = useFetch()

    // CLICK BTN BAIXAR TODOS
    const handleClickBaixarTodos = async e => {
        e.preventDefault()

        if (!selecionados || selecionados.length === 0) return

        await fetch("https://www.vazoli.com.br/marketing/services/files.php", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({
                acao: "multipleDownload",
                arrayID: selecionados,
            })
        })
        .then(data => data.blob())
        .then(response => {
                // console.log(response.type);
                const dataType = response.type;
                const binaryData = [];
                binaryData.push(response);
                const downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
                downloadLink.setAttribute('download', 'arquivos');
                document.body.appendChild(downloadLink);
                downloadLink.click();
                downloadLink.remove();
            }
        )
    }


    // CLICK EXCLUIR SELECIONADOS
    const handleClickSelecionados = async (e) => {
        e.preventDefault()

        if (!selecionados || selecionados.length === 0) return
        if (!files || !files.length === 0) return

        const confirm = window.confirm("Realmente deseja excluir ?")

        if (!confirm) return

        const request_options = FetchActions.fetch_multiple_delete(retornar_caminho_completo_for_request(), selecionados)
        const resultado = await fetchData(request_options)
        if (resultado && !resultado?.erro) {
            return buscar()
        }
    }



    return (
        <Container
            display={"flex"}
            width={"100%"}
            direction={"row"}
            jContent={"space-between"}
            aContent={"center"}
            padding={comp === "header" ? "0 0 0 4px" : "0 42px"}
        >
            {totalSelecionados !== 0 &&
                <Span
                    fSize={"1.4rem"}
                    fWeight={"bold"}
                    color={theme.color.secondary}
                    margin={"0 12px 0 0"}
                >
                    {totalSelecionados === 1 ? `${totalSelecionados} Arquivo Selecionado` : `${totalSelecionados} Arquivos Selecionados`}
                </Span>
            }

            {totalSelecionados === 0 &&
                <Span
                    fSize={"1.4rem"}
                    fWeight={"bold"}
                    color={theme.color.secondary}
                    margin={"0 12px 0 0"}
                >
                    Nenhum arquivo selecionado
                </Span>
            }

            {totalSelecionados > 0 &&
                <Container
                    display={"flex"}
                    width={"fit-content"}
                    direciton={"row"}
                >
                    <Button
                        position={"relative"}
                        right={"-1px"}
                        fSize={"1rem"}
                        fWeight={"bold"}
                        width={"fit-content"}
                        jContent={"center"}
                        color={totalSelecionados === 0 ? theme.color.ligth_green : theme.color.primary}
                        bgColor={totalSelecionados === 0 ? "transparent" : theme.color.secondary}
                        padding={"16px 22px"}
                        margin={!loading && user && user.level === "admin" ? "18px 16px 0 0" : null}
                        border={totalSelecionados === 0 ? `1px solid ${theme.color.ligth_green}` : null}
                        bRadius={borderRadius}
                        cursor={totalSelecionados === 0 ? "default" : "pointer"}
                        disabled={totalSelecionados === 0}
                        onClick={handleClickBaixarTodos}
                    >
                        Baixar Todos
                    </Button>

                    {!loading && user && user.level === "admin" &&
                        <Button
                            position={"relative"}
                            right={"-1px"}
                            fSize={"1rem"}
                            fWeight={"bold"}
                            width={"fit-content"}
                            jContent={"center"}
                            color={totalSelecionados === 0 ? theme.color.ligth_green : theme.color.secondary}
                            bgColor={"transparent"}
                            padding={"16px 22px"}
                            margin={"18px 0"}
                            border={`1px solid ${theme.color.ligth_green}`}
                            bRadius={borderRadius}
                            cursor={totalSelecionados === 0 ? "default" : "pointer"}
                            disabled={totalSelecionados === 0}
                            onClick={handleClickSelecionados}
                        >
                            Excluir Selecionados
                        </Button>
                    }
                </Container>
            }
        </Container>
    )
}
