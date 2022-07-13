import React, {useContext} from 'react'

import { XCircleIcon } from '@heroicons/react/outline'

import { context } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, clearCart, removeItem, getSubtotal, getShipping, getTotal } = useContext(context);

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  console.log("current cart")
  console.log(cart);

  const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD", minimumFractionDigits: 2 })

  const productsList = cart.map((product) =>{
    return(
      <tr key={product.item.id}>
        <td className="text-center"><XCircleIcon className="inline-block h-8 w-8 text-red-500 cursor-pointer" onClick={() => removeItem(product.item.id) } /></td>
        <td className="px-4 py-4 whitespace-nowrap text-slate-700">{product.item.name}</td>
        <td className="px-4 py-4 whitespace-nowrap text-right text-slate-700">{currencyFormatter.format(product.item.price)}</td>
        <td className="px-4 py-4 whitespace-nowrap text-right text-slate-700">{product.quantity}</td>
        <td className="px-4 py-4 whitespace-nowrap text-right text-slate-700">{currencyFormatter.format(product.item.price * product.quantity)}</td>
      </tr>
    )
  });

  return (
    <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-3'>
      { cart.length === 0 && 
        <div className='text-slate-700 mt-6'>El carrito no tiene productos. <Link to='/' className='text-blue-900 font-bold ml-2'>Explorar</Link></div>
      }
      { cart.length > 0 && 
        <div>
          <button onClick={() => clearCart()}  className="inline-block bg-white hover:bg-slate-200 text-slate-900 text-center px-3 py-2 rounded-md text-sm font-medium mb-5">
            Vaciar carrito
          </button>
          <div className="flex xl:flex-row gap-4 flex-col">
            <div className="xl:basis-3/4 basis-full">
              <div className="shadow overflow-x-auto border-b border-gray-200 rounded-lg mb-5">
                <table className='table-auto min-w-full divide-y divide-gray-200'>
                  <thead className="bg-gray-50">
                    <th className='px-4 py-2 w-16'></th>
                    <th className='px-4 py-2 text-left text-slate-900'>Producto</th>
                    <th className='px-4 py-2 text-right text-slate-900'>Precio</th>
                    <th className='px-4 py-2 text-right text-slate-900'>Cantidad</th>
                    <th className='px-4 py-2 text-right text-slate-900'>Total</th>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {productsList}
                  </tbody>
                  <tfoot className="bg-slate-700">
                    <td></td>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-50" colSpan={3}>Subtotal</td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-slate-50">{currencyFormatter.format(subtotal)}</td>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="xl:basis-1/4 basis-full">
              <div className='shadow bg-white p-5 rounded-lg'>
                <h2 className="text-xl font-bold">Resumen:</h2>
                <div className="flex items-center justify-between border-t-2 py-2 mt-5">
                  <span className='font-semibold text-slate-900'>Subtotal</span>
                  <span className="text-slate-700">{currencyFormatter.format(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between border-t-2 py-2">
                  <span className='font-semibold text-slate-900'>Costo de envio</span>
                  <span className="text-slate-700">{currencyFormatter.format(shipping)}</span>
                </div>
                <div className="flex items-center justify-between border-t-2 py-2">
                  <span className='font-semibold text-slate-900'>Total</span>
                  <span className="text-slate-700">{currencyFormatter.format(total)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      }
    </div>
  )
}

export default Cart