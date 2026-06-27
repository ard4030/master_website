"use client"
import { MerchantContext } from '@/context/MerchantContext'
import React, { useContext, useEffect } from 'react'

const UpdateActiveMerchant = ({data}) => {

    const {setActiveMerchant,setLoading} = useContext(MerchantContext);

    useEffect(() => {
        if(data) {
            setActiveMerchant(data)
            setLoading(false)
        }
    },[data])
  return (
    <div></div>
  )
}

export default UpdateActiveMerchant