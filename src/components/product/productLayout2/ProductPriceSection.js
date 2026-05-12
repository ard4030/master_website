import { CartContext } from '@/context/CartContext'
import { isCart } from '@/utils/functions'
import React, { useContext, useEffect, useState } from 'react'

const ProductPriceSection = ({isVariants,variants,variantsFull,product}) => {

    const [activeVariant,setActiveVariant] = useState(null)
    const [matchVariant,setMatchVariant] = useState(null)
    const {addToCart,cart,increaseQuantity,decreaseQuantity,loading} = useContext(CartContext)

    useEffect(() => {
        if(isVariants){
            let act ={};
            variants[0].attributes.forEach(element => {
                act[element.name]=element.value
            });
            setActiveVariant(act)
        }else{
            setMatchVariant({price:product.price,stockQuantity:product.stockQuantity})
        }
    },[])

    // CheckActive Variant
    const checkActive = (name,value) => {
        if(activeVariant){
            if(activeVariant[name] === value) return true
            return false
        }
    }

    // Change Active Variant
    const changevariant = (name,value) => {
        setActiveVariant({...activeVariant,[name]:value})
    }

    useEffect(() => {
        if(activeVariant) {
            const matchedVariant = variants.find((variant) =>

            Object.entries(activeVariant).every(([name, value]) =>
                variant.attributes.some(
                (attr) => attr.name === name && attr.value === value
                )
            )
            );
            setMatchVariant(matchedVariant)
        }
        
    },[activeVariant])


    const checkIsCart = () => {
        if(loading){
            return <span>Loading...</span>
        }else{
            let data = isCart({productId:product._id,variantId:matchVariant?._id,isVariants:isVariants,items:cart?.items});
            if(data){
                return(
                <div className='flex items-center'>
                    <span 
                    onClick={() => increaseQuantity(data.productId,data.variantId)}
                    className='w-5 h-5 bg-blue-400 flex justify-center items-center text-[24px] rounded-full text-white'>+</span>
                    <span className='mx-2'>{data.quantity}</span>
                    <span 
                    onClick={() => decreaseQuantity(data.productId,data.variantId)}
                    className='w-5 h-5 bg-blue-400 flex justify-center items-center text-[24px] rounded-full text-white'>-</span>
                </div>
    
                )
            }else{
                return(
                <button 
                onClick={() => addToCart({
                    _id:product._id,
                    isVariants:isVariants,
                    variantId:matchVariant?._id || null
                })}
                className='bg-blue-600 text-white p-2 rounded-[5px]'>افزودن به سبد خرید</button>
                )
            }
        }
    }

  return (
    <div>
        {
            variantsFull.map((item,index) =>
            <div 
            className='flex mb-5'
            key={index}>
                <span className='p-1 ml-5'>{item.name} :</span>
                <div className='flex'>
                    {
                        item.values.map((item1,index1) => 
                        <div key={index1} className='flex p-1 border-1 border-neutral-500 mr-2'>
                            <span 
                            onClick={() => changevariant(item.name,item1.value)}
                            className={`w-[20px] h-[20px] border-[1px] border-neutral-800 rounded-full ml-2 ${checkActive(item.name,item1.value)?"bg-red-600":"bg-white"}`}></span>
                            <span >{item1.value}</span>
                        </div>
                        )
                    }
                </div>
            </div>
            )
        }

        <div>
            {matchVariant && (
                <div className='border-t-2 border-neutral-200 pt-4 mt-4'>
                    <div className='flex justify-between items-center mb-3'>
                        <span className='text-lg font-semibold'>قیمت:</span>
                        <span className='text-2xl font-bold text-red-600'>{matchVariant.price.toLocaleString()} تومان</span>
                    </div>
                    <div className='mb-3'>
                        <span className={`text-base font-semibold ${matchVariant.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {matchVariant.stockQuantity > 0 ? `✓ موجود (${matchVariant.stockQuantity} عدد)` : '✗ ناموجود'}
                        </span>
                    </div>
                </div>
            )}
        </div>

        {/* ADD TO CART */}
        {
            checkIsCart()
        }
    </div>
  )
}

export default ProductPriceSection