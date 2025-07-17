"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import {
  Menu,
  X,
  Play,
  Pause,
  Download,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  User,
  Quote,
  Star,
  CheckCircle,
  AlertCircle,
  Loader2,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Maximize,
  Youtube,
  Facebook,
  Instagram,
  MessageCircle
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import AnimatedThemeToggle from '@/components/ui/animated-theme-toggle'
import GlassmorphicCard from '@/components/ui/glassmorphic-card'
import GlassmorphicButton from '@/components/ui/glassmorphic-button'
import GlassmorphicBadge from '@/components/ui/glassmorphic-badge'
import GradientButton from '@/components/ui/gradient-button'
import contactData from '@/data/contacts.json'
import { useTranslation } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/ui/language-selector'
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('@/components/ui/leaflet-map'), {
  ssr: false,
})

// Utility function to format dates consistently on server and client
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

// Animated Link Component with sliding underline
const AnimatedLink: React.FC<{
  href: string
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
}> = ({ href, children, className = '', target, rel }) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`relative group hover:text-primary transition-colors duration-300 ${className}`}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </a>
  )
}

interface ThemeContextType {
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {}
})

const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}


interface Sermon {
  id: string
  title: string
  speaker: string
  date: string
  duration: string
  audioUrl: string
  videoUrl?: string
  transcript?: string
  thumbnail: string
  description: string
  tags: string[]
}

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar: string
  rating: number
}

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  category: string
  image: string
  registrationRequired: boolean
  spotsAvailable?: number
}

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface AudioPlayerProps {
  sermon: Sermon
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ sermon }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }


  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <GlassmorphicCard className="w-full p-6">
      <audio ref={audioRef} src={sermon.audioUrl} />
      
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={sermon.thumbnail}
          alt={sermon.title}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{sermon.title}</h3>
          <p className="text-sm text-muted-foreground">{sermon.speaker}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <GlassmorphicButton variant="ghost" size="sm" className="audio-player-button">
            <SkipBack className="w-4 h-4" />
          </GlassmorphicButton>
          <GlassmorphicButton onClick={togglePlay} size="lg" className="rounded-full w-14 h-14 audio-player-button">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </GlassmorphicButton>
          <GlassmorphicButton variant="ghost" size="sm" className="audio-player-button">
            <SkipForward className="w-4 h-4" />
          </GlassmorphicButton>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-foreground">{formatTime(currentTime)}</span>
            <div className="flex-1 bg-border rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-xs text-foreground">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <GlassmorphicButton
            variant="ghost"
            size="sm"
            className="audio-player-button"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </GlassmorphicButton>
          <div className="flex space-x-2">
            <GlassmorphicButton variant="ghost" size="sm" className="audio-player-button">
              <Download className="w-4 h-4 mr-2" />
              Download
            </GlassmorphicButton>
            <GlassmorphicButton variant="ghost" size="sm" className="audio-player-button" onClick={() => {
              const player = document.querySelector('.sermon-player-card')
              if (player) {
                player.requestFullscreen()
              }
            }}>
              <Maximize className="w-4 h-4 mr-2" />
              Fullscreen
            </GlassmorphicButton>
          </div>
        </div>
      </div>
    </GlassmorphicCard>
  )
}

interface NavigationProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, setIsOpen }) => {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [inHeroSection, setInHeroSection] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 50)
      setInHeroSection(scrollY < window.innerHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.mission'), href: '#mission' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.sermons'), href: '#sermons' },
    { name: t('nav.testimonials'), href: '#community' },
    { name: t('nav.events'), href: '#events' },
    { name: t('nav.needs'), href: '#needs' },
    { name: t('nav.contact'), href: '#contact' }
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  // Determine text color based on theme and position
  const getTextColor = () => {
    if (inHeroSection) {
      return 'text-white'
    }
    return theme === 'light' ? 'text-foreground' : 'text-foreground'
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border/50' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer select-none"
          >
            <img src="/logo.jpg" alt="Grace Church Baku" className="w-8 h-8 rounded-full object-cover" />
            <span className={`font-bold text-xl transition-colors duration-300 ${getTextColor()}`}>
              Grace Church Baku
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(item.href)}
                className={`relative group hover:text-primary transition-colors duration-200 font-medium cursor-pointer ${getTextColor()}`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            {/* Animated Theme Toggle */}
            <AnimatedThemeToggle theme={theme} setTheme={setTheme} />

            {/* Mobile Menu Toggle */}
            <GlassmorphicButton
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className={`w-6 h-6 ${getTextColor()}`} /> : <Menu className={`w-6 h-6 ${getTextColor()}`} />}
            </GlassmorphicButton>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    whileHover={{ x: 10 }}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-white hover:text-primary transition-colors duration-200 font-medium py-2 relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll()
  const { t } = useTranslation()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10" />
        <img
          src="https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Church Interior"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto p-8 rounded-2xl backdrop-blur-md bg-black/20 border border-white/10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <GradientButton variant="primary" size="lg">
              {t('hero.joinButton')}
            </GradientButton>
            <GlassmorphicButton
              variant="secondary"
              className="text-lg px-8 py-6 h-auto min-h-[44px] font-medium text-white bg-card/20 backdrop-blur-sm border-border/30"
            >
              {t('hero.watchButton')}
            </GlassmorphicButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          style={{ border: '2px solid rgba(255, 255, 255, 0.5)' }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

const ServiceTimesSection: React.FC = () => {
  const ref = useRef(null)
  const { t } = useTranslation()
  const isInView = useInView(ref, { once: true })

  return (
    <section id="services" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contactData.church.serviceTimes.schedule.map((service, index) => (
            <motion.div
              key={service.day.en}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <GlassmorphicCard className="h-full p-6 flex flex-col">
                <div className="text-center flex-1">
                  <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{t(`services.${service.day.en.toLowerCase()}`)}</h3>
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-primary">{service.time}</p>
                  </div>
                </div>
                <GradientButton variant="primary" size="sm" className="w-full mt-auto">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('services.addToCalendar')}
                </GradientButton>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const SermonsSection: React.FC = () => {
  const ref = useRef(null)
  const { t } = useTranslation()
  const isInView = useInView(ref, { once: true })
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null)

  const sermons: Sermon[] = React.useMemo(() => [
    {
      id: '1',
      title: t('sermons.walkingInFaithTitle'),
      speaker: t('sermons.walkingInFaithSpeaker'),
      date: '2024-01-14',
      duration: '45:30',
      audioUrl: '/audio/sermon1.mp3',
      videoUrl: '/video/sermon1.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: t('sermons.walkingInFaithDescription'),
      tags: ['Faith', 'Trust', 'Spiritual Growth']
    },
    {
      id: '2',
      title: t('sermons.powerOfPrayerTitle'),
      speaker: t('sermons.powerOfPrayerSpeaker'),
      date: '2024-01-07',
      duration: '38:15',
      audioUrl: '/audio/sermon2.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: t('sermons.powerOfPrayerDescription'),
      tags: ['Prayer', 'Spiritual Discipline', 'Relationship with God']
    },
    {
      id: '3',
      title: t('sermons.loveInActionTitle'),
      speaker: t('sermons.loveInActionSpeaker'),
      date: '2023-12-31',
      duration: '42:20',
      audioUrl: '/audio/sermon3.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: t('sermons.loveInActionDescription'),
      tags: ['Love', 'Service', 'Community']
    }
  ], [t])

  useEffect(() => {
    if (sermons.length > 0) {
      setSelectedSermon(sermons[0])
    }
  }, [sermons])

  return (
    <section id="sermons" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('sermons.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('sermons.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {selectedSermon && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AudioPlayer sermon={selectedSermon} />
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {selectedSermon.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedSermon.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSermon.tags.map((tag) => (
                      <GlassmorphicBadge key={tag} variant="secondary">
                        {tag}
                      </GlassmorphicBadge>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {t('sermons.sermonLibrary')}
            </h3>
            {sermons.map((sermon, index) => (
              <motion.div
                key={sermon.id}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <GlassmorphicCard
                  className={`cursor-pointer p-4 ${
                    selectedSermon?.id === sermon.id ? 'ring-2 ring-primary/50' : ''
                  }`}
                  onClick={() => setSelectedSermon(sermon)}
                >
                  <div className="flex space-x-4">
                    <img
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">
                        {sermon.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {sermon.speaker}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatDate(sermon.date)}</span>
                        <span>{sermon.duration}</span>
                      </div>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const TestimonialsSection: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Rustam',
      role: 'Church Member from Baku',
      content: 'I was healed from a torn coronary artery despite no hope from doctors. Moved by this miracle, I accepted Christ, and my whole family followed. God&apos;s power is real!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5
    },
    {
      id: '2',
      name: 'Rovshan',
      role: 'New Believer from Baku',
      content: 'After accepting Christ, my father heard about Christianity and said, "Introduce me to Jesus." He was eager to learn more about this faith that changed my life.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5
    },
    {
      id: '3',
      name: 'Ilkin',
      role: 'Seeker from Lankaran',
      content: 'I received a Bible and meet with the church often, asking many questions about faith. Sometimes I say, &quot;I hope I&apos;m not bothering you with all my questions,&quot; but my curiosity is drawing me closer to Christ.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="community" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Lives Transformed
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from members of our church family about their experiences and how God is working in their lives.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <GlassmorphicCard className="relative overflow-hidden p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
                
                <blockquote className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
                  &quot;{testimonials[currentTestimonial].content}&quot;
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                    />
                    <AvatarFallback>
                      {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-muted-foreground">
                      {testimonials[currentTestimonial].role}
                    </p>
                    <div className="flex space-x-1 mt-1">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center space-x-4 mt-8">
              <GlassmorphicButton
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="rounded-full w-10 h-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </GlassmorphicButton>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                      index === currentTestimonial
                        ? 'bg-primary border-primary shadow-lg'
                        : 'bg-gray-300 dark:bg-gray-400 border-gray-400 dark:border-gray-300 hover:bg-gray-400 dark:hover:bg-gray-300'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              <GlassmorphicButton
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="rounded-full w-10 h-10"
              >
                <ChevronRight className="w-4 h-4" />
              </GlassmorphicButton>
            </div>
          </GlassmorphicCard>
        </div>
      </div>
    </section>
  )
}

const EventsSection: React.FC = () => {
  const ref = useRef(null)
  const { t } = useTranslation()
  const isInView = useInView(ref, { once: true })
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const events: Event[] = [
    {
      id: '1',
      title: t('events.communityOutreachTitle'),
      date: '2024-02-15',
      time: '9:00 AM',
      location: 'Baku City Center',
      description: t('events.communityOutreachDescription'),
      category: 'outreach',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      registrationRequired: true,
      spotsAvailable: 25
    },
    {
      id: '2',
      title: t('events.youthRetreatTitle'),
      date: '2024-02-22',
      time: '6:00 PM',
      location: 'Mountain Resort',
      description: t('events.youthRetreatDescription'),
      category: 'youth',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      registrationRequired: true,
      spotsAvailable: 12
    },
    {
      id: '3',
      title: t('events.marriageSeminarTitle'),
      date: '2024-03-01',
      time: '7:00 PM',
      location: 'Church Main Hall',
      description: t('events.marriageSeminarDescription'),
      category: 'family',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      registrationRequired: true,
      spotsAvailable: 30
    },
    {
      id: '4',
      title: t('events.easterServiceTitle'),
      date: '2024-03-31',
      time: '10:00 AM',
      location: 'Church Sanctuary',
      description: t('events.easterServiceDescription'),
      category: 'worship',
      image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      registrationRequired: false
    }
  ]

  const categories = [
    { value: 'all', label: t('events.allEvents') },
    { value: 'worship', label: t('events.worship') },
    { value: 'youth', label: t('events.youth') },
    { value: 'family', label: t('events.family') },
    { value: 'outreach', label: t('events.outreach') }
  ]

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="events" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('events.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('events.subtitle')}
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder={t('events.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 search-input"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-card border border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dropdown-menu backdrop-blur-xl z-[100]">
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value} className="hover:bg-white/20">
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <GlassmorphicCard className="h-full overflow-hidden">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <GlassmorphicBadge className="absolute top-4 left-4 capitalize">
                    {event.category}
                  </GlassmorphicBadge>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {event.description}
                  </p>

                  {event.registrationRequired && event.spotsAvailable && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {event.spotsAvailable} {t('events.spotsAvailable')}
                    </p>
                  )}

                  <GradientButton variant="primary" size="sm" className="w-full">
                    {event.registrationRequired ? t('events.registerNow') : t('events.learnMore')}
                  </GradientButton>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {t('events.noEventsFound')}
            </h3>
            <p className="text-muted-foreground">
              {t('events.noEventsDescription')}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

const ContactSection: React.FC = () => {
  const { theme } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassmorphicCard className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`bg-input border border-border text-foreground placeholder:text-muted-foreground ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`bg-input border border-border text-foreground placeholder:text-muted-foreground ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-input border border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={`bg-input border border-border text-foreground placeholder:text-muted-foreground ${errors.subject ? 'border-red-500' : ''}`}
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-500 mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`bg-input border border-border text-foreground placeholder:text-muted-foreground ${errors.message ? 'border-red-500' : ''}`}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">{errors.message}</p>
                  )}
                </div>

                <GlassmorphicButton
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </GlassmorphicButton>

                {submitStatus === 'success' && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent successfully!</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    <span>Failed to send message. Please try again.</span>
                  </div>
                )}
              </form>
            </GlassmorphicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <GlassmorphicCard className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-100/50 dark:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Address</h4>
                    <p className="text-muted-foreground">
                      {contactData.church.address.street}<br />
                      {contactData.church.address.city}, {contactData.church.address.country} {contactData.church.address.postalCode}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-white/20"></div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-100/50 dark:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <AnimatedLink href={`tel:${contactData.church.phone}`} className="text-muted-foreground">
                      {contactData.church.phone}
                    </AnimatedLink>
                  </div>
                </div>

                <div className="h-px bg-white/20"></div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-100/50 dark:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <AnimatedLink href={`mailto:${contactData.church.email}`} className="text-muted-foreground">
                      {contactData.church.email}
                    </AnimatedLink>
                  </div>
                </div>

                <div className="h-px bg-white/20"></div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-100/50 dark:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center">
                    <Youtube className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">YouTube</h4>
                    <AnimatedLink href={contactData.church.socialMedia.youtube.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground">
                      {contactData.church.socialMedia.youtube.name}
                    </AnimatedLink>
                  </div>
                </div>

                <div className="h-px bg-white/20"></div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-100/50 dark:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center">
                    <Facebook className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Facebook</h4>
                    <AnimatedLink href={contactData.church.socialMedia.facebook.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground">
                      {contactData.church.socialMedia.facebook.name}
                    </AnimatedLink>
                  </div>
                </div>

                <div className="h-px bg-white/20"></div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-100/50 dark:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Instagram</h4>
                    <AnimatedLink href={contactData.church.socialMedia.instagram.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground">
                      {contactData.church.socialMedia.instagram.name}
                    </AnimatedLink>
                  </div>
                </div>

                <div className="h-px bg-white/20"></div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-100/50 dark:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">TikTok</h4>
                    <AnimatedLink href={contactData.church.socialMedia.tiktok.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground">
                      {contactData.church.socialMedia.tiktok.name}
                    </AnimatedLink>
                  </div>
                </div>

                <div className="h-px bg-white/20"></div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-100/50 dark:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Office Hours</h4>
                    <div className="text-muted-foreground space-y-1">
                      <p>{contactData.church.officeHours.weekdays}</p>
                      <p>{contactData.church.officeHours.saturday}</p>
                      <p>{contactData.church.officeHours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>

            <GlassmorphicCard className="p-6">
              <LeafletMap theme={theme} />
            </GlassmorphicCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const Footer: React.FC = () => {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.jpg" alt="Grace Church Baku" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-bold text-xl text-foreground">Grace Church Baku</span>
            </div>
            <p className="text-muted-foreground">
              A community of faith, hope, and love in the heart of Baku.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><AnimatedLink href="#home">Home</AnimatedLink></li>
              <li><AnimatedLink href="#about">About</AnimatedLink></li>
              <li><AnimatedLink href="#services">Services</AnimatedLink></li>
              <li><AnimatedLink href="#sermons">Sermons</AnimatedLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Ministries</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><AnimatedLink href="#">Youth Ministry</AnimatedLink></li>
              <li><AnimatedLink href="#">Children&apos;s Ministry</AnimatedLink></li>
              <li><AnimatedLink href="#">Women&apos;s Ministry</AnimatedLink></li>
              <li><AnimatedLink href="#">Men&apos;s Ministry</AnimatedLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>{contactData.church.address.street}</li>
              <li>{contactData.church.address.city}, {contactData.church.address.country}</li>
              <li>
                <a href={`tel:${contactData.church.phone}`} className="hover:text-primary transition-colors cursor-pointer">
                  {contactData.church.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactData.church.email}`} className="hover:text-primary transition-colors cursor-pointer">
                  {contactData.church.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground">
            © 2025 Grace Church Baku. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <AnimatedLink href="#" className="text-muted-foreground">
              Privacy Policy
            </AnimatedLink>
            <AnimatedLink href="#" className="text-muted-foreground">
              Terms of Service
            </AnimatedLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

const OurMissionSection: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="mission" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            To share the gospel, disciple believers, and plant churches across Azerbaijan, trusting God&apos;s Word to transform lives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <GlassmorphicCard className="h-full p-8 text-center">
              <div className="w-16 h-16 bg-slate-100/50 dark:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Share the Gospel</h3>
              <p className="text-muted-foreground">
                We distribute Bibles and build relationships to share the love of Christ with the people of Azerbaijan.
              </p>
            </GlassmorphicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassmorphicCard className="h-full p-8 text-center">
              <div className="w-16 h-16 bg-slate-100/50 dark:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Disciple Believers</h3>
              <p className="text-muted-foreground">
                We nurture new believers through Bible studies and prayer, helping them grow in their faith journey.
              </p>
            </GlassmorphicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <GlassmorphicCard className="h-full p-8 text-center">
              <div className="w-16 h-16 bg-slate-100/50 dark:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Plant Churches</h3>
              <p className="text-muted-foreground">
                We establish new churches in unreached areas like Baku, Lankaran, and Barda, bringing hope to communities.
              </p>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const NeedsSection: React.FC = () => {
  const ref = useRef(null)
  const { t } = useTranslation()
  const isInView = useInView(ref, { once: true })

  const needs = [
    {
      title: t('needs.buildingTitle'),
      description: t('needs.buildingDescription'),
      icon: 'Church'
    },
    {
      title: t('needs.protectionTitle'),
      description: t('needs.protectionDescription'),
      icon: 'Shield'
    },
    {
      title: t('needs.resourcesTitle'),
      description: t('needs.resourcesDescription'),
      icon: 'BookOpen'
    }
  ]

  return (
    <section id="needs" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('needs.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('needs.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {needs.map((need, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <GlassmorphicCard className="h-full p-8 text-center">
                <div className="w-16 h-16 bg-slate-100/50 dark:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
                  {need.icon === 'Church' && <CheckCircle className="w-8 h-8 text-primary" />}
                  {need.icon === 'Shield' && <CheckCircle className="w-8 h-8 text-primary" />}
                  {need.icon === 'BookOpen' && <CheckCircle className="w-8 h-8 text-primary" />}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{need.title}</h3>
                <p className="text-muted-foreground">
                  {need.description}
                </p>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <GradientButton variant="primary" size="lg" className="text-lg px-8 py-6 h-auto min-h-[44px] font-medium">
            {t('needs.supportButton')}
          </GradientButton>
        </motion.div>
      </div>
    </section>
  )
}

const GraceChurchWebsite: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <HeroSection />
        <OurMissionSection />
        <ServiceTimesSection />
        <SermonsSection />
        <TestimonialsSection />
        <EventsSection />
        <NeedsSection />
        <ContactSection />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default GraceChurchWebsite
