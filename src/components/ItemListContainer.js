import React, { useState } from 'react'
import ItemList from './ItemList';

import * as Constants from "../constants/constants";

function ItemListContainer(props) {

  // Products to show
  const [productItems, setProductItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const products = props.categoryId ? Constants.productsList.filter( item => item.category === props.categoryId ) : Constants.productsList;

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