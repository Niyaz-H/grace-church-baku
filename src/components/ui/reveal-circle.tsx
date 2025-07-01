"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RevealCircleProps {
  isVisible: boolean
  center: { x: number; y: number }
  onComplete?: () => void
}

const RevealCircle: React.FC<RevealCircleProps> = ({ isVisible, center, onComplete }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const maxRadius = Math.sqrt(
    Math.pow(Math.max(center.x, windowSize.width - center.x), 2) +
    Math.pow(Math.max(center.y, windowSize.height - center.y), 2)
  )

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${center.x}px ${center.y}px, transparent 0%, transparent var(--radius), rgba(255,255,255,0.1) var(--radius))`,
          }}
          initial={{ '--radius': '0px' } as Record<string, string>}
          animate={{ '--radius': `${maxRadius}px` } as Record<string, string>}
          exit={{ '--radius': '0px' } as Record<string, string>}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
          onAnimationComplete={() => {
            if (onComplete) onComplete()
          }}
        />
      )}
    </AnimatePresence>
  )
}

export default RevealCircle