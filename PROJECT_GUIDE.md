# 🏪 MasterShop - دستور العمل جامع پروژه

## 📋 نمای کلی پروژه

**نوع پروژه:** Next.js 16.1.6 + React 19.2.3 + Tailwind CSS 4
**موقعیت:** `H:/Project/ActiveProject/MasterShop/website`
**زبان:** فارسی (RTL) + React Client Components

---

## 🏗️ ساختار پروژه

```
website/
├── src/
│   ├── app/
│   │   ├── api/auth/logout/    # API Route برای logout
│   │   ├── globals.css         # فونت‌ها و تنظیمات عمومی
│   │   ├── layout.js           # Layout اصلی (Provider wrapper)
│   │   ├── page.js             # صفحه اصلی
│   │   ├── dashboard/          # صفحات داشبورد
│   │   └── product/            # صفحات محصول
│   ├── components/
│   │   ├── header/
│   │   │   └── Header.js       # کامپوننت هدر اصلی
│   │   ├── global/
│   │   │   ├── Login.js        # کامپوننت لاگین/ثبت‌نام
│   │   │   ├── ModalLayout/
│   │   │   └── sidemodal/
│   │   ├── dashboard/
│   │   ├── product/
│   │   └── websitecomp/
│   ├── context/
│   │   ├── AuthContext.js      # مدیریت وضعیت کاربر
│   │   ├── CartContext.js      # مدیریت سبد خرید
│   │   ├── MerchantContext.js  # دیتای فروشنده
│   │   └── ViewContext.js      # تنظیمات view
│   └── utils/
│       └── functions.js        # توابع کمکی (apiRequest, deviceId)
├── public/
│   └── assets/
│       ├── fonts/
│       │   └── dana/           # فونت Dana (bold, medium, regular)
│       └── images/
├──.env                        # متغیرهای محیطی
├── package.json               # وابستگی‌ها
├── tailwind.config.js          # تنظیمات Tailwind
└── next.config.mjs             # تنظیمات Next.js
```

---

## 🔧 تنظیمات کلیدی

### متغیرهای محیطی (.env)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```
- Base URL برای تمامی درخواست‌های API
- استفاده در `src/utils/functions.js`

### فونت‌ها (globals.css)
```css
.dana        /* dana-regular */
.danaBold    /* dana-bold */
.danaMed     /* dana-medium (not used) */
```
- تمام متن‌ها با این کلاس‌ها استایل می‌شوند

---

## 🔌 Providers & Contexts

### layout.js (اصلی)
```javascript
<MerchantProvider>
  <AuthProvider>
    <CartProvider>
      {children}
    </CartProvider>
  </AuthProvider>
</MerchantProvider>
```

### AuthContext
**مسئولیت:** مدیریت وضعیت لاگین کاربر
- `user` - اطلاعات کاربر فعلی
- `setUser()` - بروز رسانی کاربر
- `logout()` - خروج از سیستم
- `loading` - وضعیت بارگذاری

**API Calls:**
- GET `/auth/is-login` - بررسی وضعیت لاگین

### CartContext
**مسئولیت:** مدیریت سبد خرید
- `cart` - اطلاعات سبد (items, totalPrice, totalCount)
- `addToCart()` - افزودن محصول
- `removeFromCart()` - حذف محصول
- `updateQuantity()` - بروز رسانی تعداد

**API Calls:**
- POST `/cart` - دریافت سبد خرید
- POST `/cart/add` - افزودن به سبد
- POST `/cart/remove` - حذف از سبد

**DeviceId:**
- از `getOrCreateDeviceId()` استفاده می‌شود
- برای شناسایی دستگاه بدون لاگین

### MerchantContext
**مسئولیت:** اطلاعات فروشنده (نام، تصویر، theme)
- `homepageData` - داده‌های صفحه اول
- `activeTheme` - theme فعال
- `components` - کامپوننت‌های theme

### ViewContext
**مسئولیت:** تنظیمات نمایشی
- `view` - نوع نمایش ('default')
- `setView()` - تغییر نمایش
- `isLoading` - وضعیت بارگذاری

---

## 📡 درخواست‌های API (apiRequest)

### موقعیت تابع
`src/utils/functions.js` → `apiRequest()`

### نحوه استفاده
```javascript
import { apiRequest } from '@/utils/functions'

// GET
const response = await apiRequest('/cart', 'GET')

// POST
const response = await apiRequest('/cart/add', 'POST', {
  productId: '123',
  quantity: 1
})

// PUT/PATCH/DELETE
const response = await apiRequest('/product/123', 'PUT', data)
```

### ساختار پاسخ
```javascript
{
  success: true/false,
  data: {...},        // داده‌های پاسخ
  status: 200,        // کد HTTP
  error: 'message'    // پیام خطا (زمانی که success: false)
}
```

### ❌ نکات مهم - **TRY/CATCH نزار!**
- `apiRequest` خود **تمام errors را handle می‌کند**
- هرگز throw نمی‌کند، همیشه object برمی‌گرداند
- فقط `response.success` را بررسی کن
- اگر error باشد: `response.error` پیام دارد

```javascript
// ✅ درست
const response = await apiRequest('/auth/logout', 'POST')
if (response.success) {
  toast.success('خارج شدید')
} else {
  toast.error(response.error)
}

// ❌ غلط - نیاز ندارد
const response = await apiRequest(...) // فقط صدا کن
// نیاز به try/catch نیست
```

### دیگر نکات
- `credentials: 'include'` - کوکی‌ها خودکار ارسال می‌شوند
- BASE_URL از env variable لوڈ می‌شود
- اگر endpoint شروع شود با `/`, پایه URL به آن افزوده می‌شود

---

## 🔐 Authentication & Logout

### فرایند Logout
1. Header میں `handleLogout()` صدا می‌شود
2. localStorage پاک می‌شود (`masterToken`, `masterCart`)
3. `setUser(null)` - state بروز می‌شود

### مشکل فعلی ❌
- Cookies هنوز server-side ریموو نمی‌شوند
- این باعث "رفرش = دوباره لاگین" می‌شود

### راه حل مورد نیاز
- `/api/auth/logout` endpoint برای پاک کردن کوکی‌ها
- سپس localStorage پاک شود

---

## 🎨 Styling با Tailwind + Font

### نام‌گذاری Tailwind
- **Flexbox:** `flex items-center gap-4`
- **رنگ:** `bg-blue-600 text-white hover:bg-blue-700`
- **فاصله:** `px-4 py-2 gap-2 mb-6`
- **حرکت:** `transition-all hover: active:scale-95`
- **RTL:** `text-right direction: rtl`

### استفاده از فونت
```html
<!-- عنوان (Bold) -->
<h1 className="text-2xl danaBold">عنوان</h1>

<!-- متن عادی (Regular) -->
<p className="dana">متن عادی</p>

<!-- label (Medium) -->
<label className="dana">برچسب</label>
```

### مثال کامل
```javascript
<button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg danaBold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all active:scale-95">
  ورود
</button>
```

---

## 📦 وابستگی‌های اصلی

```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "react-icons": "^5.5.0",        // آیکون‌ها
  "react-toastify": "^11.0.5",    // اطلاع‌رسانی‌ها
  "react-otp-input": "^3.1.1",    // ورود OTP
  "tailwindcss": "^4"             // CSS Framework
}
```

---

## 🚀 نقاط ورود کامپوننت‌ها

### Header.js
```javascript
'use client'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { CartContext } from '@/context/CartContext'
import { apiRequest } from '@/utils/functions'
```

**استفاده:**
- نمایش logout/login button
- نمایش تعداد سبد خرید
- نمایش پروفایل کاربر

### Login.js
```javascript
const { setUser } = useContext(AuthContext)
const response = await apiRequest('/auth/register-user', 'POST', { phone })
const response = await apiRequest('/auth/verify-otp', 'POST', { phone, code })
```

**مراحل ورود:**
1. کاربر شماره تلفن وارد می‌کند
2. API تایید OTP می‌فرستد
3. کاربر KOD 5 رقمی وارد می‌کند
4. `setUser()` اطلاعات کاربر را ذخیره می‌کند

---

## ⚠️ مشکلات شناخته شده

### 1. Logout Issue ❌
- **مشکل:** رفرش بعد از logout = دوباره لاگین
- **علت:** Cookies server-side پاک نمی‌شوند
- **حل:** `/api/auth/logout` endpoint اضافه کنید

### 2. DeviceId
- **جریان:** هر کاربری قبل از لاگین یک deviceId دارد
- **ذخیره:** localStorage میں
- **استفاده:** سبد خرید بدون لاگین

---

## ✅ Checklist برای تغییرات جدید

درخواست API اضافه کنی:
- [ ] Endpoint را در `functions.js` اضافه کن
- [ ] `credentials: 'include'` استفاده کن
- [ ] Response handler اضافه کن
- [ ] Error handling اضافه کن

Component اضافه کنی:
- [ ] کلاس‌های Tailwind استفاده کن (بدون CSS files)
- [ ] فونت‌ها: `.dana` و `.danaBold` اضافه کن
- [ ] 'use client' directive اضافه کن (اگر interactive)
- [ ] Context استفاده کن (AuthContext, CartContext)

---

## 🔍 چیزهایی که من می‌دانم

✅ apiRequest تابع کلیدی برای تمام درخواست‌ها است
✅ تمام کامپوننت‌ها React Client Components اند
✅ Tailwind CSS برای styling (‌بدون CSS files)
✅ فونت Dana برای متن عارسی
✅ Contexts استفاده می‌شوند برای state management
✅ OTP login روش ورود اصلی است
✅ DeviceId برای کاربران بدون لاگین استفاده می‌شود

---

**آخرین بروز رسانی:** 18 فوریه 2026
