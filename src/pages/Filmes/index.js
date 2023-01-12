import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';



function Filmes(){
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
          await api.get(`/movie/${id}`, {
            params:{
                api_key: "5c40782572053cd2cd1f5b920ab9a32b",
                language: "pt-BR",
            }
          })
          .then((response)=>{
           setFilme(response.data);
           setLoading(false);
          })
          .catch(()=>{

          })
        }
        loadFilme();

        return () => {
            console.log("Componente desmontado")
        }
    }, [])

    if(loading){
        return(
            <div className='file-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.voteaverage} / 10</strong>
        </div>

    )
}

export default Filmes;