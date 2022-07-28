import React, { useState } from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/outline';

function ItemCount({ stock, initial,  onAdd }) {

    // track how many pieces the user wants
    const [count, setCount] = useState(initial >= 0 ? initial : 0);
    

    function removeCount(){
        if(count - 1 >= 0){
            setCount(count - 1);
        }
    }
  
  
    function addCount(){
        if(count + 1 <= stock){
            setCount(count + 1);
        }
    }

    return (
        <>
            <div className="">
                <div className="flex flex-row gap-4">
                    <div className="basis-1/3">
                        <div className="flex w-full items-center justify-between rounded-lg border-solid border-2 border-slate-200 overflow-hidden">
                        <button type="button" onClick={removeCount} className="p-3 w-11 transition-all duration-300 text-slate-900 hover:bg-slate-300 bg-slate-200">
                            <MinusIcon/>
                        </button>
                        <span className="font-bold">{count}</span>
                        <button type="button" onClick={addCount} className="p-3 w-11 transition-all duration-300 text-slate-900 hover:bg-slate-300 bg-slate-200">
                            <PlusIcon/>
                        </button>
                        </div>
                    </div>
                    <div className="basis-2/3">
                        <button  type="button" onClick={() => onAdd(count)} className="w-full text-base text-medium rounded-md bg-emerald-800 py-3 text-white hover:bg-emerald-600 hover:shadow-md duration-75">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemCount