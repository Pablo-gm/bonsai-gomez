import React, {useContext, useState} from 'react'

import CheckoutForm from '../components/CheckoutForm';

import { XCircleIcon } from '@heroicons/react/outline'

import { context } from '../context/CartContext';
import { Link } from 'react-router-dom';

import { db } from "../firebase/firebase";
import { addDoc, collection, serverTimestamp, writeBatch, query, where, getDocs, documentId, doc } from 'firebase/firestore';
import NotificationsContainer from '../components/NotificationsContainer';

function Cart() {
  const [idOrder, setIdOrder] = useState('');

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
        <td className="px-4 py-4 whitespace-nowrap text-slate-700"><img src={product.item.imageUrl} alt={product.item.name} className="w-10 h-10 inline-block mr-2" /> {product.item.name}</td>
        <td className="px-4 py-4 whitespace-nowrap text-right text-slate-700">{currencyFormatter.format(product.item.price)}</td>
        <td className="px-4 py-4 whitespace-nowrap text-right text-slate-700">{product.quantity}</td>
        <td className="px-4 py-4 whitespace-nowrap text-right text-slate-700">{currencyFormatter.format(product.item.price * product.quantity)}</td>
      </tr>
    )
  });

  const handleSubmit = async (buyer) => {
    console.log(buyer);

    const ordersCollection = collection(db,'orders')

    // add new order to databse
    const newOrder = {
      buyer,
      products: cart.map(product => ({ id: product.item.id, name: product.item.name, price: product.item.price, quantity: product.quantity, imageUrl: product.item.imageUrl })),
      date: serverTimestamp(),
      subtotal: subtotal,
      shipping: shipping,
      total: total
    }

    console.log(newOrder);

    addDoc(ordersCollection, newOrder)
    .then(({ id }) => setIdOrder(id))
    .catch(err => console.log('Error: ' + err));

    // Update products stocks
    const batch = writeBatch(db);
    const productsCollection = collection(db,'products');
    //const q = query(productsCollection, where('id', 'in', cart.map(p => p.item.id)))
    const q = query(productsCollection, where(documentId() , 'in', cart.map(p => p.item.id)));
    
    console.log("query");
    console.log(q);

    getDocs(q).then(res => {
      console.log("Resolved: ");
      console.log(res);
      res.docs.forEach(
        (snapshot) => {
          const item = cart.find(product => snapshot.id === product.item.id);
          console.log(snapshot.data());
          console.log('item');
          console.log(item);
          batch.update(doc(db, 'products', snapshot.id), { stock: snapshot.data().stock - item.quantity });
        }
      )
      batch.commit();
      clearCart();
    }, err => {
      console.log("Rejected: " + err);
    })
    .catch(err => console.log('Error: ' + err))

  }

  return (
    <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-3'>
      { idOrder && <NotificationsContainer notifications={[{type: 'green', content: <p>Tu número de compra es: <strong>{idOrder}</strong></p>}]} ></NotificationsContainer>}
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
                    <tr>
                      <th className='px-4 py-2 w-16'></th>
                      <th className='px-4 py-2 text-left text-slate-900'>Producto</th>
                      <th className='px-4 py-2 text-right text-slate-900'>Precio</th>
                      <th className='px-4 py-2 text-right text-slate-900'>Cantidad</th>
                      <th className='px-4 py-2 text-right text-slate-900'>Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {productsList}
                  </tbody>
                  <tfoot className="bg-slate-700">
                    <tr>
                      <td></td>
                      <td className="px-4 py-4 whitespace-nowrap text-slate-50" colSpan={3}>Subtotal</td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-slate-50">{currencyFormatter.format(subtotal)}</td>
                    </tr>
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
                <CheckoutForm onSubmitForm={handleSubmit}/>
              </div>
            </div>
          </div>

        </div>
      }
    </div>
  )
}

export default Cart