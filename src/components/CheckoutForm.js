import React, { useState } from 'react'

function CheckoutForm({onSubmitForm}) {

    const [buyer, setBuyer] = useState({
        name: '',
        telephone: '',
        email: '',
        confirmEmail: '',
        deliveryAddress: ''
    })
    
    const [errors, setErrors] = useState({})

    const handleInput = (e) => {
        setBuyer({ ...buyer, [e.target.name]: e.target.value })
    }

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const validateForm = () => {
        let newErrors = {};

        if (!buyer.name) {
            newErrors.name = 'Tu nombre es requerido';
        }

        if (!buyer.telephone) {
            newErrors.telephone = 'Tu teléfono es requerido';
        }

        if (!buyer.deliveryAddress) {
            newErrors.deliveryAddress = 'Tu domicilio es requerido';
        }

        if (!buyer.email) {
            newErrors.email = 'Tu correo es requerido';
        }else if(!isValidEmail(buyer.email)){
            newErrors.email = 'El formato no es válido. Revisa que el formato se parezca a: nombre@dominio.com';
        }

        if (buyer.confirmEmail != buyer.email) {
            newErrors.confirmEmail = 'El correo no coincide';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length > 0 ? false : true;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if(validateForm()){
            onSubmitForm(buyer);
        }
    }

  return (
    <form onSubmit={submitHandler}>
        <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-300">Tu nombre</label>
            <input type="text" id="name" name="name" onChange={handleInput} value={buyer.name} className="bg-slate-50 border-2 border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2 outline-none"  />
            { errors.name ? <div className='text-red-500'>{errors.name}</div> : null}
        </div>
        <div className="mb-4">
            <label htmlFor="telephone" className="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-300">Tu teléfono</label>
            <input type="text" id="telephone" name="telephone" onChange={handleInput} value={buyer.phone} className="bg-slate-50 border-2 border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2 outline-none"  />
            { errors.telephone ? <div className='text-red-500'>{errors.telephone}</div> : null}
        </div>
        <div className="mb-4">
            <label htmlFor="deliveryAddress" className="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-300">Tu domicilio</label>
            <input type="text" id="deliveryAddress" name="deliveryAddress" onChange={handleInput} value={buyer.deliveryAddress} className="bg-slate-50 border-2 border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2 outline-none"  />
            { errors.deliveryAddress ? <div className='text-red-500'>{errors.deliveryAddress}</div> : null}
        </div>
        <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-300">Tu correo</label>
            <input type="email" id="email" name="email" onChange={handleInput} value={buyer.email} className="bg-slate-50 border-2 border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2 outline-none"  />
            { errors.email ? <div className='text-red-500'>{errors.email}</div> : null}
        </div>
        <div className="mb-4">
            <label htmlFor="confirmEmail" className="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-300">Confirma tu correo</label>
            <input type="email" id="confirmEmail" name="confirmEmail" onChange={handleInput} value={buyer.confirmEmail} className="bg-slate-50 border-2 border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2 outline-none"  />
            { errors.confirmEmail ? <div className='text-red-500'>{errors.confirmEmail}</div> : null}
        </div>
        <button type="submit" className="w-full text-base text-medium rounded-md bg-emerald-800 py-3 text-white hover:bg-emerald-600 hover:shadow-md duration-75">Comprar</button>
    </form>
  )
}

export default CheckoutForm