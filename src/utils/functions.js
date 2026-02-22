/**
 * تابع درخواست API
 * برای ارسال درخواست
 */

// پایه URL - این مقدار را تغیر دهید
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

/**
 * ارسال درخواست API
 * @param {string} endpoint - نقطه انجام API (مثال: '/themes')
 * @param {string} method - روش HTTP (GET, POST, PUT, DELETE و غیره)
 * @param {object} data - داده های درخواست (برای POST/PUT)
 * @returns {Promise} وعده پاسخ
 */
export const apiRequest = async (endpoint, method = 'GET', data = null) => {
  try {
    // تشکیل URL کامل
    const url = `${BASE_URL}${endpoint}`

    // تنظیمات درخواست
    const config = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ارسال خودکار کوکی‌ها
    }

    // اگر داده وجود دارد، آن را به بدنه اضافه کنید
    if (data && (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT' || method.toUpperCase() === 'PATCH')) {
      config.body = JSON.stringify(data)
    }

    // ارسال درخواست
    const response = await fetch(url, config)

    // بررسی پاسخ
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `خطا: ${response.status}`)
    }

    // بازگرداندن نتیجه
    const result = await response.json()
    return {
      success: true,
      data: result,
      status: response.status
    }
  } catch (error) {
    // console.error('خطا در درخواست API:', error)
    return {
      success: false,
      error: error.message,
      data: null
    }
  }
}



/**
 * دریافت یا ایجاد شناسه دستگاه
 * اگر دستگاه قبلا شناسایی شده باشد، از localStorage بخواند
 * اگر نه، یک شناسه جدید ایجاد، ذخیره و برگرداند
 * @returns {string} شناسه دستگاه
 */
export const getOrCreateDeviceId = () => {
  const DEVICE_ID_KEY = 'mastershop_device_id'
  
  try {
    // سعی برای خواندن از localStorage
    if (typeof window !== 'undefined') {
      let deviceId = localStorage.getItem(DEVICE_ID_KEY)
      
      // اگر موجود نیست، ایجاد کنید
      if (!deviceId) {
        // ایجاد UUID (شناسه منحصر به فرد)
        deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
        
        // ذخیره در localStorage
        localStorage.setItem(DEVICE_ID_KEY, deviceId)
      }
      
      return deviceId
    }
  } catch (error) {
    console.warn('خطا در دسترسی به localStorage:', error)
    // fallback - شناسه موقتی
    return 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }
}

/**
 * دریافت سبد خریدی
 * @returns {Promise} وعده سبد خریدی
 */
export const getCart = async () => {
  try {
    const deviceId = getOrCreateDeviceId()
    
    const response = await apiRequest('/cart', 'POST', { deviceId })
    
    return response
  } catch (error) {
    console.error('خطا در دریافت سبد خریدی:', error)
    return {
      success: false,
      error: error.message,
      data: null
    }
  }
}

export const isCart = ({productId, variantId, items,isVariants}) => {
  // console.log('Checking cart for productId:', productId, 'variantId:', variantId, 'items:', items)
  // console.log("isVariant",isVariants)
  if (!items || items.length === 0) return false;
  let item ;
  if(isVariants){
    item = items.find(i => String(i.productId) === String(productId) && String(i?.variantId) === String(variantId));
  }else{
    item = items.find(i => String(i.productId) === String(productId) && !i.variantId);
  } 

  // console.log("item ",item)

  return item;
}

export default apiRequest
