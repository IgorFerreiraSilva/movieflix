import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme.css'
import api from '../../services/api'

function Filme(){

    const {id} = useParams()
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`./movie/${id}`, {
                params:{
                    api_key: "f411e9aa2fbfd8f96ab892decd69b295",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data)
                setLoading(false);
            })  
            .catch(()=>{
                navigate("/", {replace: true})
                return
            })
        }

        loadFilme()

        return () =>{
            //
        }

    }, [navigate, id])


    function salvarFilme(){
        const minhaLista = localStorage.getItem("@movieflix");

        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            alert("Você já tem esse filme salvo nos favoritos")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@movieflix", JSON.stringify(filmesSalvos))
        alert("Filme salvo com sucesso")
    }


    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregandos as informações</h1>
            </div>
        )
    }
    return(

        <>
            <div className="filme-info">
                <h1>{filme.title}</h1>
                <img src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
                <h3>Sinopse</h3>
                <span>{filme.overview}</span>

                <div  className="area-buttons">
                    <button onClick={salvarFilme}>Salvar</button>
                    <button>
                        <a target="blank" rel="external noreferrer" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
                    </button>
                </div>
            </div>     
        </>
        
    )
}

export default Filme;