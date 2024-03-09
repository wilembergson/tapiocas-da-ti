import { useEffect, useState } from "react"
import { useGlobalContext } from "../contexts/Contexto"
import { Item } from "../page"
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md"
import api from "../api/api-connection";

type Props = {
    dados: Item
}

export default function Item({dados}:Props){
    const {item, setItem, showModal, setShowModal} = useGlobalContext()
    const [nomeUsuario, setNomeUsuaio] = useState(localStorage.getItem("nomeUsuario"))

    function editarItem(){ 
        if(nomeUsuario === dados.nomeCliente){
            setItem(dados)
            setShowModal(true)
        }
    }

    async function deletarItem(){ 
        try{
            await api.deletarItemPorId(dados.id)
            setItem(dados)
        }catch(e:any){
            console.log(e)
            alert(e)
        }
    }

    useEffect(() => {
        const nome = localStorage.getItem("nomeUsuario")
        setNomeUsuaio(nome)
    },[])

    return(
        <section className={`flex cursor-pointer justify-between shadow-lg
                    rounded-md my-2 p-2 ${dados.pago ? "bg-green-200" : "bg-red-200"}`}
                    >
            <div className="flex flex-col w-full">
                <h2 className="flex text-md">{dados.sabor.descricao}</h2>
                <h2 className="font-sm">QUANTIDADE: {dados.quantidade}</h2>   
                <h2 className={`flex ${nomeUsuario === dados.nomeCliente ? 'font-bold': ''}`}>
                    {dados.nomeCliente}
                </h2>
            </div>
            <div className="flex flex-col items-center">
                <h2 className="flex text-lg font-bold">R${dados.sabor.preco.toFixed(2)}</h2>
                {nomeUsuario === dados.nomeCliente ?
                    <section className="flex">
                        <div className="flex items-center bg-yellow-600
                                    text-white rounded-md shadow-md p-2 mr-1"
                                     onClick={editarItem}>
                            <AiFillEdit size={26}/>
                        </div>
                        <div className="flex items-center bg-red-600
                                    text-white rounded-md shadow-md p-2"
                                     onClick={deletarItem}>
                        <MdDeleteForever size={30}/>
                    </div>
                    </section>
                    
                    : <></>
                }
            </div>
        </section>
    )
}