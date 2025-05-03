import React, { createContext, useState, useContext } from 'react'

const BackgroundContext = createContext()

export const BackgroundProvider = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState('bg-white')

  const updateBackgroundColor = (routeId) => {
    switch (routeId) {
      case 'home':
        setBackgroundColor('bg-white')
        break
      case 'dashboard':
        setBackgroundColor('bg-gray-500')
        break
      case 'profile':
        setBackgroundColor('bg-pink-500')
        break
      default:
        setBackgroundColor('bg-white')
    }
  }

  return (
    <BackgroundContext.Provider value={{ backgroundColor, updateBackgroundColor }}>
      {children}
    </BackgroundContext.Provider>
  )
}

export const useBackground = () => {
  const context = useContext(BackgroundContext)
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider')
  }
  return context
} 
