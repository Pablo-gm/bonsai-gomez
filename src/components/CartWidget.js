import React from 'react'
import { ShoppingCartIcon } from '@heroicons/react/outline';

function CartWidget() {
  return (
    <a href="#" className="group -m-2 p-2 flex items-center">
        <ShoppingCartIcon
        className="flex-shrink-0 h-6 w-6 text-slate-400 group-hover:text-slate-500"
        aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-slate-700 group-hover:text-slate-800">0</span>
        <span className="sr-only">artículos en el carrito de compra</span>
    </a>
  )
}

export default CartWidget