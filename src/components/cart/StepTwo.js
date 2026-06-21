'use client'

import React, { useState, useContext, useEffect, useRef } from 'react'
import {
  FiArrowLeft,
  FiChevronLeft,
  FiMapPin,
  FiTruck,
  FiCheck,
  FiShoppingCart,
  FiCreditCard,
  FiChevronDown,
  FiPlus,
  FiEdit2,
  FiTrash2,
} from 'react-icons/fi'
import { apiRequest } from '@/utils/functions'
// import { toast } from 'react-toastify'
import { toast } from 'sonner'

import OrderContext from '@/context/OrderContext'
import { CartContext } from '@/context/CartContext'
import { MerchantContext } from '@/context/MerchantContext'
import { AnimatePresence, motion } from 'framer-motion'
import CircularProgress from '@mui/material/CircularProgress'
import ModalLayout from '@/components/global/ModalLayout/ModalLayout'
import SelectMap from '@/components/cart/map/SelectMap'
import AddAddressButton from '@/components/cart/AddAddressButton'

const IMAGE_BASE = process.env.NEXT_PUBLIC_LIARA_IMAGE_URL || ''
const SHIPPING_TYPES = [
  {
    name: 'withPost',
    faName: 'پست پیشتاز',
    desc: 'تحویل ۳ تا ۵ روز کاری',
    image: '/assets/images/shiping/post.webp',
    accent: 'amber',
  },
  {
    name: 'withTipax',
    faName: 'تیپاکس',
    desc: 'تحویل سریع ۲ تا ۴ روز کاری',
    image: '/assets/images/shiping/tipax.png',
    accent: 'red',
  },
  {
    name: 'withTrucking',
    faName: 'باربری',
    desc: 'مناسب برای بارهای حجیم و سنگین',
    image: '/assets/images/shiping/trucking.png',
    accent: 'blue',
  },
]
const StepTwo = ({ onContinue, onBack }) => {
  const { order, setOrder } = useContext(OrderContext)
  const { cart, setCart } = useContext(CartContext)
  const { activeMerchant } = useContext(MerchantContext) || {}

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddressListOpen, setIsAddressListOpen] = useState(true)
  const [loadingShippingKey, setLoadingShippingKey] = useState(null)
  const [editingAddressId, setEditingAddressId] = useState(null)
  const [deletingAddressId, setDeletingAddressId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    city: '',
    postalCode: '',
    fullAddress: '',
    lat: undefined,
    lng: undefined,
  })

  useEffect(() => {
    fetchCheckoutData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCheckoutData = async () => {
    setIsLoading(true)
    const response = await apiRequest('/checkout/data', 'GET')
    if (response.success) {
      const addressList = response.data.data.addresses || []
      const paymentGatewaysList = response.data.data.paymentGateways || [];
      const shipingTypes = response.data.data.shippingMethods || []
      
      setOrder({
        ...order,
        addresses: addressList,
        paymentGateways: paymentGatewaysList,
        address: order.address || (addressList.length > 0 ? addressList[0] : null),
        shippingMethod: order.shippingMethod || null,
        shipingTypes: shipingTypes,
      })
    } else {
      toast.error(response.error || 'خطا در دریافت اطلاعات')
    }
    setIsLoading(false)
  }

  const refreshCheckoutData = async ({ forceAddressId } = {}) => {
    const response = await apiRequest('/checkout/data', 'GET')
    if (response.success) {
      const addressList = response.data.data.addresses || []
      const paymentGatewaysList = response.data.data.paymentGateways || []

      const forcedAddress = forceAddressId
        ? addressList.find((addr) => (addr._id || addr.id) === forceAddressId)
        : null

      setOrder((prev) => ({
        ...prev,
        addresses: addressList,
        paymentGateways: paymentGatewaysList,
        address: forcedAddress || prev.address || (addressList[0] ?? null),
      }))
    }
  }

  const handleSelectAddress = (addr) => {
    setOrder((prev) => ({ ...prev, address: addr }))
  }

  const handleSelectShippingMethod = (methodKey) => {
    const method = SHIPPING_TYPES.find((item) => item.name === methodKey)
    if (!method) return

    setLoadingShippingKey(methodKey)
    setOrder((prev) => ({
      ...prev,
      shippingMethod: {
        slug: method.name,
        name: method.name,
        faName: method.faName,
        image: method.image,
      },
    }))
    setLoadingShippingKey(null)
  }

  const getAddressId = (addr) => addr?._id || addr?.id

  const handleOpenModal = (addr = null) => {
    const isEditing = Boolean(addr)
    setEditingAddressId(isEditing ? getAddressId(addr) : null)
    setFormData(
      isEditing
        ? {
            name: addr?.name || '',
            phone: addr?.phone || '',
            state: addr?.state || '',
            city: addr?.city || '',
            postalCode: addr?.postalCode || '',
            fullAddress: addr?.fullAddress || '',
            lat: addr?.lat,
            lng: addr?.lng ?? addr?.long,
          }
        : {
            name: '',
            phone: '',
            state: '',
            city: '',
            postalCode: '',
            fullAddress: '',
            lat: undefined,
            lng: undefined,
          }
    )
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingAddressId(null)
  }

  const handleSave = async () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.state ||
      !formData.city ||
      !formData.postalCode ||
      !formData.fullAddress
    ) {
      toast.error('لطفاً تمام فیلدها را پر کنید')
      return
    }
    setIsSaving(true)
    const endpoint = editingAddressId
      ? `/addresses/${editingAddressId}`
      : '/addresses'
    const method = editingAddressId ? 'PUT' : 'POST'
    const payload = {
      ...formData,
      long: formData?.lng ?? formData?.long,
    }
    delete payload.lng

    const response = await apiRequest(endpoint, method, payload)
    if (response.success) {
      const createdAddressId =
        response?.data?.data?._id ||
        response?.data?.data?.id ||
        editingAddressId ||
        null
      toast.success(
        editingAddressId
          ? 'آدرس با موفقیت ویرایش شد'
          : 'آدرس با موفقیت افزوده شد'
      )
      await refreshCheckoutData({ forceAddressId: createdAddressId })
      setIsAddressListOpen(true)
      handleCloseModal()
    } else {
      toast.error(
        response.error ||
          (editingAddressId ? 'خطا در ویرایش آدرس' : 'خطا در افزودن آدرس')
      )
    }
    setIsSaving(false)
  }

  const handleDeleteAddress = async (addr) => {
    const addressId = getAddressId(addr)
    if (!addressId) return

    const confirmed = window.confirm('از حذف این آدرس مطمئن هستید؟')
    if (!confirmed) return

    setDeletingAddressId(addressId)
    const response = await apiRequest(`/addresses/${addressId}`, 'DELETE')
    if (response.success) {
      toast.success('آدرس با موفقیت حذف شد')
      await refreshCheckoutData()
    } else {
      toast.error(response.error || 'خطا در حذف آدرس')
    }
    setDeletingAddressId(null)
  }

  // ===== محاسبات سامری =====
  const items = cart?.items || []
  const subtotal = items.reduce(
    (acc, it) => acc + (Number(it.price) || 0) * (it.quantity || 1),
    0
  )
  const productsDiscount = Number(cart?.productsDiscount) || 0
  const shippingPrice = Number(order?.shippingMethod?.price ?? cart?.shippingTotal) || 0
  const finalTotal =
    Number(cart?.totalAmount) || subtotal - productsDiscount + shippingPrice
  const isFreeShipping = shippingPrice === 0
  const canContinue = Boolean(order?.address && order?.shippingMethod)

  console.log('',activeMerchant);
  
  const merchantName =
    activeMerchant?.merchant?.storeName || activeMerchant?.name || 'فروشگاه'
  const merchantCity = 'شهر فروشنده'

  // ===== رندر =====
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 dana pb-[calc(148px+env(safe-area-inset-bottom))] lg:pb-0" dir="rtl">
      {/* ============ ستون راست ============ */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {/* هدر مرحله */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="danaBold text-gray-800 text-base">آدرس و روش ارسال</h2>
            <button
              type="button"
              onClick={() => onBack?.()}
              className="text-gray-500 hover:text-orange-500 transition-colors"
              aria-label="بازگشت"
            >
              <FiArrowLeft size={18} />
            </button>
          </div>

          {/* استپر کوچک */}
          <div className="px-5 pb-5">
            <MiniStepper currentKey="address" />
          </div>
        </div>

        {/* کارت آدرس */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <CircularProgress size={26} sx={{ color: '#f97316' }} />
            </div>
          ) : !order?.address ? (
            <div className="text-center py-6">
              <p className="text-gray-600 text-sm mb-4">هیچ آدرسی ثبت نشده است</p>
              <AddAddressButton onClick={handleOpenModal} />
            </div>
          ) : (
            <>
              {/* آدرس انتخاب‌شده */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 mb-2">
                    ارسال به{' '}
                    <span className="text-gray-800 danaBold">
                      {order.address.name}
                    </span>
                  </p>
                  <p className="text-sm danaBold text-gray-900 flex items-start gap-1.5 leading-7">
                    <FiTruck className="text-gray-400 mt-1 shrink-0" size={16} />
                    <span>
                      {order.address.state} - {order.address.city} - {order.address.fullAddress}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-2">
                    <FiMapPin size={13} />
                    موقعیت مکانی نداره!
                  </p>
                </div>
              </div>

              {/* تغییر آدرس */}
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => setIsAddressListOpen((v) => !v)}
                  className="flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 danaMed transition-colors"
                >
                  {isAddressListOpen ? 'بستن' : 'تغییر آدرس'}
                  <FiChevronLeft size={15} />
                </button>
              </div>

              {/* لیست آدرس‌ها */}
              <AnimatePresence initial={false}>
                {isAddressListOpen && (
                  <motion.div
                    key="address-list"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-dashed border-gray-200 space-y-2">
                      {order.addresses?.map((addr, index) => {
                        const selected =
                          (order.address?._id || order.address?.id) ===
                          (addr._id || addr.id)
                        return (
                          <label
                            key={`addr-${addr?._id || addr?.id || 'no-id'}-${index}`}
                            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer border transition-colors ${
                              selected
                                ? 'border-orange-400 bg-orange-50/60'
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="address"
                              checked={selected}
                              onChange={() => handleSelectAddress(addr)}
                              className="mt-1 accent-orange-500"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="danaBold text-sm text-gray-800">
                                {addr.name}
                              </h3>
                              <p className="text-xs text-gray-500 mt-0.5">{addr.phone}</p>
                              <p className="text-xs text-gray-600 mt-1 leading-5">
                                {addr.state} - {addr.city} - {addr.fullAddress}
                              </p>
                              <p className="text-[11px] text-gray-400 mt-1">
                                کد پستی: {addr.postalCode}
                              </p>
                              <div className="mt-3 flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    handleOpenModal(addr)
                                  }}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                  <FiEdit2 size={13} />
                                  ویرایش
                                </button>
                                <button
                                  type="button"
                                  disabled={deletingAddressId === (addr._id || addr.id)}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    handleDeleteAddress(addr)
                                  }}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border border-red-200 text-red-500 hover:bg-red-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                  {deletingAddressId === (addr._id || addr.id) ? (
                                    <CircularProgress
                                      size={12}
                                      thickness={6}
                                      sx={{ color: '#ef4444' }}
                                    />
                                  ) : (
                                    <FiTrash2 size={13} />
                                  )}
                                  حذف
                                </button>
                              </div>
                            </div>
                          </label>
                        )
                      })}

                      {/* <AddAddressButton
                        onClick={handleOpenModal}
                        fullWidth
                        label="افزودن آدرس جدید"
                        className="mt-2"
                      /> */}
                    </div>
                  </motion.div>
                )}
                <div key="address-add-btn" className="w-full text-center mt-6">
                  <AddAddressButton onClick={handleOpenModal} label="افزودن آدرس جدید" />
                </div>

              </AnimatePresence>
            </>
          )}
        </div>

        {/* کارت غرفه + روش ارسال */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* هدر غرفه */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                  <FiTruck size={15} />
                </span>
                <span className="danaBold text-sm text-gray-800">سرویس‌های ارسال</span>
              </div>
              <span className="text-xs text-gray-500">
                ارسال از: <span className="text-gray-700 danaMed">{merchantCity}</span>
              </span>
            </div>

            {/* روش‌های ارسال */}
            <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SHIPPING_TYPES.map((shippingType) => {
                const key = shippingType?.name
                const isSelected = order?.shippingMethod?.slug === key
                const isMethodLoading = loadingShippingKey === key

                return (
                  <ShippingCard
                    key={key}
                    method={shippingType}
                    selected={isSelected}
                    loading={isMethodLoading}
                    disabled={!!loadingShippingKey && !isMethodLoading}
                    onSelect={() => handleSelectShippingMethod(key)}
                  />
                )
              })}
              {SHIPPING_TYPES.length === 0 && (
                <div className="col-span-full text-center text-sm text-gray-500 py-4">
                  در حال حاضر روش ارسالی برای این سفارش ثبت نشده است
                </div>
              )}
            </div>
        </div>
      </div>

      {/* ============ ستون چپ: جزئیات قیمت ============ */}
      <aside className="hidden lg:block lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 lg:sticky lg:top-4">
          <h3 className="danaBold text-gray-800 text-base mb-4 text-left">
            جزئیات قیمت
          </h3>

          <div className="space-y-3 text-sm">
            <Row label="مجموع قیمت محصولات" value={subtotal} suffix="تومان" />
            <Row
              label="تخفیف محصولات"
              value={productsDiscount}
              suffix="تومان"
              valueClass="text-red-500"
              prefix={productsDiscount > 0 ? '-' : ''}
            />
            <div className="flex items-center justify-between pt-3 border-t border-dashed border-gray-200">
              <span className="text-gray-600">هزینه ارسال</span>
              {isFreeShipping ? (
                <span className="danaBold text-green-600">رایگان</span>
              ) : (
                <span className="danaMed text-gray-800">
                  {Math.floor(shippingPrice).toLocaleString('fa-IR')}
                  <span className="text-xs text-gray-500 mr-1">تومان</span>
                </span>
              )}
            </div>
          </div>

          <div className="border-t border-dashed border-gray-200 mt-5 pt-4 flex items-center justify-between">
            <span className="danaBold text-gray-800 text-sm">مبلغ قابل پرداخت</span>
            <span className="danaBold text-gray-900">
              {Math.floor(finalTotal).toLocaleString('fa-IR')}
              <span className="text-xs text-gray-500 danaMed mr-1">تومان</span>
            </span>
          </div>

          <button
            onClick={() => onContinue?.()}
            disabled={!canContinue}
            className="mt-5 w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white py-3 rounded-lg danaBold text-sm transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-orange-500"
          >
            تایید و ادامه
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 shadow-[0_-6px_18px_rgba(15,23,42,0.12)]">
        <details className="group mb-3 rounded-lg border border-gray-200 bg-gray-50/70">
          <summary className="list-none cursor-pointer px-3 py-2.5 flex items-center justify-between text-sm text-gray-700 danaMed">
            <span>مشاهده جزئیات روش ارسال</span>
            <span className="transition-transform group-open:rotate-180">⌄</span>
          </summary>
          <div className="px-3 pb-3 pt-1 border-t border-gray-200 space-y-2 text-sm">
            <Row label="مجموع قیمت محصولات" value={subtotal} suffix="تومان" />
            <Row
              label="تخفیف محصولات"
              value={productsDiscount}
              suffix="تومان"
              valueClass="text-red-500"
              prefix={productsDiscount > 0 ? '-' : ''}
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-gray-600">هزینه ارسال</span>
              {isFreeShipping ? (
                <span className="danaBold text-green-600">رایگان</span>
              ) : (
                <span className="danaMed text-gray-800">
                  {Math.floor(shippingPrice).toLocaleString('fa-IR')}
                  <span className="text-xs text-gray-500 mr-1">تومان</span>
                </span>
              )}
            </div>
          </div>
        </details>

        <div className="flex items-center justify-between gap-3">
          <div className="text-right">
            <p className="text-xs text-gray-500 danaMed">جمع مبلغ پرداختنی:</p>
            <p className="danaBold text-gray-900 text-xl leading-7">
              {Math.floor(finalTotal).toLocaleString('fa-IR')}
              <span className="text-xs text-gray-500 danaMed mr-1">تومان</span>
            </p>
          </div>

          <button
            onClick={() => onContinue?.()}
            disabled={!canContinue}
            className="min-w-42 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl danaBold text-sm transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            تایید و ادامه
          </button>
        </div>
      </div>

      {/* ============ مدال افزودن آدرس ============ */}
      <ModalLayout
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        widthModal={520}
      >
        <AddressFormModal
          formData={formData}
          setFormData={setFormData}
          isEditMode={Boolean(editingAddressId)}
          onCancel={handleCloseModal}
          onSave={handleSave}
          isSaving={isSaving}
        />
      </ModalLayout>
    </div>
  )
}

// ===== Sub components =====

const ACCENT_MAP = {
  amber: {
    ring: 'ring-amber-300',
    border: 'border-amber-400',
    bg: 'bg-amber-50/60',
    icon: 'text-amber-500 bg-amber-50',
    dot: 'bg-amber-500',
  },
  red: {
    ring: 'ring-red-300',
    border: 'border-red-400',
    bg: 'bg-red-50/60',
    icon: 'text-red-500 bg-red-50',
    dot: 'bg-red-500',
  },
  blue: {
    ring: 'ring-blue-300',
    border: 'border-blue-400',
    bg: 'bg-blue-50/60',
    icon: 'text-blue-500 bg-blue-50',
    dot: 'bg-blue-500',
  },
}

const ShippingCard = ({ method, selected, loading, disabled, onSelect }) => {
  const [imgError, setImgError] = useState(false)
  const accent = ACCENT_MAP[method.accent] || ACCENT_MAP.amber

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`group relative flex flex-col items-center text-center rounded-2xl border bg-white px-4 pt-6 pb-5 min-h-45 transition-all overflow-hidden focus:outline-none ${
        selected
          ? `${accent.border} ring-2 ${accent.ring}/40 shadow-md ${accent.bg}`
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer active:scale-[0.99]'}`}
    >
      {/* بج انتخاب گوشه */}
      <span
        className={`absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
          selected
            ? 'bg-orange-500 text-white scale-100 shadow-sm'
            : 'bg-gray-100 text-transparent scale-90 group-hover:scale-100 group-hover:bg-gray-200'
        }`}
      >
        {loading ? (
          <CircularProgress size={14} thickness={6} sx={{ color: '#fff' }} />
        ) : (
          <FiCheck size={15} />
        )}
      </span>

      {/* لوگو وسط بالا */}
      <div
        className={`shrink-0 w-30 h-30 rounded-2xl border flex items-center justify-center overflow-hidden mb-3 transition-colors ${
          selected ? 'border-transparent bg-white shadow-sm' : 'border-gray-100 bg-gray-50/60'
        } ${imgError ? accent.icon : ''}`}
      >
        {imgError ? (
          <FiTruck size={30} />
        ) : (
          <img
            src={method.image}
            alt={method.faName}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-2"
          />
        )}
      </div>

      {/* عنوان */}
      <div className="flex items-center justify-center gap-1.5 mb-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
        <h3 className="danaBold text-sm sm:text-base text-gray-800">
          {method.faName}
        </h3>
      </div>

      {/* توضیح */}
      <p className="text-[11px] sm:text-xs text-gray-500 leading-5 max-w-50">
        {method.desc}
      </p>
    </button>
  )
}

const Row = ({ label, value, suffix, valueClass = 'text-gray-800', prefix = '' }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-600">{label}</span>
    <span className={`danaMed ${valueClass}`}>
      {prefix}
      {Math.floor(Number(value) || 0).toLocaleString('fa-IR')}
      <span className="text-xs text-gray-500 mr-1">{suffix}</span>
    </span>
  </div>
)

const Field = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div>
    <label className="block text-sm danaMed text-gray-700 mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 dana text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
    />
  </div>
)

// ====== مدال افزودن آدرس (ایده گرفته از طرح ارائه‌شده) ======
const STATES_API = 'https://iran-locations-api.vercel.app/api/v1/fa/states'
const CITIES_API = 'https://iran-locations-api.vercel.app/api/v1/fa/cities'

const AddressFormModal = ({
  formData,
  setFormData,
  onCancel,
  onSave,
  isSaving,
  isEditMode,
}) => {
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)
  const [statesLoadError, setStatesLoadError] = useState(false)
  const [citiesLoadError, setCitiesLoadError] = useState(false)
  const [isMapOpen, setIsMapOpen] = useState(false)

  // دریافت موقعیت از نقشه و پر کردن فیلدها
  const handleMapConfirm = (picked) => {
    if (!picked) return
    setFormData({
      ...formData,
      state: picked.state || formData.state,
      city: picked.city || formData.city,
      fullAddress: picked.address || formData.fullAddress,
      lat: picked.lat,
      lng: picked.lng,
    })
  }

  // واکشی استان‌ها
  useEffect(() => {
    let cancelled = false
    const fetchStates = async () => {
      try {
        setLoadingStates(true)
        setStatesLoadError(false)
        const res = await fetch(STATES_API)
        const data = await res.json()
        if (cancelled) return
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.states)
          ? data.states
          : Array.isArray(data?.data)
          ? data.data
          : []
        setStates(
          list
            .map((s) => (typeof s === 'string' ? s : s?.name || s?.state || ''))
            .filter(Boolean)
        )
      } catch {
        if (!cancelled) {
          setStatesLoadError(true)
          toast.error('خطا در دریافت لیست استان‌ها، لطفا استان را دستی وارد کنید')
        }
      } finally {
        if (!cancelled) setLoadingStates(false)
      }
    }
    fetchStates()
    return () => {
      cancelled = true
    }
  }, [])

  // واکشی شهرها وقتی استان تغییر کرد
  useEffect(() => {
    if (!formData.state) {
      setCities([])
      setCitiesLoadError(false)
      return
    }
    const fetchCities = async () => {
      try {
        setLoadingCities(true)
        setCitiesLoadError(false)
        const res = await fetch(
          `${CITIES_API}?state=${encodeURIComponent(formData.state)}`
        )
        const data = await res.json()
        const list = Array.isArray(data)
          ? data.flatMap((item) => item?.cities || [])
          : data?.cities || []
        setCities(list.map((c) => c.name).filter(Boolean))
      } catch {
        setCitiesLoadError(true)
        setCities([])
        toast.error('خطا در دریافت لیست شهرها، لطفا شهر را دستی وارد کنید')
      } finally {
        setLoadingCities(false)
      }
    }
    fetchCities()
  }, [formData.state])

  const nameMax = 96
  const addressMax = 1000

  return (
    <div
      className="w-full bg-white rounded-xl flex flex-col h-full md:h-auto md:max-h-[85vh]"
      dir="rtl"
    >
      {/* هدر فیکس */}
      <div className="shrink-0 flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 bg-white rounded-t-xl">
        <h2 className="danaBold text-gray-900 text-sm sm:text-base">آدرس خود را وارد کنید</h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          aria-label="بستن"
        >
          ×
        </button>
      </div>

      {/* بدنه اسکرول */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-5 py-4 space-y-4 overscroll-contain">
        {/* نقشه placeholder */}
        <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden border border-gray-200 bg-[#e8f5e9] select-none">
          {/* الگوی خطوط شبیه نقشه */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                'linear-gradient(white 2px, transparent 2px), linear-gradient(90deg, white 2px, transparent 2px), radial-gradient(circle at 30% 60%, #c8e6c9 0 60px, transparent 61px)',
              backgroundSize: '60px 60px, 60px 60px, 100% 100%',
            }}
          />
          {/* پین وسط */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <div className="w-14 h-14 bg-orange-500 rounded-full rounded-bl-none flex items-center justify-center text-white shadow-lg rotate-45">
                <FiPlus className="-rotate-45" size={24} />
              </div>
            </div>
          </div>
          {/* دکمه افزودن موقعیت */}
          <button
            type="button"
            onClick={() => setIsMapOpen(true)}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white border border-orange-400 text-orange-500 hover:bg-orange-50 rounded-lg px-3 py-1.5 text-xs danaBold shadow-sm transition-colors"
          >
            <FiMapPin size={14} />
            {formData.lat ? 'تغییر موقعیت روی نقشه' : 'افزودن موقعیت مکانی روی نقشه'}
          </button>
        </div>

        {/* نام */}
        <CountedField
          label="نام و نام خانوادگی تحویل گیرنده"
          required
          max={nameMax}
          value={formData.name}
          onChange={(v) => setFormData({ ...formData, name: v })}
        />

        {/* شماره تماس */}
        <Field
          label="شماره تماس تحویل گیرنده"
          type="tel"
          placeholder="09xxxxxxxxx"
          value={formData.phone}
          onChange={(v) => setFormData({ ...formData, phone: v })}
        />

        {/* استان و شهر */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {statesLoadError ? (
            <Field
              label="استان"
              placeholder="نام استان را وارد کنید"
              value={formData.state}
              onChange={(v) => setFormData({ ...formData, state: v, city: '' })}
            />
          ) : (
            <Dropdown
              label="استان"
              required
              placeholder="انتخاب استان"
              value={formData.state}
              options={states}
              loading={loadingStates}
              onChange={(v) =>
                setFormData({ ...formData, state: v, city: '' })
              }
            />
          )}

          {citiesLoadError ? (
            <Field
              label="شهر"
              placeholder="نام شهر را وارد کنید"
              value={formData.city}
              onChange={(v) => setFormData({ ...formData, city: v })}
            />
          ) : (
            <Dropdown
              label="شهر"
              required
              placeholder={formData.state ? 'انتخاب شهر' : 'ابتدا استان را انتخاب کنید'}
              value={formData.city}
              options={cities}
              loading={loadingCities}
              disabled={!formData.state}
              onChange={(v) => setFormData({ ...formData, city: v })}
            />
          )}
        </div>

        {/* کد پستی */}
        <Field
          label="کد پستی"
          placeholder="کد پستی ۱۰ رقمی"
          value={formData.postalCode}
          onChange={(v) => setFormData({ ...formData, postalCode: v })}
        />

        {/* آدرس کامل */}
        <CountedField
          label="آدرس دقیق پستی"
          required
          max={addressMax}
          textarea
          rows={4}
          placeholder="آدرس"
          value={formData.fullAddress}
          onChange={(v) => setFormData({ ...formData, fullAddress: v })}
        />
      </div>

      {/* فوتر فیکس */}
      <div className="shrink-0 flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 border-t border-gray-100 bg-gray-50/80 rounded-b-xl">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors danaBold text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSaving ? (
            <CircularProgress size={18} thickness={5} sx={{ color: '#fff' }} />
          ) : (
            isEditMode ? 'ذخیره تغییرات' : 'ثبت آدرس'
          )}
        </button>
        <button
          onClick={onCancel}
          className="py-2.5 px-4 sm:px-6 border border-orange-400 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors danaBold text-sm shrink-0"
        >
          انصراف
        </button>
      </div>

      {/* مدال انتخاب موقعیت روی نقشه */}
      <SelectMap
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onConfirm={handleMapConfirm}
        initialPosition={
          formData.lat && formData.lng
            ? [Number(formData.lat), Number(formData.lng)]
            : undefined
        }
      />
    </div>
  )
}

// فیلد همراه شمارنده‌ی کاراکتر (شبیه طرح: «X کاراکتر» در گوشه)
const CountedField = ({
  label,
  value,
  onChange,
  placeholder,
  max,
  required,
  textarea,
  rows = 3,
}) => {
  const remaining = Math.max(0, max - (value?.length || 0))
  const InputTag = textarea ? 'textarea' : 'input'
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm danaMed text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <span className="text-[11px] text-gray-400 danaMed">
          {remaining.toLocaleString('fa-IR')} کاراکتر
        </span>
      </div>
      <InputTag
        value={value}
        rows={textarea ? rows : undefined}
        maxLength={max}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition ${
          textarea ? 'resize-none' : ''
        }`}
      />
    </div>
  )
}

// دراپ‌داون ساده
const Dropdown = ({
  label,
  value,
  options = [],
  onChange,
  placeholder,
  loading,
  disabled,
  required,
}) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = query
    ? options.filter((o) => o?.toString().includes(query))
    : options

  return (
    <div ref={ref} className="relative dana">
      <label className="block text-sm danaMed text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-sm dana border rounded-lg transition ${
          open
            ? 'border-orange-400 ring-2 ring-orange-100'
            : 'border-gray-200 hover:border-gray-300'
        } disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed`}
      >
        <span className={value ? 'text-gray-800 danaBold' : 'text-gray-400'}>
          {value || placeholder}
        </span>
        {loading ? (
          <CircularProgress size={12} thickness={5} sx={{ color: '#9ca3af' }} />
        ) : (
          <FiChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      <AnimatePresence>
        {open && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-2 border-b border-gray-100">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجو..."
                className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-orange-300"
              />
            </div>
            <ul className="max-h-52 overflow-y-auto text-sm">
              {loading ? (
                <li className="px-3 py-4 text-center text-gray-400">
                  <CircularProgress size={16} thickness={5} sx={{ color: '#f97316' }} />
                </li>
              ) : filtered.length === 0 ? (
                <li className="px-3 py-3 text-center text-gray-400 text-xs">
                  موردی یافت نشد
                </li>
              ) : (
                filtered.map((opt, index) => (
                  <li
                    key={`opt-${String(opt ?? 'empty')}-${index}`}
                    onClick={() => {
                      onChange(opt)
                      setOpen(false)
                      setQuery('')
                    }}
                    className={`px-3 py-2 cursor-pointer transition-colors ${
                      opt === value
                        ? 'bg-orange-50 text-orange-600 danaBold'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {opt}
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const MiniStepper = ({ currentKey }) => {
  const steps = [
    { key: 'cart', label: 'سبد', Icon: FiShoppingCart },
    { key: 'address', label: 'انتخاب آدرس و ارسال', Icon: FiMapPin },
    { key: 'payment', label: 'پرداخت', Icon: FiCreditCard },
  ]
  const currentIndex = steps.findIndex((s) => s.key === currentKey)

  return (
    <div className="flex items-center justify-between" dir="rtl">
      {steps.map((s, i) => {
        const active = i <= currentIndex
        const Icon = s.Icon
        return (
          <React.Fragment key={s.key}>
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  active ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Icon size={16} />
              </div>
              <span
                className={`text-[11px] danaMed ${
                  active ? 'text-orange-500' : 'text-gray-400'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 -mt-5 bg-gray-200 relative overflow-hidden">
                <div
                  className={`absolute inset-y-0 right-0 bg-orange-500 transition-all duration-300 ${
                    i < currentIndex ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default StepTwo
