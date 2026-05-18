'use client';
import { CartContext } from '@/context/CartContext'
import { isCart } from '@/utils/functions'
import React, { useContext, useEffect, useState } from 'react'
import { FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi'
import { useRouter } from 'next/navigation';

const ProductOptionsMobile = ({isVariants, variants, variantsFull, product}) => {

    const [activeVariant, setActiveVariant] = useState(null)
    const [matchVariant, setMatchVariant] = useState(null)
    const {addToCart, cart, increaseQuantity, decreaseQuantity, loading} = useContext(CartContext)
    const router = useRouter();

    useEffect(() => {
        if(isVariants){
            let act = {};
            variants[0].attributes.forEach(element => {
                act[element.name] = element.value
            });
            setActiveVariant(act)
        }else{
            setMatchVariant({price: product.price, stockQuantity: product.stockQuantity})
        }
    },[])

    // CheckActive Variant
    const checkActive = (name, value) => {
        if(activeVariant){
            if(activeVariant[name] === value) return true
            return false
        }
    }

    // Change Active Variant
    const changevariant = (name, value) => {
        setActiveVariant({...activeVariant, [name]: value})
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
    const getCartData = () => {
        if(loading){
            return null;
        }else{
            let data = isCart({productId: product._id, variantId: matchVariant?._id, isVariants: isVariants, items: cart?.items});
            return data;
        }
    }

    const cartData = getCartData();

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dana" dir="rtl">
            {/* فضای برای جلوگیری از همپوشانی */}
            <div className="pt-4 pb-20 px-4 max-h-[40vh] overflow-y-auto">
                {/* انتخاب Attributes - داینامیک */}
                {
                    variantsFull?.map((item, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-sm font-semibold text-gray-900 mb-2 danaMed">
                                {item.name}
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {
                                    item.values.map((item1, index1) => (
                                        <button
                                            key={index1}
                                            onClick={() => changevariant(item.name, item1.value)}
                                            className={`px-3 py-1 rounded-lg border-2 transition danaMed text-sm ${
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
                {matchVariant && (
                    <div className='pt-3 mt-3 space-y-3 border-t border-neutral-200'>
                        {/* قیمت */}
                        <div className='flex justify-between items-center'>
                            <span className='text-sm text-gray-600 danaMed'>قیمت:</span>
                            <span className='text-xl font-bold text-gray-900 danaBold'>{Math.floor(matchVariant.price).toLocaleString('fa-IR')} تومان</span>
                        </div>
                        
                        {/* موجودی */}
                        <div className='flex justify-between items-center'>
                            <span className='text-sm text-gray-600 danaMed'>موجودی:</span>
                            <span className={`text-sm danaMed ${matchVariant.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {matchVariant.stockQuantity > 0 ? `✓ موجود (${matchVariant.stockQuantity} عدد)` : '✗ ناموجود'}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* دکمه‌های فیکس پایین */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex gap-3">
                {loading ? (
                    <button disabled className="flex-1 bg-gray-400 text-white py-3 rounded-lg font-semibold danaMed">
                        درحال بارگزاری...
                    </button>
                ) : cartData ? (
                    <>
                        {/* شمارنده */}
                        <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg px-2 py-1">
                            <button 
                            onClick={() => decreaseQuantity(cartData.productId, cartData.variantId)}
                            className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center justify-center">
                                <FiMinus size={16} />
                            </button>
                            <span className="px-2 py-1 text-base font-semibold text-gray-900 danaMed min-w-[35px] text-center">{cartData.quantity}</span>
                            <button 
                            onClick={() => increaseQuantity(cartData.productId, cartData.variantId)}
                            className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center justify-center">
                                <FiPlus size={16} />
                            </button>
                        </div>

                        {/* دکمه ادامه سفارش */}
                        <button 
                        onClick={() => router.push('/cart')}
                        className="flex-1 bg-green-600 text-white py-2.5 rounded-lg  hover:bg-green-700 transition danaMed">
                            ادامه سفارش
                        </button>
                    </>
                ) : (
                    <>
                        {/* دکمه افزودن به سبد */}
                        <button 
                        disabled={matchVariant?.stockQuantity === 0}
                        onClick={() => addToCart({
                            _id: product._id,
                            isVariants: isVariants,
                            variantId: matchVariant?._id || null
                        })}
                        className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg  hover:bg-blue-700 transition danaMed disabled:bg-gray-400 flex items-center justify-center gap-2">
                            <FiShoppingCart size={20} />
                            <span>افزودن به سبد</span>
                        </button>

                        {/* دکمه خرید سریع */}
                        <button 
                        disabled={matchVariant?.stockQuantity === 0}
                        className="flex-1 bg-orange-600 text-white py-2.5 rounded-lg  hover:bg-orange-700 transition danaMed disabled:bg-gray-400">
                            ادامه سفارش
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductOptionsMobile;
