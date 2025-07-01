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
    primary: "bg-primary/80 hover:bg-primary/90 text-primary-foreground border-primary/30 hover:border-primary/50 hover:shadow-xl",
    secondary: "bg-white/20 hover:bg-white/30 text-foreground border-white/20 hover:border-white/30 hover:shadow-xl",
    outline: "bg-white/10 hover:bg-white/20 text-foreground border-white/20 hover:border-white/30 hover:shadow-xl",
    ghost: "bg-transparent hover:bg-white/20 text-foreground border-transparent hover:border-white/20 hover:shadow-lg"
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