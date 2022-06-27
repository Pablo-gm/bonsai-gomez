import React, { useState } from 'react'
import ItemCount from './ItemCount';
import ItemList from './ItemList';

function ItemListContainer(props) {

  const [showAlert, setShowAlert] = useState(false);

  // Products to show
  const [productItems, setProductItems] = useState([]);

  function handleOnAdd(){
    setShowAlert(true);
  }

  // Catalog is fixed for now
  const products = [
    {
      name: "Hokkaido Verde",
      description: "Arbol de Bonsai de la región de Hokkaido en Japón.",
      image: "https://loremflickr.com/640/360",
      stock: 12,
      id: 1,
      price: '500.00'
    },
    {
      name: "Hokkaido Morado",
      description: "Arbol de Bonsai de la región de Hokkaido en Japón.",
      image: "https://loremflickr.com/640/360",
      stock: 12,
      id: 2,
      price: '500.00'
    },
    {
      name: "Hokkaido Rojo",
      description: "Arbol de Bonsai de la región de Hokkaido en Japón.",
      image: "https://loremflickr.com/640/360",
      stock: 12,
      id: 3,
      price: '500.00'
    },
    {
      name: "Hokkaido Gris",
      description: "Arbol de Bonsai de la región de Hokkaido en Japón.",
      image: "https://loremflickr.com/640/360",
      stock: 12,
      id: 4,
      price: '500.00'
    }
  ]

  // Get al products from catalog (or const variables...)
  const getProducts = async () => {
    return new Promise((resolve, reject) => {
      let t = setTimeout(() => {
        resolve(products);
      }, 2000);
      return () => {
        clearTimeout(t);
      }
    });
  };

  // On mount, get products
  React.useEffect(() => {
    getProducts()
    .then(res => {
      console.log("Resolved: " + res);
      setProductItems(res);
    }, err => {
      console.log("Rejected: " + err);
    })
    .catch(err => console.log('Error: ' + err))
  }, []);


  return (
    <>
      <h1 className="text-center text-5xl mt-16 text-slate-800 mb-5">{props.greeting}</h1>
      { productItems && <ItemList items={productItems} />} 

      <ItemCount stock={5} initial={1} onAdd={handleOnAdd} />
      {showAlert &&  <div className=" w-80 mt-3 bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3" role="alert">Se agregó</div>}
    </>
  )
}

export default ItemListContainer