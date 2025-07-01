import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'az', name: 'Azərbaycan' },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
]

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [inHeroSection, setInHeroSection] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setInHeroSection(scrollY < window.innerHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine text color based on position - same logic as navigation
  const getTextColor = () => {
    if (inHeroSection) {
      return 'text-white'
    }
    return 'text-foreground'
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 transition-colors duration-300 ${getTextColor()} hover:bg-white/20 dark:hover:bg-black/30`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-5 h-5" />
        <span>{selectedLanguage.code.toUpperCase()}</span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-40 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-lg shadow-xl border border-white/30 dark:border-white/10 overflow-hidden"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLanguage(lang)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 hover:bg-white/30 dark:hover:bg-white/10 transition-colors ${getTextColor()}`}
              >
                {lang.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSelector