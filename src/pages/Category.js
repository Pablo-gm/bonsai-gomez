import React, {useEffect} from 'react'
import { useParams, Link } from "react-router-dom";

import ItemListContainer from "../components/ItemListContainer";

import * as Constants from "../constants/constants"

function Category() {
  let params = useParams();
  let isCategory = Constants.productCategories.includes(params.id);

  useEffect(() => {
    console.log(params.id)
    if( Constants.productCategories.includes(params.id)){
      isCategory = true;
    }
  }, [params.id]);

  return (
    <>
      {isCategory && <ItemListContainer greeting={params.id} categoryId={params.id}/> }
      {!isCategory && 
        <>
          <h1 className="text-center text-5xl mt-16 text-slate-800 mb-5">{`No hay productos bajo la categoría ${params.id}`}</h1>
          <div className="text-center mt-8">
            <Link  to="/" className="px-3 text-emerald-700 hover:text-white border-2 border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 text-lg text-medium rounded-md text-center py-2 dark:border-emerald-500 dark:text-emerald-500 dark:hover:text-white dark:hover:bg-emerald-600 dark:focus:ring-emerald-800">
              Regresar
            </Link>
          </div>

        </>
      }
       
    </>
  )
}

export default Category