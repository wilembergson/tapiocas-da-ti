import {PedidoTipo} from '../page'
import BotaoCopiar from './BotaoCopiar'
import Item from './Item'

type Props = {
    dados:PedidoTipo
}

export default function Pedido({dados}:Props){
    return(
        <div className='flex flex-col p-2 m-4 md:w-4/5 w-full rounded-md '>
            <div className='flex flex-col bg-white shadow-md rounded-md w-full p-2 mb-4'>
                <div className='flex justify-between'>
                    <h1 className='flex text-2xl mb-4 font-bold'>
                        PIX: {dados?.pix}
                    </h1>
                    <BotaoCopiar textToCopy={dados.pix}/>
                </div>
                <section className='flex justify-between w-full'>
                    <div>
                        <h2 className='text-red-700'>Valor à pagar: R${dados.totalAPagar.toFixed(2)}</h2>
                        <h2 className='text-green-700'>Valor pago: R${dados.totalPago.toFixed(2)}</h2>
                    </div>
                    <div className='flex flex-col items-end font-bold'>
                        <h2>TOTAL</h2>
                        <h2>R${dados.total.toFixed(2)}</h2> 
                    </div>
                </section>
            </div>
            <div>{dados?.itens?.map(item => <Item dados={item}/>)}</div>
        </div>
    )
}