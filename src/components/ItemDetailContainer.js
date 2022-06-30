import React, { useState } from 'react'
import ItemDetail from './ItemDetail'

function ItemDetailContainer() {

    // Products to show
    const [productInfo, setProductInfo] = useState({});

    // Loading message
    const [loading, setLoading] = useState(true);

    // Get item info
    const getItem = async () => {
        return new Promise((resolve, reject) => {
        let t = setTimeout(() => {
            resolve(itemInfo);
        }, 2000);
        return () => {
            clearTimeout(t);
        }
        });
    };

    // On mount, get item info
    React.useEffect(() => {
        getItem()
        .then(res => {
        console.log("Resolved: " + res);
            setProductInfo(res);
        }, err => {
            console.log("Rejected: " + err);
        })
        .catch(err => console.log('Error: ' + err))
        .finally(() => {
            setLoading(false);
        })
    }, []);

    // hardcoded for now
    const itemInfo = 
        {
          name: "Hokkaido Verde",
          description: "Arbol de Bonsai de la región de Hokkaido en Japón.",
          image: "https://loremflickr.com/640/360",
          stock: 12,
          id: 1,
          price: '500.00'
        }

  return (
    <div className="p-5 mx-auto lg:max-w-7xl flex flex-row justify-center">
        { loading ? <h5>Loading...</h5> : <ItemDetail item={productInfo} /> }
    </div>
  )
}

export default ItemDetailContainer