"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassmorphicBadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
}

const GlassmorphicBadge: React.FC<GlassmorphicBadgeProps> = ({ 
  children, 
  className, 
  variant = 'default'
}) => {
  const baseClasses = "inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full backdrop-blur-xl border transition-all duration-300"
  
  const variantClasses = {
    default: "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 hover:border-primary/50",
    secondary: "bg-white/20 text-foreground border-white/20 hover:bg-white/30 hover:border-white/30",
    outline: "bg-white/10 text-foreground border-white/20 hover:bg-white/20 hover:border-white/30",
    destructive: "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50"
  }

  return (
    <motion.span
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.span>
  )
}

export default GlassmorphicBadge