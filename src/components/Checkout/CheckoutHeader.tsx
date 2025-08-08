import React from 'react'
import { Bs1Circle, Bs2Circle, Bs3Circle } from 'react-icons/bs'
import { MdOutlineArrowRightAlt } from 'react-icons/md'

export default function CheckoutHeader() {
    return (
        <>
            <div className="d-flex justify-content-between">
                <p style={{ color: "#13af6eff" }}><Bs1Circle size={28} color='#13af6eff' className='me-2' /> Shipping Cart</p>
                <p><MdOutlineArrowRightAlt /></p>
                <p><Bs2Circle /> Checkout Details</p>
                <p><MdOutlineArrowRightAlt /></p>
                <p> <Bs3Circle /> Order Complete</p>
            </div>
        </>
    )
}
