import React, { useState } from 'react'
import ItemList from './ItemList';

import { db } from "../firebase/firebase";
import { getDocs, collection, query, where } from 'firebase/firestore';

import * as Constants from "../constants/constants";

function ItemListContainer(props) {

  // Products to show
  const [productItems, setProductItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    const productsCollection = collection(db,'products');

    if(props.categoryId){
      const q = query(productsCollection, where('category', '==', props.categoryId))
      return getDocs(q);
    }

    return getDocs(productsCollection);
  }

  // On mount, get products
  React.useEffect(() => {
    setLoading(true);
    getProducts()
    .then(res => {
      console.log("Resolved: " + res);
      const tempProducts = res.docs.map(
        (product) => {
          return { id: product.id, ...product.data() };
        } 
      )
      setProductItems(tempProducts);
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