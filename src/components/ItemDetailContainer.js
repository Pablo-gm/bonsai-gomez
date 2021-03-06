import React, { useState } from 'react'
import { useParams, Link } from "react-router-dom";
import { ChevronRightIcon } from '@heroicons/react/outline'

import ItemDetail from './ItemDetail'

import { db } from "../firebase/firebase";
import { doc, getDoc, collection } from 'firebase/firestore';

function ItemDetailContainer() {
    let params = useParams();

    // Products to show
    const [productInfo, setProductInfo] = useState({});

    // Loading message
    const [loading, setLoading] = useState(true);


    const getItem = async () => {
        const productsCollection = collection(db,'products');
        const refDoc = doc(productsCollection, params.id)
        return getDoc(refDoc);
    };

    // On mount, get item info
    React.useEffect(() => {
        getItem()
        .then(res => {
            const tempProduct = res.exists() ? { id: res.id, ...res.data() } : {};
            setProductInfo(tempProduct);
        }, err => {
            console.log("Rejected: " + err);
        })
        .catch(err => console.log('Error: ' + err))
        .finally(() => {
            setLoading(false);
        })
    }, []);

  return (
    <>
    { loading ? <h5>Loading...</h5> : 
        <>  
            <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-3'>
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to={`/`} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <ChevronRightIcon className='w-4 h-4 text-gray-400' />
                                <Link to={`/category/${productInfo.category}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                                    {productInfo.category}
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <ChevronRightIcon className='w-4 h-4 text-gray-400' />
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                                    {productInfo.name}
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="p-5 mx-auto lg:max-w-7xl flex flex-row justify-center">
                <ItemDetail item={productInfo} />
            </div>
        </>
    }


    </>
  )
}

export default ItemDetailContainer