import { useContext } from 'react';
import SelecionadosContext from '../context/arquivos_selecionados_context';

export default function useArquivosSelecionados() {
    return useContext(SelecionadosContext)
}
