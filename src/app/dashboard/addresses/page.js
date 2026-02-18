'use client'

import React, { useState, useEffect } from 'react'
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md'
import { apiRequest } from '@/utils/functions'
import { toast } from 'react-toastify'

const AddressesPage = () => {
  const [addresses, setAddresses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    city: '',
    postalCode: '',
    fullAddress: '',
  })

  // دریافت آدرس‌ها
  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    setIsLoading(true)
    const response = await apiRequest('/addresses', 'GET')
    if (response.success) {
      setAddresses(response.data.addresses || [])
    } else {
      toast.error(response.error || 'خطا در دریافت آدرس‌ها')
    }
    setIsLoading(false)
  }

  const handleOpenModal = (address = null) => {
    if (address) {
      setEditingId(address._id || address.id)
      setFormData({
        name: address.name || '',
        phone: address.phone || '',
        state: address.state || '',
        city: address.city || '',
        postalCode: address.postalCode || '',
        fullAddress: address.fullAddress || '',
      })
    } else {
      setEditingId(null)
      setFormData({
        name: '',
        phone: '',
        state: '',
        city: '',
        postalCode: '',
        fullAddress: '',
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleSave = async () => {
    // بررسی فیلدهای خالی
    if (!formData.name || !formData.phone || !formData.state || !formData.city || !formData.postalCode || !formData.fullAddress) {
      toast.error('لطفاً تمام فیلدها را پر کنید')
      return
    }

    setIsSaving(true)

    if (editingId) {
      // ویرایش
      const response = await apiRequest(`/addresses/${editingId}`, 'PUT', formData)
      if (response.success) {
        toast.success('آدرس با موفقیت ویرایش شد')
        fetchAddresses()
        handleCloseModal()
      } else {
        toast.error(response.error || 'خطا در ویرایش آدرس')
      }
    } else {
      // ایجاد
      const response = await apiRequest('/addresses', 'POST', formData)
      if (response.success) {
        toast.success('آدرس با موفقیت افزوده شد')
        fetchAddresses()
        handleCloseModal()
      } else {
        toast.error(response.error || 'خطا در افزودن آدرس')
      }
    }

    setIsSaving(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('آیا مطمئن هستید؟')) return

    const response = await apiRequest(`/addresses/${id}`, 'DELETE')
    if (response.success) {
      toast.success('آدرس با موفقیت حذف شد')
      fetchAddresses()
    } else {
      toast.error(response.error || 'خطا در حذف آدرس')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 dana" dir="rtl">
      <div className="max-w-5xl mx-auto">
        {/* هدر */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl danaBold text-gray-900">آدرس‌های من</h1>
            <p className="text-gray-600 dana mt-1">مدیریت آدرس‌های تحویل</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg danaBold hover:bg-blue-700 transition-colors"
          >
            <MdAdd size={20} />
            آدرس جدید
          </button>
        </div>

        {/* حالت بارگذاری */}
        {isLoading ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg dana">درحال بارگذاری...</p>
          </div>
        ) : addresses.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {addresses.map((address) => (
              <div
                key={address._id || address.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 border-r-4 border-blue-600"
              >
                {/* عنوان */}
                <h2 className="text-lg danaBold text-gray-900 mb-2">{address.name}</h2>

                {/* اطلاعات مختصر */}
                <div className="space-y-1 mb-4 text-sm text-gray-600 dana">
                  <p className="text-gray-700 danaMed">{address.phone}</p>
                  <p>{address.state} - {address.city}</p>
                  <p className="line-clamp-2">{address.fullAddress}</p>
                  <p className="text-gray-500">کد پستی: {address.postalCode}</p>
                </div>

                {/* دکمه‌های عملیات */}
                <div className="flex items-center gap-2 pt-3 border-t">
                  <button
                    onClick={() => handleOpenModal(address)}
                    className="flex-1 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors dana text-sm flex items-center justify-center gap-1"
                  >
                    <MdEdit size={16} />
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(address._id || address.id)}
                    className="flex-1 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors dana text-sm flex items-center justify-center gap-1"
                  >
                    <MdDelete size={16} />
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg dana">هیچ آدرسی ثبت نشده است</p>
            <button
              onClick={() => handleOpenModal()}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg danaBold hover:bg-blue-700 transition-colors"
            >
              افزودن آدرس
            </button>
          </div>
        )}
      </div>

      {/* مدال اضافه/ویرایش */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir="rtl">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md dana">
            <h2 className="text-2xl danaBold text-gray-900 mb-6 text-right">
              {editingId ? 'ویرایش آدرس' : 'افزودن آدرس جدید'}
            </h2>

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
                {isSaving ? 'درحال ذخیره...' : (editingId ? 'ذخیره' : 'افزودن')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddressesPage
