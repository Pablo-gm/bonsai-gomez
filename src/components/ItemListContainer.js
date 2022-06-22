import React, { useState } from 'react'
import ItemCount from './ItemCount';

function ItemListContainer(props) {

  const [showAlert, setShowAlert] = useState(false);

  function handleOnAdd(){
    setShowAlert(true);
  }

  return (
    <>
      <h1 className="text-center text-5xl mt-16 text-slate-800 mb-5">{props.greeting}</h1>
      <ItemCount stock={5} initial={1} onAdd={handleOnAdd} />
      {showAlert &&  <div className=" w-80 mt-3 bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3" role="alert">Se agregó</div>}
    </>
  )
}

export default ItemListContainer