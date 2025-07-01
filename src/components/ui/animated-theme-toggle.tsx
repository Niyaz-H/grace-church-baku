"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import RevealCircle from './reveal-circle'

interface AnimatedThemeToggleProps {
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
}

const AnimatedThemeToggle: React.FC<AnimatedThemeToggleProps> = ({ theme, setTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sphereRef = useRef<THREE.Mesh | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showReveal, setShowReveal] = useState(false)
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    })
    
    renderer.setSize(40, 40)
    renderer.setClearColor(0x000000, 0)
    
    // Create sphere
    const geometry = new THREE.SphereGeometry(0.8, 32, 32)
    const material = new THREE.MeshBasicMaterial({ 
      color: theme === 'dark' ? 0x1a1a1a : 0xffffff,
      transparent: true,
      opacity: 0.9
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)
    
    camera.position.z = 2
    
    sceneRef.current = scene
    rendererRef.current = renderer
    sphereRef.current = sphere
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      if (sphereRef.current) {
        sphereRef.current.rotation.y += 0.01
      }
      renderer.render(scene, camera)
    }
    animate()
    
    return () => {
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [theme])

  useEffect(() => {
    if (sphereRef.current && rendererRef.current && sceneRef.current) {
      setIsTransitioning(true)
      
      const material = sphereRef.current.material as THREE.MeshBasicMaterial
      const targetColor = theme === 'dark' ? 0x1a1a1a : 0xffffff
      
      // Animate color transition
      const startColor = material.color.clone()
      const endColor = new THREE.Color(targetColor)
      let progress = 0
      
      const animateColor = () => {
        progress += 0.05
        if (progress <= 1) {
          material.color.lerpColors(startColor, endColor, progress)
          requestAnimationFrame(animateColor)
        } else {
          setIsTransitioning(false)
        }
      }
      animateColor()
    }
  }, [theme])

  const toggleTheme = (event: React.MouseEvent) => {
    if (isTransitioning) return
    
    // Get click position for reveal animation
    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    setClickPosition({ x, y })
    setShowReveal(true)
    
    // Delay theme change to sync with animation
    setTimeout(() => {
      if (theme === 'dark') {
        setTheme('light')
      } else {
        setTheme('dark')
      }
    }, 100)
  }

  return (
    <>
      <motion.div
        className="relative w-20 h-10 bg-white/10 backdrop-blur-md rounded-full p-1 cursor-pointer border border-white/20 shadow-lg"
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
      <motion.div
        className="absolute top-1 w-8 h-8 rounded-full flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 0 : 44,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-8 h-8"
          style={{ imageRendering: 'crisp-edges' }}
        />
      </motion.div>
      
      <AnimatePresence>
        {theme === 'dark' && (
          <motion.div
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {/* Moon with crescent shape */}
            <div className="relative w-4 h-4">
              <div className="w-4 h-4 bg-gray-300 rounded-full" />
              <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-gray-600 rounded-full" />
              <div className="absolute top-1 right-1 w-1 h-1 bg-gray-400 rounded-full" />
              <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-gray-400 rounded-full" />
            </div>
          </motion.div>
        )}
        
        {theme === 'light' && (
          <motion.div
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {/* Sun with center and rays */}
            <div className="relative w-4 h-4">
              {/* Sun rays */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-2 bg-yellow-400 rounded-full"
                  style={{
                    transform: `rotate(${i * 45}deg) translateY(-10px)`,
                    transformOrigin: 'center 10px',
                    left: '50%',
                    top: '50%',
                    marginLeft: '-1px',
                    marginTop: '-1px'
                  }}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
              {/* Sun center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-yellow-500 rounded-full shadow-sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
      
      <RevealCircle
        isVisible={showReveal}
        center={clickPosition}
        onComplete={() => setShowReveal(false)}
      />
    </>
  )
}

export default AnimatedThemeToggle