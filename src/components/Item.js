import React from 'react'
import { Link } from "react-router-dom";

function Item({item}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:shadow-xl">
        <img src={item.image} alt={item.name} className="h-auto w-full" />
        <div className="p-5">
            <h5 className="text-gray-900 text-xl leading-tight font-bold">{item.name}</h5>
            <div className="flex flex-row gap-4 mb-4 justify-between items-end">
                <div className="">
                    <span className="text-green-800">{item.stock}</span> Piezas
                </div>
                <div className='text-gray-900 text-2xl text-center'>
                    ${item.price}
                </div>
            </div>
            <Link  to={`/item/${item.id}`} className="block w-full text-green-700 hover:text-white border-2 border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 text-lg text-medium rounded-md text-center py-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                Ver producto
            </Link>
        </div>
    </div>
  )
}

export default Item