import React, { useState } from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/outline';

function ItemCount({ stock, initial,  onAdd }) {

    // if we want to have multiple "add product" clicks
    const [localStock, setLocalStock] = useState(stock >= 0 ? stock : 0);

    // track how many pieces the user wants
    const [count, setCount] = useState(initial >= 0 ? initial : 0);
    

    function removeCount(){
        console.log("remove");
        if(count - 1 >= 0){
            setCount(count - 1);
        }
    }
  
  
    function addCount(){
        console.log("add");
        if(count + 1 <= localStock){
            setCount(count + 1);
        }
    }

    return (
        <>
        <div className="flex items-center justify-center px-4">
            <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:shadow-xl">
            <div className="p-5">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Hokkaido Verde</h5>
                <p className="text-medium mb-5 text-gray-700">Arbol de Bonsai de la región de Hokkaido en Japón.</p>
                <div className="mb-3">
                    Stock disponible: <span className="text-green-800">{localStock}</span>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="basis-1/3">
                        <div className="flex w-full items-center justify-between rounded-lg border-solid border-2 border-indigo-60">
                        <button
                            type="button"
                            onClick={removeCount}
                            className="p-3 w-11 transition-all duration-300 hover:opacity-50"
                        >
                            <MinusIcon/>
                        </button>
                        <span className="font-bold">{count}</span>
                        <button
                            type="button"
                            onClick={addCount}
                            className="p-3 w-11 transition-all duration-300 hover:opacity-50"
                        >
                            <PlusIcon/>
                        </button>
                        </div>
                    </div>
                    <div className="basis-2/3">
                        <button 
                        type="button"
                        onClick={onAdd}
                        className="w-full text-base text-medium rounded-md bg-green-800 py-3 text-white hover:bg-green-600 hover:shadow-md duration-75"
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default ItemCount