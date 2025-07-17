"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { 
  ArrowRight, 
  LoaderCircle, 
  Church, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  Users, 
  BookOpen, 
  Star,
  Menu,
  X,
  Sun,
  Moon,
  Play,
  Quote,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"

// Glow component
const Glow = ({ className, variant = "top" }: { className?: string; variant?: "top" | "center" | "bottom" }) => (
  <div className={cn("absolute w-full", variant === "top" && "top-0", variant === "center" && "top-[50%]", variant === "bottom" && "bottom-0", className)}>
    <div className={cn(
      "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/.5)_10%,_hsl(var(--primary)/0)_60%)] sm:h-[512px]",
      variant === "center" && "-translate-y-1/2"
    )} />
    <div className={cn(
      "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/.3)_10%,_hsl(var(--primary)/0)_60%)] sm:h-[256px]",
      variant === "center" && "-translate-y-1/2"
    )} />
  </div>
)

// Newsletter Section Component
const NewsletterSection = ({ 
  title = "Stay Connected with Grace Church",
  onSubscribe,
  backgroundEffect = true,
  className,
  ...props
}: {
  title?: string
  onSubscribe?: (email: string) => Promise<{ success: boolean; error?: string }>
  backgroundEffect?: boolean
  className?: string
}) => {
  const [formState, setFormState] = useState({
    email: "",
    status: "idle" as "idle" | "loading" | "success" | "error",
    message: "",
  })

  const isLoading = formState.status === "loading"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!onSubscribe) return

    setFormState((prev) => ({ ...prev, status: "loading", message: "" }))

    try {
      const result = await onSubscribe(formState.email)
      if (!result.success) {
        setFormState((prev) => ({
          ...prev,
          status: "error",
          message: result.error || "",
        }))
      } else {
        setFormState({
          email: "",
          status: "success",
          message: "Thanks for subscribing to our newsletter!",
        })
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        status: "error",
        message: error instanceof Error ? error.message : "Failed to subscribe",
      }))
    }
  }

  return (
    <section className={cn("relative bg-background text-foreground py-12 px-4 md:py-24 lg:py-32 overflow-hidden", className)} {...props}>
      <div className="dark relative overflow-hidden rounded-xl bg-slate-900 px-4 py-10 sm:px-8">
        {backgroundEffect && (
          <div className="pointer-events-none absolute -right-64 -top-48" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="856" height="745" fill="none">
              <g filter="url(#ill-a)">
                <path fill="url(#ill-b)" fillRule="evenodd" d="m56 88 344 212-166 188L56 88Z" clipRule="evenodd" />
              </g>
              <g filter="url(#ill-c)">
                <path fill="url(#ill-d)" fillRule="evenodd" d="m424 257 344 212-166 188-178-400Z" clipRule="evenodd" />
              </g>
              <defs>
                <linearGradient id="ill-b" x1="210.5" x2="210.5" y1="88" y2="467" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff" stopOpacity="0.64" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="ill-d" x1="578.5" x2="578.5" y1="257" y2="636" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff" stopOpacity="0.64" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <filter id="ill-a" width="520" height="576" x="-32" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_244_5" stdDeviation="44" />
                </filter>
                <filter id="ill-c" width="520" height="576" x="336" y="169" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_244_5" stdDeviation="44" />
                </filter>
              </defs>
            </svg>
          </div>
        )}
        <h2 className="mb-6 text-xl/[1.1] font-extrabold tracking-tight text-primary-foreground md:text-2xl/[1.1]">
          {title}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="inline-flex gap-2">
              <Input
                className="flex-1 border-zinc-600/65 bg-zinc-700/30 text-zinc-100 placeholder:text-zinc-500 md:min-w-64"
                placeholder="Your email"
                type="email"
                value={formState.email}
                onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                disabled={isLoading}
                required
              />
              <Button type="submit" className="group relative" disabled={isLoading}>
                <span className={cn("inline-flex items-center", isLoading && "text-transparent")}>
                  Subscribe
                  <ArrowRight className="-me-1 ms-2 h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
                </span>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LoaderCircle className="animate-spin" size={16} strokeWidth={2} />
                  </div>
                )}
              </Button>
            </div>
            {formState.message && (
              <p className={cn("mt-2 text-xs", formState.status === "error" ? "text-destructive" : "text-muted-foreground")}>
                {formState.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

// Main Church Website Component
export function GraceChurchWebsite() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])

  useEffect(() => {
    setIsLoaded(true)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const services = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Sunday Service",
      description: "Join us every Sunday at 10:00 AM for worship, fellowship, and inspiring messages from God's Word.",
      time: "10:00 AM"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Prayer Meeting",
      description: "Come together in prayer every Wednesday evening to seek God's guidance and blessing.",
      time: "7:00 PM"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Bible Study",
      description: "Deepen your understanding of Scripture through our interactive Bible study sessions.",
      time: "6:30 PM"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Church Member",
      content: "Grace Church has been a blessing to our family. The community here is so welcoming and supportive.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Youth Leader",
      content: "The youth programs here have helped me grow in my faith and develop lasting friendships.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Volunteer",
      content: "Serving in the community through Grace Church has been one of the most rewarding experiences of my life.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ]

  const stats = [
    { icon: <Users />, value: 500, label: "Active Members", suffix: "+" },
    { icon: <Heart />, value: 15, label: "Years Serving", suffix: "" },
    { icon: <BookOpen />, value: 200, label: "Bible Studies", suffix: "+" },
    { icon: <Star />, value: 98, label: "Satisfaction", suffix: "%" },
  ]

  const StatCounter = ({ icon, value, label, suffix, delay }: {
    icon: React.ReactNode
    value: number
    label: string
    suffix: string
    delay: number
  }) => {
    const countRef = useRef(null)
    const isInView = useInView(countRef, { once: false })
    const [hasAnimated, setHasAnimated] = useState(false)

    const springValue = useSpring(0, {
      stiffness: 50,
      damping: 10,
    })

    useEffect(() => {
      if (isInView && !hasAnimated) {
        springValue.set(value)
        setHasAnimated(true)
      } else if (!isInView && hasAnimated) {
        springValue.set(0)
        setHasAnimated(false)
      }
    }, [isInView, value, springValue, hasAnimated])

    const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

    return (
      <motion.div
        className="bg-background/50 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center group hover:bg-background transition-colors duration-300"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay },
          },
        }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <motion.div
          className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 transition-colors duration-300"
          whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
        >
          {icon}
        </motion.div>
        <motion.div ref={countRef} className="text-3xl font-bold text-foreground flex items-center">
          <motion.span>{displayValue}</motion.span>
          <span>{suffix}</span>
        </motion.div>
        <p className="text-muted-foreground text-sm mt-1">{label}</p>
        <motion.div className="w-10 h-0.5 bg-primary mt-3 group-hover:w-16 transition-all duration-300" />
      </motion.div>
    )
  }

  const mockSubscribe = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (email.includes('error')) {
      return { success: false, error: 'Something went wrong!' }
    }
    return { success: true }
  }

  return (
    <div className={cn("min-h-screen bg-background text-foreground", isDarkMode && "dark")}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Church className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Grace Church Baku</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-primary transition-colors">Home</a>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#services" className="hover:text-primary transition-colors">Services</a>
              <a href="#community" className="hover:text-primary transition-colors">Community</a>
              <a href="#events" className="hover:text-primary transition-colors">Events</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                <Moon className="h-4 w-4" />
              </div>
              
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#home" className="block hover:text-primary transition-colors">Home</a>
              <a href="#about" className="block hover:text-primary transition-colors">About</a>
              <a href="#services" className="block hover:text-primary transition-colors">Services</a>
              <a href="#community" className="block hover:text-primary transition-colors">Community</a>
              <a href="#events" className="block hover:text-primary transition-colors">Events</a>
              <a href="#contact" className="block hover:text-primary transition-colors">Contact</a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-70" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -100 }}
            animate={isLoaded ? { opacity: 0.3, scale: 1, x: 0 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={isLoaded ? { opacity: 0.2, scale: 1, x: 0 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Badge variant="outline" className="mb-6">
                  <span className="text-muted-foreground">Welcome to our community</span>
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              >
                Welcome to <span className="text-primary">Grace Church</span> Baku
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                className="text-lg text-muted-foreground max-w-lg"
              >
                A place where faith meets community. Join us in worship, fellowship, and service as we grow together in God's love.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                className="flex flex-wrap gap-4"
              >
                <Button size="lg" className="group bg-accent hover:bg-accent/90 text-white border-0">
                  Join Us Sunday
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="group bg-white/10 hover:bg-white/20 text-white border-white/30">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Online
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg">
                <div className="aspect-video relative overflow-hidden rounded-lg border border-border mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&h=600&fit=crop" 
                    alt="Church interior" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Sunday Service at 10:00 AM</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Bible Study every Wednesday</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Youth Programs & Community Outreach</span>
                  </div>
                </div>
              </div>
              <Glow className="opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"
          style={{ y: y2 }}
        />

        <motion.div
          className="container mx-auto max-w-6xl relative z-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <Badge variant="outline" className="mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Our Story
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About Grace Church</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              For over 15 years, Grace Church Baku has been a beacon of hope and faith in our community. 
              We believe in the transformative power of God's love and the importance of building meaningful 
              relationships that last a lifetime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {service.time}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate={isStatsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <StatCounter
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Community Stories */}
      <section id="community" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Users className="w-4 h-4 mr-2" />
              Community
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stories from Our Family</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear from members of our church family about how God has worked in their lives 
              and how our community has supported them on their journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-primary mb-4" />
                    <p className="text-muted-foreground mb-6">{testimonial.content}</p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Upcoming Events</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join us for special events, community gatherings, and opportunities to grow in faith together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Easter Celebration",
                date: "April 9, 2024",
                time: "10:00 AM",
                description: "Join us for a special Easter service celebrating the resurrection of Jesus Christ.",
                image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&h=300&fit=crop"
              },
              {
                title: "Community Outreach",
                date: "April 15, 2024",
                time: "9:00 AM",
                description: "Help us serve our local community through food distribution and support services.",
                image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop"
              },
              {
                title: "Youth Camp",
                date: "July 20-25, 2024",
                time: "All Day",
                description: "A week-long camp for youth to grow in faith, make friends, and have fun.",
                image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=300&fit=crop"
              }
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                      <Clock className="w-4 h-4 ml-2" />
                      {event.time}
                    </div>
                    <CardTitle className="mb-3">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                    <Button className="mt-4 w-full">Learn More</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              Contact
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We'd love to hear from you. Reach out with any questions or to learn more about our community.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Visit Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-muted-foreground">123 Faith Street, Baku, Azerbaijan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-muted-foreground">+994 12 345 6789</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">info@gracechurchbaku.org</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Service Times</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span>Sunday Worship</span>
                    <span className="text-primary font-semibold">10:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span>Wednesday Prayer</span>
                    <span className="text-primary font-semibold">7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span>Friday Bible Study</span>
                    <span className="text-primary font-semibold">6:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">First Name</label>
                      <Input placeholder="John" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Last Name</label>
                      <Input placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input placeholder="How can we help you?" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea placeholder="Tell us more about your inquiry..." className="min-h-[120px]" />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection onSubscribe={mockSubscribe} />

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Church className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Grace Church Baku</span>
              </div>
              <p className="text-muted-foreground">
                A community of faith, hope, and love in the heart of Baku.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">About Us</a>
                <a href="#services" className="block text-muted-foreground hover:text-primary transition-colors">Services</a>
                <a href="#events" className="block text-muted-foreground hover:text-primary transition-colors">Events</a>
                <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ministries</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Youth Ministry</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Children's Ministry</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Community Outreach</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Music Ministry</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                <p className="text-muted-foreground">123 Faith Street</p>
                <p className="text-muted-foreground">Baku, Azerbaijan</p>
                <p className="text-muted-foreground">+994 12 345 6789</p>
                <p className="text-muted-foreground">info@gracechurchbaku.org</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Grace Church Baku. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function GraceChurchDemo() {
  return <GraceChurchWebsite />
}
