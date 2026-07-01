'use client'

import React, { useEffect, useState } from 'react'
import { apiRequest } from '@/utils/functions'
import { FiPackage, FiClock, FiCheckCircle, FiAlertCircle, FiTruck } from 'react-icons/fi'
import { toast } from 'sonner'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('all')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalOrders, setTotalOrders] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [status, page, limit])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const requestData = {
        page,
        limit,
        ...(status !== 'all' && { status })
      }
      
      const response = await apiRequest('/orders/list', 'POST', requestData)
      
      if (response.success) {
        setOrders(response.data?.orders || [])
        setTotalOrders(response.data?.pagination?.total || 0)
      } else {
        toast.error('خطا در دریافت سفارشات')
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('خطا در بارگذاری سفارشات')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'درحال بررسی', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: FiClock },
      confirmed: { label: 'تأیید شده', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FiCheckCircle },
      processing: { label: 'درحال پردازش', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: FiTruck },
      shipped: { label: 'ارسال شده', color: 'bg-green-50 text-green-700 border-green-200', icon: FiTruck },
      delivered: { label: 'تحویل داده شده', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: FiCheckCircle },
      cancelled: { label: 'لغو شده', color: 'bg-red-50 text-red-700 border-red-200', icon: FiAlertCircle },
    }

    const config = statusConfig[status] || statusConfig.pending
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs danaBold ${config.color}`}>
        <Icon size={14} />
        {config.label}
      </span>
    )
  }

  const filteredOrders = orders

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
          <p className="text-gray-600 dana">درحال بارگذاری سفارشات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 dana" dir="rtl">
      {/* هدر با فیلتر */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl danaBold text-gray-900 mb-1">سفارشات من</h1>
              <p className="text-sm text-gray-600">کل سفارشات: <span className="danaBold text-gray-900">{totalOrders}</span></p>
            </div>
          </div>

          {/* فیلترها */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* فیلتر وضعیت */}
            <div className="flex-1">
              <label className="block text-xs text-gray-600 danaMed mb-2">فیلتر بر اساس وضعیت</label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value)
                  setPage(1)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm dana focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
              >
                <option value="all">همه سفارشات</option>
                <option value="pending">درحال بررسی</option>
                <option value="confirmed">تأیید شده</option>
                <option value="processing">درحال پردازش</option>
                <option value="shipped">ارسال شده</option>
                <option value="delivered">تحویل داده شده</option>
              </select>
            </div>

            {/* فیلتر تعداد نتایج */}
            <div>
              <label className="block text-xs text-gray-600 danaMed mb-2">نتایج در هر صفحه</label>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value))
                  setPage(1)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm dana focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
              >
                <option value={5}>5 مورد</option>
                <option value={10}>10 مورد</option>
                <option value={20}>20 مورد</option>
                <option value={50}>50 مورد</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* لیست سفارشات */}
      {filteredOrders.length > 0 ? (
        <>
          <div className="space-y-4">
            {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6">
                {/* ردیف بالایی */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                      <FiPackage className="text-orange-500" size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 danaMed">شماره سفارش</p>
                      <p className="text-sm danaBold text-gray-900 break-all">{order._id}</p>
                    </div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                {/* ردیف میانی - اطلاعات */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 danaMed mb-1">تاریخ سفارش</p>
                    <p className="text-sm danaBold text-gray-900">{new Date(order.createdAt).toLocaleDateString('fa-IR')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 danaMed mb-1">مبلغ کل</p>
                    <p className="text-sm danaBold text-gray-900">{Number(order.totalAmount || 0).toLocaleString('fa-IR')} تومان</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 danaMed mb-1">روش پرداخت</p>
                    <p className="text-sm danaBold text-gray-900">{order.paymentGateway || 'نامشخص'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 danaMed mb-1">تعداد محصولات</p>
                    <p className="text-sm danaBold text-gray-900">{order.items?.length || 0} محصول</p>
                  </div>
                </div>

                {/* ردیف پایینی - آدرس و عملیات */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 danaMed mb-1">آدرس تحویل</p>
                    <p className="text-sm text-gray-700 leading-5">
                      {order.address?.state && order.address?.city
                        ? `${order.address.state} - ${order.address.city} - ${order.address.fullAddress}`
                        : 'آدرس ثبت نشده'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedOrder(order)
                      setIsModalOpen(true)
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm danaBold transition-colors whitespace-nowrap"
                  >
                    مشاهده جزئیات
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>

          {/* صفحه بندی */}
          {totalOrders > limit && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-600 dana">
                  نمایش <span className="danaBold">{(page - 1) * limit + 1}</span> تا <span className="danaBold">{Math.min(page * limit, totalOrders)}</span> از <span className="danaBold">{totalOrders}</span> سفارش
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    disabled={page === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm danaBold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    صفحه قبل
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.ceil(totalOrders / limit) }).map((_, index) => {
                      const pageNumber = index + 1
                      const isVisible = pageNumber === 1 || 
                                       pageNumber === Math.ceil(totalOrders / limit) ||
                                       Math.abs(pageNumber - page) <= 1
                      
                      if (!isVisible && index !== 1 && index !== Math.ceil(totalOrders / limit) - 2) {
                        return null
                      }

                      if ((index === 1 && page > 3) || (index === Math.ceil(totalOrders / limit) - 2 && page < Math.ceil(totalOrders / limit) - 2)) {
                        return <span key={index} className="px-2 text-gray-400">...</span>
                      }

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setPage(pageNumber)}
                          className={`w-8 h-8 rounded-lg text-sm danaBold transition-colors ${
                            page === pageNumber
                              ? 'bg-orange-500 text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => setPage(prev => Math.min(Math.ceil(totalOrders / limit), prev + 1))}
                    disabled={page === Math.ceil(totalOrders / limit)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm danaBold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    صفحه بعد
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="flex justify-center mb-4">
            <FiPackage className="text-gray-400" size={48} />
          </div>
          <p className="text-gray-600 dana text-lg mb-2">هیچ سفارشی یافت نشد</p>
          <p className="text-gray-500 dana text-sm">هنوز سفارشی ثبت نشده است</p>
        </div>
      )}

      {/* مدال مشاهده جزئیات */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" dir="rtl">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto dana">
            {/* هدر مدال */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl danaBold text-gray-900">جزئیات سفارش</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setSelectedOrder(null)
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* محتوای مدال */}
            <div className="p-6 space-y-6">
              {/* شماره سفارش و وضعیت */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 danaMed mb-2">شماره سفارش</p>
                  <p className="text-sm danaBold text-gray-900 break-all">{selectedOrder._id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 danaMed mb-2">وضعیت</p>
                  {getStatusBadge(selectedOrder.status)}
                </div>
              </div>

              {/* تاریخ و مبلغ */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 danaMed mb-2">تاریخ سفارش</p>
                  <p className="text-sm danaBold text-gray-900">{new Date(selectedOrder.createdAt).toLocaleDateString('fa-IR')}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 danaMed mb-2">مبلغ کل</p>
                  <p className="text-sm danaBold text-gray-900">{Number(selectedOrder.totalAmount || 0).toLocaleString('fa-IR')} تومان</p>
                </div>
              </div>

              {/* روش پرداخت و تحویل */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 danaMed mb-2">روش پرداخت</p>
                  <p className="text-sm danaBold text-gray-900">{selectedOrder.paymentGateway || 'نامشخص'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 danaMed mb-2">روش ارسال</p>
                  <p className="text-sm danaBold text-gray-900">{selectedOrder.shippingMethod?.name || 'نامشخص'}</p>
                </div>
              </div>

              {/* آدرس تحویل */}
              <div className="pb-4 border-b border-gray-100">
                <p className="text-xs text-gray-500 danaMed mb-2">آدرس تحویل</p>
                <p className="text-sm text-gray-700 leading-6">
                  {selectedOrder.address?.state && selectedOrder.address?.city
                    ? `${selectedOrder.address.state} - ${selectedOrder.address.city}\n${selectedOrder.address.fullAddress}`
                    : 'آدرس ثبت نشده'}
                </p>
              </div>

              {/* محصولات */}
              <div className="pb-4 border-b border-gray-100">
                <p className="text-xs text-gray-500 danaMed mb-3">محصولات</p>
                <div className="space-y-2">
                  {selectedOrder.items?.length > 0 ? (
                    selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-start text-sm bg-gray-50 p-3 rounded-lg">
                        <div className="flex-1">
                          <p className="text-gray-900 danaBold">{item.name}</p>
                          <p className="text-xs text-gray-600">تعداد: {item.quantity}</p>
                        </div>
                        <p className="text-gray-900 danaBold">{Number(item.price || 0).toLocaleString('fa-IR')} تومان</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">بدون محصول</p>
                  )}
                </div>
              </div>

              {/* کد تخفیف */}
              {selectedOrder.coupon && (
                <div className="pb-4 border-b border-gray-100">
                  <p className="text-xs text-gray-500 danaMed mb-2">کد تخفیف</p>
                  <p className="text-sm danaBold text-gray-900">{selectedOrder.coupon.code || selectedOrder.discountCode}</p>
                </div>
              )}

              {/* اطلاعات کارت به کارت (اگر وجود داشت) */}
              {selectedOrder.paymentGateway === 'cart_to_cart' && (
                <div className="pb-4 border-b border-gray-100">
                  <p className="text-xs text-gray-500 danaMed mb-3">اطلاعات کارت به کارت</p>
                  <div className="space-y-2 text-sm">
                    {selectedOrder.trackingNumber && (
                      <p><span className="text-gray-600">شماره پیگیری:</span> <span className="danaBold text-gray-900">{selectedOrder.trackingNumber}</span></p>
                    )}
                    {selectedOrder.senderCardNumber && (
                      <p><span className="text-gray-600">کارت ارسال‌کننده:</span> <span className="danaBold text-gray-900">{selectedOrder.senderCardNumber}</span></p>
                    )}
                    {selectedOrder.senderCardName && (
                      <p><span className="text-gray-600">نام کارت:</span> <span className="danaBold text-gray-900">{selectedOrder.senderCardName}</span></p>
                    )}
                  </div>
                </div>
              )}

              {/* خلاصه هزینه‌ها */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">جمع محصولات:</span>
                    <span className="danaBold text-gray-900">{Number(selectedOrder.totalAmount || 0).toLocaleString('fa-IR')} تومان</span>
                  </div>
                  {selectedOrder.shippingMethod?.price && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">هزینه ارسال:</span>
                      <span className="danaBold text-gray-900">{Number(selectedOrder.shippingMethod.price).toLocaleString('fa-IR')} تومان</span>
                    </div>
                  )}
                  {selectedOrder.discountAmount > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>تخفیف:</span>
                      <span className="danaBold">-{Number(selectedOrder.discountAmount).toLocaleString('fa-IR')} تومان</span>
                    </div>
                  )}
                  <div className="border-t border-orange-200 pt-2 flex justify-between">
                    <span className="danaBold text-gray-800">قابل پرداخت:</span>
                    <span className="danaBold text-orange-600 text-lg">{Number(selectedOrder.finalAmount || selectedOrder.totalAmount || 0).toLocaleString('fa-IR')} تومان</span>
                  </div>
                </div>
              </div>
            </div>

            {/* دکمه بستن */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setSelectedOrder(null)
                }}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm danaBold transition-colors"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrdersPage