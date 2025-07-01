"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassmorphicCardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ 
  children, 
  className, 
  hoverable = true,
  onClick 
}) => {
  return (
    <motion.div
      className={cn(
        "backdrop-blur-xl bg-white/10 dark:bg-white/5 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10",
        hoverable && "transition-all duration-300 hover:bg-white/20 hover:dark:bg-white/10 hover:shadow-3xl hover:-translate-y-1",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      whileHover={hoverable ? { scale: 1.02 } : undefined}
      whileTap={hoverable ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.div>
  )
}

export default GlassmorphicCard