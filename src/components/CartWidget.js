import React, {useContext} from 'react'
import { ShoppingCartIcon } from '@heroicons/react/outline';

import { context } from '../context/CartContext';

function CartWidget() {
  const { numberOfItems } = useContext(context);

  let ni = numberOfItems();

  return (
    <span className="group -m-2 p-2 flex items-center">
      <ShoppingCartIcon className="flex-shrink-0 h-6 w-6 group-hover:text-slate-500" aria-hidden="true" />
      <span className="ml-2 text-sm font-medium group-hover:text-slate-800">{ ni || '' }</span>
      <span className="sr-only">artículos en el carrito de compra</span>
    </span>
  )
}

export default CartWidget