import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

import { context } from '../context/CartContext';

import ItemCount from './ItemCount';

function ItemDetail({item}) {

    const {addItem, isInCart} = useContext(context);


    let onCart = isInCart(item.id);

    function onAdd(quantity){
        addItem(item, quantity);
    }


  return (
    <>
        <div className="overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:shadow-xl md:basis-full sm:basis-96 lg:basis-8/12">
            <div className="flex flex-col md:flex-row">
                <img src={item.imageUrl} alt={item.name} className="h-auto w-full w-96 h-96" />
                <div className="p-5 h-96 flex justify-between flex-col grow">
                    <div>
                        <h5 className="text-gray-900 text-xl leading-tight font-bold">{item.name}</h5>
                        <div className=''>{item.description}</div>
                    </div>
                    <div>
                        <div>Envío gratis a partir de $400.00</div>
                        <div className="flex flex-row gap-4 mb-4 justify-between items-end">
                            <div className="">
                                <span className="text-emerald-800">{item.stock}</span> Piezas
                            </div>
                            <div className='text-gray-900 text-2xl text-center'>
                                ${item.price}
                            </div>
                        </div>
                        { item.stock ? <ItemCount stock={item.stock} initial={1} onAdd={onAdd} /> : null}
                        { onCart ? <Link to="/cart" className='block text-center text-base text-medium rounded-md bg-emerald-800 py-3 mt-6 text-white hover:bg-emerald-600 hover:shadow-md duration-75'>Finalizar compra</Link> : null }
                    </div>
                </div>
            </div>
        </div>
    </>

  )
}

export default ItemDetail