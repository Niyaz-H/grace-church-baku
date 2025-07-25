"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassmorphicButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const GlassmorphicButton: React.FC<GlassmorphicButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = "backdrop-blur-xl rounded-xl font-medium transition-all duration-300 shadow-lg border flex items-center justify-center"
  
  const variantClasses = {
    primary: "bg-accent text-white border-0 hover:bg-accent/90 shadow-lg hover:shadow-xl",
    secondary: "bg-secondary text-white border-0 hover:bg-secondary/90 shadow-lg hover:shadow-xl",
    outline: "bg-white/20 text-white border-white/30 hover:bg-white/30 hover:border-white/50 shadow-lg hover:shadow-xl",
    ghost: "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-lg"
  }
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "p-4 w-16 h-16"
  }
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

  return (
    <motion.button
      type={type}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05, y: -2 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  )
}

export default GlassmorphicButton