import React from 'react'
import { ImSpinner2 } from "react-icons/im";

export default function Loader() {
    return (
        <div className='flex justify-center items-center mt-10 text-[20px]' >
            <button className="px-4 py-1 rounded flex justify-center items-center h-10 " >
                <span className='animate-spin text-[#00AAC3] m-2' ><ImSpinner2 /></span>
                <span>Fetching...</span>
            </button>
        </div>
    )
}
