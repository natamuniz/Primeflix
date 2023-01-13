import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import './filme-info.css'
import api from '../../services/api';



function Filmes(){
    const { id } = useParams();
    const navigation = useNavigate();
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
            Navigate("/", { replace: true });
            return;
          })
        }
        loadFilme();

        return () => {
            console.log("Componente desmontado")
        }
    }, [Navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            alert("Esse filme já está na lista")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos) );
        alert("Fime salvo com sucesso")
    }

    if(loading){
        return(
            <div className='filme-info'>
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

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
                        Trailer
                    </a>
                </button>

            </div>
        </div>

    )
}

export default Filmes;