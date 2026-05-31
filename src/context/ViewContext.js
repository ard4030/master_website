"use client"
import React, { createContext, useContext, useState } from 'react'

const ViewContext = createContext()

export const ViewProvider = ({ children }) => {
  const [view, setView] = useState('default')
  const [isLoading, setIsLoading] = useState(false);
  const [loadingObj, setLoadingObj] = useState({
    countProduct : false,
  });

  const value = {
    view,
    setView,
    isLoading,
    setIsLoading,
    loadingObj, setLoadingObj
  }

  return (
    <ViewContext.Provider value={value}>
      {children}
    </ViewContext.Provider>
  )
}

export const useView = () => {
  const context = useContext(ViewContext)
  if (!context) {
    throw new Error('useView must be used within ViewProvider')
  }
  return context
}

export default ViewContext