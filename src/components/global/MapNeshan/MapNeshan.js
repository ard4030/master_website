// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import L from 'leaflet'
// import { FaSearch } from 'react-icons/fa'
// import { FiMapPin } from 'react-icons/fi'

// // تنظیم آیکون پیش‌فرض Leaflet
// delete L.Icon.Default.prototype._getIconUrl
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
// })

// const NESHAN_KEY = process.env.NEXT_PUBLIC_NESHAN_API_KEY
// const NESHAN_KEY_SEARCH = process.env.NEXT_PUBLIC_NESHAN_API_KEY_SEARCH

// function MapController({ onMapReady }) {
//   const map = useMap()
//   useEffect(() => {
//     if (map) onMapReady(map)
//   }, [map, onMapReady])
//   return null
// }

// function LocationMarker({ position, onPick }) {
//   useMapEvents({
//     click(e) {
//       const { lat, lng } = e.latlng
//       onPick(lat, lng)
//     },
//   })
//   return position ? <Marker position={position} /> : null
// }

// /**
//  * MapNeshan
//  * props:
//  *   - initialPosition: [lat, lng]
//  *   - onSelect(picked): هر بار نقطه‌ای انتخاب شد (کلیک روی نقشه یا انتخاب نتیجه)
//  *   - onConfirm(picked): با کلیک روی «تایید موقعیت»
//  *
//  * picked = { lat, lng, state, city, district, neighbourhood, address }
//  */
// export default function MapNeshan({
//   initialPosition = [35.732379, 51.420296],
//   onSelect,
//   onConfirm,
// }) {
//   const [position, setPosition] = useState(initialPosition)
//   const [term, setTerm] = useState('')
//   const [results, setResults] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [isOpen, setIsOpen] = useState(false)
//   const [userInput, setUserInput] = useState(false)
//   const [picked, setPicked] = useState(null)
//   const [mapInstance, setMapInstance] = useState(null)

//   const boxRef = useRef(null)
//   const resultsRef = useRef(null)

//   // reverse geocoding
//   const fetchAddress = async (lat, lng) => {
//     try {
//       const res = await fetch(
//         `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`,
//         { headers: { 'Api-Key': NESHAN_KEY } }
//       )
//       const data = await res.json()
//       if (!data?.formatted_address) return null
//       return data
//     } catch {
//       return null
//     }
//   }

//   // کلیک روی نقشه
//   const handlePickFromMap = async (lat, lng) => {
//     setPosition([lat, lng])
//     const data = await fetchAddress(lat, lng)
//     if (!data) return
//     const p = {
//       lat,
//       lng,
//       state: data.state || '',
//       city: data.city || '',
//       district: data.district || '',
//       neighbourhood: data.neighbourhood || '',
//       address: data.formatted_address || '',
//     }
//     setPicked(p)
//     setTerm(p.address)
//     setUserInput(false)
//     onSelect?.(p)
//   }

//   // سرچ آدرس
//   const handleSearch = async () => {
//     if (!term.trim()) return
//     setLoading(true)
//     setIsOpen(true)
//     try {
//       const res = await fetch(
//         `https://api.neshan.org/v1/search?term=${encodeURIComponent(term)}&lat=35.699739&lng=51.338097`,
//         { headers: { 'Api-Key': NESHAN_KEY_SEARCH } }
//       )
//       const data = await res.json()
//       setResults(data.items || [])
//     } catch {
//       setResults([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   // debounce
//   useEffect(() => {
//     if (!term.trim() || !userInput) {
//       setResults([])
//       return
//     }
//     const t = setTimeout(handleSearch, 700)
//     return () => clearTimeout(t)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [term, userInput])

//   // بستن نتایج با کلیک بیرون
//   useEffect(() => {
//     const handler = (e) => {
//       if (
//         boxRef.current &&
//         !boxRef.current.contains(e.target) &&
//         resultsRef.current &&
//         !resultsRef.current.contains(e.target)
//       ) {
//         setIsOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handler)
//     return () => document.removeEventListener('mousedown', handler)
//   }, [])

//   // انتخاب از نتایج
//   const handleSelectResult = (item) => {
//     if (!item?.location) return
//     const lat = item.location.y
//     const lng = item.location.x
//     setPosition([lat, lng])
//     if (mapInstance) {
//       mapInstance.flyTo([lat, lng], 16, { animate: true, duration: 1.5 })
//     }
//     const p = {
//       lat,
//       lng,
//       state: item.region || '',
//       city: item.region || '',
//       district: '',
//       neighbourhood: item.neighbourhood || '',
//       address:
//         [item.region, item.neighbourhood, item.title]
//           .filter(Boolean)
//           .join(' ') || item.title || '',
//     }
//     setPicked(p)
//     setTerm(p.address)
//     setUserInput(false)
//     setIsOpen(false)
//     onSelect?.(p)
//   }

//   return (
//     <div className="w-full relative dana" dir="rtl">
//       {/* جستجو */}
//       <form
//         ref={boxRef}
//         onSubmit={(e) => {
//           e.preventDefault()
//           handleSearch()
//         }}
//         className="relative mb-3"
//       >
//         <input
//           type="text"
//           value={term}
//           onChange={(e) => {
//             setIsOpen(true)
//             setTerm(e.target.value)
//             setUserInput(true)
//           }}
//           placeholder="آدرس مورد نظر را سرچ کنید"
//           className="w-full dana py-2.5 pr-3 pl-10 text-sm border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 rounded-lg outline-none transition placeholder:text-gray-400"
//         />
//         <button
//           type="submit"
//           className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
//           aria-label="جستجو"
//         >
//           <FaSearch size={14} />
//         </button>
//       </form>

//       {/* لیست نتایج */}
//       {isOpen && term.trim() && (
//         <div
//           ref={resultsRef}
//           className="absolute top-13 left-0 right-0 z-99999 bg-white rounded-lg border border-gray-200 shadow-lg max-h-52 overflow-y-auto"
//         >
//           {loading ? (
//             <p className="p-3 text-center text-gray-500 text-sm dana">در حال جستجو...</p>
//           ) : results.length > 0 ? (
//             results.map((item, i) => (
//               <div
//                 key={i}
//                 onClick={() => handleSelectResult(item)}
//                 className="p-3 text-right cursor-pointer border-b border-gray-100 hover:bg-orange-50 transition"
//               >
//                 <p className="text-sm text-gray-700 danaMed">{item.title}</p>
//                 <p className="text-xs text-gray-500 mt-1 dana">{item.address}</p>
//               </div>
//             ))
//           ) : (
//             <p className="p-3 text-center text-gray-400 text-sm dana">نتیجه‌ای یافت نشد</p>
//           )}
//         </div>
//       )}

//       {/* نقشه */}
//       <MapContainer
//         center={position}
//         zoom={14}
//         style={{ height: '320px', width: '100%', borderRadius: 12 }}
//       >
//         <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <LocationMarker position={position} onPick={handlePickFromMap} />
//         <MapController onMapReady={setMapInstance} />
//       </MapContainer>

//       {/* خلاصه آدرس انتخاب‌شده */}
//       {picked && (
//         <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
//           <FiMapPin className="text-orange-500 mt-0.5 shrink-0" size={16} />
//           <p className="text-xs text-gray-700 leading-6 flex-1 dana">{picked.address}</p>
//         </div>
//       )}

//       {/* تایید */}
//       <button
//         type="button"
//         disabled={!picked}
//         onClick={() => onConfirm?.(picked)}
//         className="mt-3 w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg danaBold text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
//       >
//         تایید موقعیت
//       </button>
//     </div>
//   )
// }
