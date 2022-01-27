import { useState, useEffect } from "react";

export const useScreenDetails = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    })

    const [screen, setScreen] = useState({
        orientation: undefined,
        touchScreen: undefined,
        deviceClass: undefined
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,   
            })
        }         
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)   
    }, [])

    useEffect(() => {
        const touch = window.matchMedia("(pointer: coarse)").matches
        if (windowSize.width > windowSize.height && !touch && windowSize.width > 1400) {
            setScreen({
                orientation: 'landscape',
                touchScreen: false,
                deviceClass: 'pc' 
            })
            return
        }
        if (windowSize.width > windowSize.height && windowSize.width > 900) {
            setScreen({
                orientation: 'landscape',
                touchScreen: touch,
                deviceClass: 'laptop/tablet' 
            })
            return
        }
        if (windowSize.width < windowSize.height && windowSize.width >= 768) {
            setScreen({
                orientation: 'portrait',
                touchScreen: touch,
                deviceClass: 'laptop/tablet' 
            })
            return
        }
        if (windowSize.width < 768 && windowSize.width < windowSize.height) {
            setScreen({
                orientation: 'portrait',
                touchScreen: true,
                deviceClass: 'mobile' 
            })
            return
        }
        if (windowSize.width <= 900) {
            setScreen({
                orientation: 'landscape',
                touchScreen: true,
                deviceClass: 'mobile' 
            })
            return
        }
    }, [windowSize])
    
    return [ screen, windowSize ]
}
