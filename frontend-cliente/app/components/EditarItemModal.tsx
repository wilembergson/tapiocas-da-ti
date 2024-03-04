import { useEffect, useState } from "react";
import api from "../api/api-connection";
import Modal from "./Modal";
import { Item, Sabor } from "../page";
import { useGlobalContext } from "../contexts/Contexto";

type Props = {
    dados:Item
}

type UpdateEnquete = {
    tempo: number;
}

export default function EditarItemModal() {
    const {item, setItem, showModal, setShowModal} = useGlobalContext()
    //const [item, setItem] = useState<Item>()
    const [sabores, setSabores] = useState<Sabor>()

    function handleChange({ target }: any) {
        setItem({ ...item!, [target.name]: target.value })
    }

    async function obterSabores() {
        try {
            const response = await api.listarSabores()
            setSabores(response.data)
        } catch (error: any) {
            alert(error)
            //alerts.ErrorAlert(error.response.data.mensagem)
        }
    }



    /*function confirmarAtualizacao(event: any) {
        event.preventDefault()
        alerts.ConfirmarAlert(
            atualizarEnquete,
            'Cofirmar atualização?',
            'As mudanças seram exibidas na votação.'
        )
    }*/

    /*async function atualizarEnquete() {
        try {
            const response = await api.atualizarEnquete(enquete?.tempo!)
            setEnqueteAtiva({
                id: enqueteAtiva?.id!,
                pergunta: enqueteAtiva!.pergunta!,
                tempo: enquete.tempo,
                ativo: enqueteAtiva?.ativo!,
                data_hora: enqueteAtiva?.data_hora!
            })
            setVisible(false)
            //alerts.SucessoAlert(response.data.mensagem)
        } catch (error: any) {
            alert(error)
            //alerts.ErrorAlert(error.response.data.mensagem)
        }
    }*/

    useEffect(() => {
        obterSabores()
    }, [])

    return (
        <Modal isVisible={showModal}>
            <div className="flex flex-col bg-white w-2/5 h-52 shadow-lg" data-aos="zoom-in">
                <h1 className="`flex font-black text-lg p-2 bg-[#581845] text-[#FF5733]">
                    Editar pedido
                </h1>
                <form className='flex flex-col p-4 bg-white'>
                    
                    <input className='flex mb-4 bg-gray-100 p-2 rounded-md'
                        type="text"
                        placeholder='Duração (em minutos)'
                        name='sabor.descricao'
                        onChange={(e: any) => handleChange(e)}
                        value={item?.sabor.descricao}
                        required
                    />
                     <input className='flex mb-4 bg-gray-100 p-2 rounded-md'
                        type="number"
                        placeholder='quantidade'
                        name='quantidade'
                        onChange={(e: any) => handleChange(e)}
                        value={item?.quantidade}
                        required
                    />
                    <div className="flex">
                        {/*<button className={botaoStyle("bg-blue-500")}>
                            Confirmar
                        </button>*/}
                        <button className='flex bg-red-500 font-white rounded-md p-2'
                            onClick={() => setShowModal(false)}>
                            Cancelar
                        </button>
    </div>
                </form>

            </div>
        </Modal>
    )
}