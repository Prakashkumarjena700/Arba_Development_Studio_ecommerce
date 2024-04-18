import React, { useEffect, useState } from 'react'

export default function TermsAndCondition() {
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const hasAcceptedTerms = localStorage.getItem('hasAcceptedTerms');
        if (hasAcceptedTerms) {
            setShowDialog(false);
        } else {
            setShowDialog(true)
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('hasAcceptedTerms', 'true');
        setShowDialog(false);
    };

    const handleCancel = () => {
        setShowDialog(false);
    };

    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ${showDialog ? '' : 'hidden'}`}>
            <div className="bg-white p-8 w-[40%] text-left">
                <h2 className="text-2xl font-bold mb-4">TERMS & CONDITIONS</h2>
                <p className='font-bold leading-5' >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed deleniti sint nulla eligendi libero reprehenderit nihil, placeat eveniet expedita hic tenetur cupiditate, eaque, quaerat explicabo magnam voluptas sit harum praesentium!</p>
                    <br />
                <p className='font-bold leading-5' >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed deleniti sint nulla eligendi libero reprehenderit nihil, placeat eveniet expedita hic tenetur cupiditate, eaque, quaerat explicabo magnam voluptas sit harum praesentium!</p>
                <br />
                <p className='font-bold leading-5' >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed deleniti sint nulla eligendi libero reprehenderit nihil, placeat eveniet expedita hic tenetur cupiditate, eaque, quaerat explicabo magnam voluptas sit harum praesentium!</p>
                <div className="mt-4 flex justify-evenly">
                    <button className="mr-4 px-6 py-0.5  bg-[#00AAC3] text-white rounded" onClick={handleAccept}>Accept</button>
                    <button className="px-6 py-0.5 bg-[#00AAC3] text-white rounded" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
