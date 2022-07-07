import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import ItemCount from './ItemCount';

function ItemDetail({item}) {

    const [stockAdded, setStockAdded] = useState(0);

    function onAdd(quantity){
        //alert('ok');
        setStockAdded(quantity);
    }

  return (
    <>
        <div className="overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:shadow-xl basis-full lg:basis-8/12 xl:basis-1/2">
            <div className="flex flex-row">
                <img src={item.image} alt={item.name} className="h-auto w-full basis-full lg:basis-96" />
                <div className="p-5 h-96 flex justify-between flex-col grow">
                    <div>
                        <h5 className="text-gray-900 text-xl leading-tight font-bold">{item.name}</h5>
                        <div className=''>{item.description}</div>
                    </div>
                    <div>
                        <div>Envío gratis a partir de $400.00</div>
                        <div className="flex flex-row gap-4 mb-4 justify-between items-end">
                            <div className="">
                                <span className="text-green-800">{item.stock - stockAdded}</span> Piezas
                            </div>
                            <div className='text-gray-900 text-2xl text-center'>
                                ${item.price}
                            </div>
                        </div>
                        { item.stock && stockAdded === 0 && <ItemCount stock={item.stock} initial={1} onAdd={onAdd} /> }
                        { stockAdded > 0 && 
                            <>
                                <div className="bg-green-50 rounded-lg py-3 px-4 mb-4 text-base text-green-900 mb-3" role="alert">
                                    Se agregaron {stockAdded} unidades
                                </div>
                                <Link to="/cart" className='block text-center text-base text-medium rounded-md bg-green-800 py-3 text-white hover:bg-green-600 hover:shadow-md duration-75'>Finalizar compra</Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>

  )
}

export default ItemDetail