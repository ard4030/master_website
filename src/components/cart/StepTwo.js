'use client'

import React, { useState, useContext, useEffect } from 'react'
import { MdAdd } from 'react-icons/md'
import { apiRequest } from '@/utils/functions'
import { toast } from 'react-toastify'
import OrderContext from '@/context/OrderContext'

const StepTwo = () => {
  const { order, setOrder } = useContext(OrderContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // دریافت اطلاعات checkout در ورود به مرحله دوم
  useEffect(() => {
    fetchCheckoutData()
  }, [])

  const fetchCheckoutData = async () => {
    setIsLoading(true)
    const response = await apiRequest('/checkout/data', 'GET')
    if (response.success) {
      const addressList = response.data.data.addresses || []
      const shippingMethodsList = response.data.data.shippingMethods || []
      const paymentGatewaysList = response.data.data.paymentGateways || []

      setOrder({
        ...order,
        addresses: addressList,
        shippingMethods: shippingMethodsList,
        paymentGateways: paymentGatewaysList,
        // انتخاب خودکار اولین آدرس
        address: order.address || (addressList.length > 0 ? addressList[0] : null),
        shippingMethod: order.shippingMethod || (shippingMethodsList.length > 0 ? shippingMethodsList[0] : null),
      })
    } else {
      toast.error(response.error || 'خطا در دریافت اطلاعات')
    }
    setIsLoading(false)
  }
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    city: '',
    postalCode: '',
    fullAddress: '',
  })

  const handleSelectAddress = (addr) => {
    setOrder({ ...order, address: addr })
  }


  const handleSelectShippingMethod = (method) => {
    setOrder({ ...order, shippingMethod: method })
  }

  const handleOpenModal = () => {
    setFormData({
      name: '',
      phone: '',
      state: '',
      city: '',
      postalCode: '',
      fullAddress: '',
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const refreshCheckoutData = async () => {
    const response = await apiRequest('/checkout/data', 'GET')
    if (response.success) {
      const addressList = response.data.data.addresses || []
      const shippingMethodsList = response.data.data.shippingMethods || []
      const paymentGatewaysList = response.data.data.paymentGateways || []
      
      setOrder({
        ...order,
        addresses: addressList,
        shippingMethods: shippingMethodsList,
        paymentGateways: paymentGatewaysList,
      })
    }
  }

  const handleSave = async () => {
    if (!formData.name || !formData.phone || !formData.state || !formData.city || !formData.postalCode || !formData.fullAddress) {
      toast.error('لطفاً تمام فیلدها را پر کنید')
      return
    }

    setIsSaving(true)
    const response = await apiRequest('/addresses', 'POST', formData)
    if (response.success) {
      toast.success('آدرس با موفقیت افزوده شد')
      await refreshCheckoutData()
      handleCloseModal()
    } else {
      toast.error(response.error || 'خطا در افزودن آدرس')
    }
    setIsSaving(false)
  }


  return (
    <div className="bg-white rounded-lg shadow p-6" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl danaBold text-gray-800">انتخاب آدرس تحویل</h2>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg danaBold hover:bg-blue-700 transition-colors"
        >
          <MdAdd size={16} />
          آدرس جدید
        </button>
      </div>

      {order.addresses && order.addresses.length > 0 ? (
        <div className="space-y-3">
          {order.addresses.map((addr) => (
            <label
              key={addr._id || addr.id}
              className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors text-right"
            >
              <input
                type="radio"
                name="address"
                checked={(order.address?._id || order.address?.id) === (addr._id || addr.id)}
                onChange={() => handleSelectAddress(addr)}
                className="w-5 h-5"
              />
              <div className="mr-4 flex-1">
                <h3 className="danaBold text-gray-800">{addr.name}</h3>
                <p className="text-sm text-gray-600 dana mt-1">{addr.phone}</p>
                <p className="text-sm text-gray-600 dana">{addr.state} - {addr.city}</p>
                <p className="text-sm text-gray-600 dana line-clamp-2">{addr.fullAddress}</p>
                <p className="text-xs text-gray-500 dana mt-1">کد پستی: {addr.postalCode}</p>
              </div>
            </label>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 dana mb-4">هیچ آدرسی ثبت نشده است</p>
          <button
            onClick={handleOpenModal}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg danaBold hover:bg-blue-700 transition-colors"
          >
            افزودن آدرس
          </button>
        </div>
      )}

      {/* انتخاب روش ارسال */}
      {order.address && (
        <div className="mt-8">
          <h2 className="text-2xl danaBold text-gray-800 mb-6">انتخاب روش ارسال</h2>
          {order.shippingMethods.length > 0 ? (
            <div className="space-y-3">
              {order.shippingMethods.map((method) => (
                <label
                  key={method._id || method.id}
                  className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors text-right border-2 border-transparent"
                  style={{
                    borderColor: (order.shippingMethod?._id || order.shippingMethod?.id) === (method._id || method.id) ? '#2563eb' : 'transparent',
                  }}
                >
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={(order.shippingMethod?._id || order.shippingMethod?.id) === (method._id || method.id)}
                    onChange={() => handleSelectShippingMethod(method)}
                    className="w-5 h-5"
                  />
                  <div className="mr-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="danaBold text-gray-800">{method.name}</h3>
                      <p className="text-lg danaBold text-blue-600">{method.cost?.toLocaleString('fa-IR')} تومان</p>
                    </div>
                    <p className="text-sm text-gray-600 dana mt-1">زمان تحویل: {method.deliveryTime}</p>
                    {method.description && (
                      <p className="text-sm text-gray-600 dana mt-1">{method.description}</p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600 dana">هیچ روش ارسالی در دسترس نیست</p>
            </div>
          )}
        </div>
      )}

      {/* مدال اضافه آدرس */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir="rtl">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md dana">
            <h2 className="text-2xl danaBold text-gray-900 mb-6 text-right">افزودن آدرس جدید</h2>

            <div className="space-y-4">
              {/* نام آدرس */}
              <div>
                <label className="block text-sm danaMed text-gray-700 mb-2 text-right">نام آدرس</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: خانه، محل کار"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dana text-right"
                />
              </div>

              {/* شماره تماس */}
              <div>
                <label className="block text-sm danaMed text-gray-700 mb-2 text-right">شماره تماس</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="09123456789"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dana text-right"
                />
              </div>

              {/* استان */}
              <div>
                <label className="block text-sm danaMed text-gray-700 mb-2 text-right">استان</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="نام استان"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dana text-right"
                />
              </div>

              {/* شهر */}
              <div>
                <label className="block text-sm danaMed text-gray-700 mb-2 text-right">شهر</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="نام شهر"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dana text-right"
                />
              </div>

              {/* کد پستی */}
              <div>
                <label className="block text-sm danaMed text-gray-700 mb-2 text-right">کد پستی</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="کد پستی"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dana text-right"
                />
              </div>

              {/* آدرس کامل */}
              <div>
                <label className="block text-sm danaMed text-gray-700 mb-2 text-right">آدرس کامل</label>
                <textarea
                  value={formData.fullAddress}
                  onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                  placeholder="آدرس کامل تحویل"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dana text-right"
                />
              </div>
            </div>

            {/* دکمه‌ها */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleCloseModal}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors danaBold"
              >
                لغو
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors danaBold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'درحال ذخیره...' : 'افزودن'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StepTwo
