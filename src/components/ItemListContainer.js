import React, { useState } from 'react'
import ItemList from './ItemList';

import * as Constants from "../constants/constants";

function ItemListContainer(props) {

  // Products to show
  const [productItems, setProductItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const products = props.categoryId ? Constants.productsList.filter( item => item.category === props.categoryId ) : Constants.productsList;
  /*
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
  */

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
    setLoading(true);
    getProducts()
    .then(res => {
      console.log("Resolved: " + res);
      setProductItems(res);
    }, err => {
      console.log("Rejected: " + err);
    })
    .catch(err => console.log('Error: ' + err))
    .finally(() => setLoading(false))
  }, [props.categoryId]);


  return (
    <>
      {loading ? <h5>Loading...</h5> : <h1 className="text-center text-5xl mt-16 text-slate-800 mb-5">{props.greeting}</h1>}
      { productItems && <ItemList items={productItems} />}
    </>
  )
}

export default ItemListContainer