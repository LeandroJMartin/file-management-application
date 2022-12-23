// eslint-disable-next-line react-hooks/exhaustive-deps

import { useState } from 'react';

const useFetch = () => {
  const [loadingFetch, setLoadingFetch] = useState(false)

    const baseUrl = "http://localhost:8888/"
    const url = "marketing/services/"


    const acoes = {
        login: "login.php",
        revalidarToken: "revalidarToken.php",
        buscarPaths: "select.php",
        upload: "files.php",
        criar_pasta: "paths.php",
        renomear_pasta: "paths.php",
        deletar_pasta: "paths.php",
        deletar_arquivo: "files.php",
        renomear_arquivo: "files.php",
        multiple_download: "files.php",
        multiple_delete: "files.php",
    }

  
    const fetchData = async ({ acao = '', options = null }) => {
      setLoadingFetch(true)

      return await fetch(`${baseUrl}${url}${acoes[acao]}`, {
        ...options,
      })
      .then(res => res.json())
      .then(json => json)
      .catch(error => ({result: "erro", erro: JSON.stringify(error)}))
      .finally(() => setLoadingFetch(false))
    }
  
    return { fetchData, loadingFetch }
  };

  export default useFetch;