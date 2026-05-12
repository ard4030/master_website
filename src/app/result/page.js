'use client'

import React, { Suspense } from 'react'
import ResultContent from './ResultContent'

function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-bl from-slate-100 to-blue-200 p-5 flex items-center justify-center dana">
        <div className="bg-white rounded-3xl shadow-2xl p-16 text-center">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-5"></div>
          <p className="text-lg font-dana-bold text-indigo-600">درحال بارگذاری...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}

export default ResultPage