import { useEffect, useState } from 'react'

const getCameraPermission = () => {
  const [cameraPermission, setCameraPermission] = useState(false)

  useEffect(() => {
    let intervalId

    const checkCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true })
        setCameraPermission(true)
      } catch (error) {
        console.error('Camera permission denied:', error)
        setCameraPermission(false)
      }
    }

    // Start interval to check permission every second
    intervalId = setInterval(checkCameraPermission, 1000)

    // Cleanup when the component unmounts
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      setCameraPermission(true)
    } catch (error) {
      setCameraPermission(false)
      console.error('Error accessing camera:', error)
    }
  }
  return { cameraPermission, requestCameraAccess }
}

export default getCameraPermission
