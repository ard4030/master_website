'use client';
import { CartContext } from '@/context/CartContext'
import { isCart } from '@/utils/functions'
import React, { useContext, useEffect, useState } from 'react'
import { FiPlus, FiMinus } from 'react-icons/fi'

const ProductOptions = ({isVariants,variants,variantsFull,product}) => {

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



  // چک کردن اینکه محصول در سبد است یا نه
  const checkIsCart = () => {
    if(loading){
      return <span>Loading...</span>
    }else{
      let data = isCart({productId:product._id,variantId:matchVariant?._id,isVariants:isVariants,items:cart?.items});
      if(data){
        return(
          <div className="flex items-center gap-3 border-2 border-gray-300 rounded-lg w-fit px-2">
            <button 
            onClick={() => decreaseQuantity(data.productId,data.variantId)}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
              <FiMinus size={18} />
            </button>
            <span className="px-4 py-2 text-lg font-semibold text-gray-900 danaMed min-w-[40px] text-center">{data.quantity}</span>
            <button 
            onClick={() => increaseQuantity(data.productId,data.variantId)}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
              <FiPlus size={18} />
            </button>
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
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition danaMed">
            افزودن به سبد
          </button>
        )
      }
    }
  }

  return (
    <div className="dana" dir="rtl">
      {/* انتخاب Attributes - داینامیک */}
      {
        variantsFull?.map((item, index) => (
          <div key={index} className="mb-0 pb-3">
            <label className="block text-sm font-semibold text-gray-900 mb-2 danaMed">
              {item.name}
            </label>
            <div className="flex gap-3 flex-wrap">
              {
                item.values.map((item1, index1) => (
                  <button
                    key={index1}
                    onClick={() => changevariant(item.name, item1.value)}
                    className={`px-4 py-2 rounded-lg border-2 transition danaMed ${
                      checkActive(item.name, item1.value)
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {item1.value}
                  </button>
                ))
              }
            </div>
          </div>
        ))
      }

      {/* Price و Stock */}
      <div>
        {matchVariant && (
          <div className=' pt-4 mt-2 space-y-4 border-t border-neutral-200'>
            {/* قیمت */}
            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-600 danaMed'>قیمت:</span>
              <span className='text-2xl font-bold text-gray-900 danaBold'>{Math.floor(matchVariant.price).toLocaleString('fa-IR')} تومان</span>
            </div>
            
            {/* موجودی */}
            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-600 danaMed'>موجودی:</span>
              <span className={`text-base  danaMed ${matchVariant.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {matchVariant.stockQuantity > 0 ? `✓ موجود (${matchVariant.stockQuantity} عدد)` : '✗ ناموجود'}
              </span>
            </div>

            {/* تعداد یا دکمه افزودن */}
            <div className='pt-4'>
              {checkIsCart()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductOptions;
