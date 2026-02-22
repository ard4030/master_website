"use client"
import { createContext, useState, useEffect } from "react";
import { apiRequest, getOrCreateDeviceId } from "@/utils/functions";
import { toast } from "react-toastify";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState(null);

    // دریافت کارت هنگام mount
    useEffect(() => {
        getCart();
    }, []);


    const createRol = async () => {
        const response = await apiRequest('/bootstrap/init-superadmin', 'POST', {});
        console.log(response);
        
    }

    // useEffect(() => {
    //     createRol();
    // },[])

    const addToCart = async (item) => {
       
        setIsLoading(true);
        const deviceId = getOrCreateDeviceId();
        const cartData = {
            deviceId: deviceId,
            productId: item._id,
            isVariants: item.isVariants,
            variantId: item.variantId,
            quantity: 1
        };

        const response = await apiRequest('/cart/add', 'POST', cartData);

        if (response.success) {
            toast.success('✓ محصول به سبد خرید اضافه شد');
      
            // به روز رسانی سبد خریدی
            // await getCart();
            setCart(response.data.data); // فرض بر این است که پاسخ شامل سبد خریدی به روز شده است
        } else {
            toast.error(response.error);
            // console.error('Cart error:', response.error);
        }
        setIsLoading(false);
    };

    const getCart = async () => {
        setIsLoading(true);
        // دریافت شناسه دستگاه
        const deviceId = getOrCreateDeviceId();
        // درخواست POST به سرور
        const response = await apiRequest('/cart', 'POST', { deviceId });
        if (response.success) {
            setCart(response.data.data);
           
        } else {
            console.error('Cart error:', response.error);
        }
        setIsLoading(false);
    };

    const increaseQuantity = async (productId, variantId = null) => {
        setIsLoading(true);
        const deviceId = getOrCreateDeviceId();
        const cartData = {
            deviceId: deviceId,
            productId: productId,
            variantId: variantId
        };

        const response = await apiRequest('/cart/increase', 'POST', cartData);
        if (response.success) {
            setCart(response.data.data);
            
        } else {
            toast.error(response.error);
            // console.error('Increase error:', response.error);
        }
        setIsLoading(false);
    };

    const decreaseQuantity = async (productId, variantId = null) => {
        setIsLoading(true);
        const deviceId = getOrCreateDeviceId();
        const cartData = {
            deviceId: deviceId,
            productId: productId,
            variantId: variantId
        };

        const response = await apiRequest('/cart/decrease', 'POST', cartData);

        if (response.success) {
            setCart(response.data.data);
          
        } else {
            toast.error(response.error);
            // console.error('Decrease error:', response.error);
        }
        setIsLoading(false);
    };

    return (
        <CartContext.Provider value={{ addToCart, getCart, increaseQuantity, decreaseQuantity, cart, isLoading }}>
            {children}
        </CartContext.Provider>
    );
} 
