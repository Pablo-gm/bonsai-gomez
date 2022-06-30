import React from 'react'
import ItemCount from './ItemCount';

function ItemDetail({item}) {

    function handleOnAdd(){
        //setShowAlert(true);
        alert('ok');
    }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:shadow-xl basis-full lg:basis-10/12 xl:basis-1/2">
        <div className="flex flex-row">
            <img src={item.image} alt={item.name} className="h-auto w-full basis-full lg:basis-96" />
            <div className="p-5 h-96 flex justify-between flex-col">
                <div>
                    <h5 className="text-gray-900 text-xl leading-tight font-bold">{item.name}</h5>
                    <div className=''>{item.description}</div>
                </div>
                <div>
                    <div>Envío gratis a partir de $400.00</div>
                    <div className="flex flex-row gap-4 mb-4 justify-between items-end">
                        <div className="">
                            <span className="text-green-800">{item.stock}</span> Piezas
                        </div>
                        <div className='text-gray-900 text-2xl text-center'>
                            ${item.price}
                        </div>
                    </div>
                    <ItemCount stock={5} initial={1} onAdd={handleOnAdd} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemDetail