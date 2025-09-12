"use client"

import { useEffect, useState } from "react"

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="w-10 h-10 border-2 border-gray-300 border-t-black rounded-full animate-spin mb-6" />
      <p className="text-2xl font-poppins text-gray-900" style={{fontWeight:"800"}}>{progress}% Complete</p>
      <p className="text-lg text-gray-500 font-poppins mt-2" style={{fontWeight:"300"}}>Please wait, creating Product..</p>
    </div>
  )
}
