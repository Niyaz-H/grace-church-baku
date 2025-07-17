"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = "rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center border-0"
  
  const variantClasses = {
    primary: "gradient-button-primary",
    secondary: "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
  }
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
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

export default GradientButton