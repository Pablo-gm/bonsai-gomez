import React from 'react'
import { InformationCircleIcon, ExclamationIcon, CheckCircleIcon, XIcon } from '@heroicons/react/outline'

function Snackbar({type = 'blue', content = '', closeEvent}) {

    const iconList = {
        blue: <InformationCircleIcon className="w-6 mr-3 shrink-0"/>,
        red: <ExclamationIcon className="w-6 mr-3 shrink-0"/>,
        green: <CheckCircleIcon className="w-6 mr-3 shrink-0"/>,
    }

    const icon = iconList[type];

    // tailwind don't use dynamic classses
    function getColorClasses(type){
        if(type === "blue"){
            return "text-blue-100 bg-blue-900 rounded-lg flex justify-between p-4 mt-4 text-sm shadow"
        }else if(type === "red"){
            return "text-red-100 bg-red-900 rounded-lg flex justify-between p-4 mt-4 text-sm shadow"
        }else if(type === "green"){
            return "text-emerald-100 bg-emerald-900 rounded-lg flex justify-between p-4 mt-4 text-sm shadow"
        }else{
            return "text-yellow-100 bg-yellow-900 rounded-lg flex justify-between p-4 mt-4 text-sm shadow"
        }
    }

  return (
    <>
        <div className={getColorClasses(type)} role="alert">
            <div className="flex items-center">
                {icon}
                <div>
                    {content}
                </div>
            </div>
        </div>
    </>
  )
}

export default Snackbar