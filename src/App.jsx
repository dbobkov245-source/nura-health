import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Activity, Brain, Dna, Heart, Shield, Zap, ChevronRight, Menu, X, Check, Clock, Users } from 'lucide-react'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

// Noise Overlay Component
const NoiseOverlay = () => (
  <div className="noise-overlay">
    <svg filter="url(#noise)">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
)

// Navbar Component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar-floating fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full transition-all duration-300 ${scrolled ? 'scrolled' : 'bg-transparent'}`}>
      <div className="flex items-center gap-8">
        <span className={`font-heading font-bold text-xl ${scrolled ? 'text-moss' : 'text-white'}`}>Nura Health</span>
        
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className={`text-sm font-medium ${scrolled ? 'text-charcoal/70' : 'text-white/70'} hover:text-clay transition-colors`}>Возможности</a>
          <a href="#philosophy" className={`text-sm font-medium ${scrolled ? 'text-charcoal/70' : 'text-white/70'} hover:text-clay transition-colors`}>Философия</a>
          <a href="#protocol" className={`text-sm font-medium ${scrolled ? 'text-charcoal/70' : 'text-white/70'} hover:text-clay transition-colors`}>Протокол</a>
          <a href="#pricing" className={`text-sm font-medium ${scrolled ? 'text-charcoal/70' : 'text-white/70'} hover:text-clay transition-colors`}>Цены</a>
        </div>

        <button className="magnetic-btn bg-clay text-white px-6 py-2 rounded-full font-heading font-semibold text-sm">
          <span className="btn-bg bg-[#b54d2c]"></span>
          <span>Записаться</span>
        </button>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} className={scrolled ? 'text-charcoal' : 'text-white'} /> : <Menu size={24} className={scrolled ? 'text-charcoal' : 'text-white'} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-cream rounded-2xl p-6 shadow-xl md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#features" className="text-charcoal/70 hover:text-clay" onClick={() => setMenuOpen(false)}>Возможности</a>
            <a href="#philosophy" className="text-charcoal/70 hover:text-clay" onClick={() => setMenuOpen(false)}>Философия</a>
            <a href="#protocol" className="text-charcoal/70 hover:text-clay" onClick={() => setMenuOpen(false)}>Протокол</a>
            <a href="#pricing" className="text-charcoal/70 hover:text-clay" onClick={() => setMenuOpen(false)}>Цены</a>
          </div>
        </div>
      )}
    </nav>
  )
}

// Hero Section
const Hero = () => {
  const heroRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-text', 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-end pb-20 px-8 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=1920&q=80" 
          alt="Dark Forest" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-moss via-moss/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 max-w-4xl">
        <h1 className="font-heading text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
          <span className="hero-text block">Природа — это</span>
          <span className="hero-text font-drama text-6xl md:text-8xl lg:text-9xl text-clay block mt-2">Алгоритм.</span>
        </h1>
        <p className="hero-text text-white/80 text-lg md:text-xl max-w-xl mb-8 font-heading">
          Точное долголетие, основанное на биологических данных. Мы расшифровываем вашу уникальную биологию для персонализированного здоровья.
        </p>
        <button className="hero-text magnetic-btn bg-clay text-white px-8 py-4 rounded-full font-heading font-semibold text-lg">
          <span className="btn-bg bg-[#b54d2c]"></span>
          <span className="flex items-center gap-2">
            Начать диагностику <ChevronRight size={20} />
          </span>
        </button>
      </div>
    </section>
  )
}

// Features Section
const Features = () => {
  const [activeCard, setActiveCard] = useState(0)
  const [typewriterText, setTypewriterText] = useState('')
  const messages = [
    'Оптимизация циркадного ритма...',
    'Анализ маркеров воспаления...',
    'Персонализация протокола...',
    'Мониторинг эпигенетики...'
  ]

  // Diagnostic Shuffler
  const diagnosticLabels = ['Эпигенетический возраст', 'Микробиом скор', 'Оптимизация кортизола']

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Typewriter effect
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      const currentMsg = messages[Math.floor(Date.now() / 4000) % messages.length]
      setTypewriterText(currentMsg.slice(0, index + 1))
      index = (index + 1) % (currentMsg.length + 10)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  const [selectedDay, setSelectedDay] = useState(2)

  return (
    <section id="features" className="py-24 px-8 bg-cream">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-16 text-center">
          Точность в каждой детали
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Diagnostic Shuffler */}
          <div className="feature-card bg-white rounded-[2rem] p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-moss/10 flex items-center justify-center">
                <Dna className="text-moss" size={20} />
              </div>
              <span className="font-heading font-semibold text-charcoal">Интеллект аудита</span>
            </div>
            
            <div className="relative h-40 mb-4">
              {diagnosticLabels.map((label, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-x-4 bg-moss/5 rounded-xl p-4 transition-all duration-500 ${idx === activeCard ? 'top-0 z-10' : idx === (activeCard + 1) % 3 ? 'top-2 z-0 opacity-50' : 'top-4 z-0 opacity-30'}`}
                  style={{ transform: idx === activeCard ? 'translateY(0)' : `translateY(${idx === (activeCard + 1) % 3 ? -20 : -40}px)` }}
                >
                  <span className="font-data text-sm text-moss">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-charcoal/60 text-sm">Циклическая диагностика биомаркеров в реальном времени</p>
          </div>

          {/* Card 2: Telemetry Typewriter */}
          <div className="feature-card bg-white rounded-[2rem] p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-moss/10 flex items-center justify-center">
                <Activity className="text-moss" size={20} />
              </div>
              <span className="font-heading font-semibold text-charcoal">Нейро-поток</span>
            </div>
            
            <div className="bg-charcoal rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-clay rounded-full animate-pulse"></span>
                <span className="font-data text-xs text-clay">Live Feed</span>
              </div>
              <p className="font-data text-white text-sm">
                {typewriterText}<span className="text-clay animate-pulse">|</span>
              </p>
            </div>
            <p className="text-charcoal/60 text-sm">Мониторинг нейромаркеров и физиологических показателей</p>
          </div>

          {/* Card 3: Cursor Scheduler */}
          <div className="feature-card bg-white rounded-[2rem] p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-moss/10 flex items-center justify-center">
                <Brain className="text-moss" size={20} />
              </div>
              <span className="font-heading font-semibold text-charcoal">Адаптивный режим</span>
            </div>
            
            <div className="bg-moss/5 rounded-xl p-4 mb-4">
              <div className="flex justify-between gap-1 mb-3">
                {days.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDay(idx)}
                    className={`w-8 h-8 rounded-full text-xs font-data transition-all ${selectedDay === idx ? 'bg-clay text-white scale-95' : 'bg-moss/10 text-moss hover:bg-moss/20'}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <button className="w-full bg-moss text-white py-2 rounded-lg font-heading text-sm font-medium hover:bg-[#253a2c] transition-colors">
                Сохранить протокол
              </button>
            </div>
            <p className="text-charcoal/60 text-sm">Персонализированное планирование вмешательств</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Philosophy Section
const Philosophy = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.philosophy-text',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="philosophy" className="py-32 px-8 bg-charcoal relative overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80" 
          alt="Organic Texture" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <p className="philosophy-text font-heading text-xl text-white/60 mb-4">Современная медицина спрашивает:</p>
        <p className="philosophy-text font-heading text-3xl md:text-4xl text-white/60 mb-12">Что не так с вашим здоровьем?</p>
        
        <p className="philosophy-text font-drama text-5xl md:text-7xl text-clay mb-4">Мы спрашиваем:</p>
        <p className="philosophy-text font-drama text-5xl md:text-7xl text-white">Что <span className="text-clay">оптимально</span>?</p>
      </div>
    </section>
  )
}

// Protocol Section
const Protocol = () => {
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            }
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  const steps = [
    { num: '01', title: 'Диагностика', desc: 'Комплексный анализ биомаркеров, генетики и образа жизни' },
    { num: '02', title: 'Анализ', desc: 'AI-обработка данных и построение индивидуальной модели' },
    { num: '03', title: 'Протокол', desc: 'Персонализированный план вмешательств и мониторинг' }
  ]

  return (
    <section id="protocol" className="py-32 px-8 bg-cream">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-16 text-center">
          Протокол
        </h2>

        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className="bg-white rounded-[2rem] p-8 shadow-lg flex items-start gap-6 hover:shadow-xl transition-shadow"
            >
              <span className="font-data text-4xl text-clay font-bold">{step.num}</span>
              <div>
                <h3 className="font-heading text-2xl font-bold text-charcoal mb-2">{step.title}</h3>
                <p className="text-charcoal/60">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Section
const Pricing = () => {
  const plans = [
    { name: 'Essential', price: '15 000', features: ['Базовый анализ', 'Генетический скрининг', 'Рекомендации'] },
    { name: 'Performance', price: '45 000', features: ['Полная диагностика', 'AI-аналитика', 'Персональный протокол', 'Мониторинг 3 мес'], popular: true },
    { name: 'Enterprise', price: '120 000', features: ['Все включено', 'Приоритетная поддержка', 'Годовое сопровождение', 'Семейный доступ'] }
  ]

  return (
    <section id="pricing" className="py-24 px-8 bg-cream">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-16 text-center">
          Выберите план
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={`relative rounded-[2rem] p-8 ${plan.popular ? 'bg-moss text-white scale-105 shadow-xl' : 'bg-white shadow-lg'}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-clay text-white px-4 py-1 rounded-full text-xs font-heading font-semibold">
                  Популярный
                </span>
              )}
              <h3 className={`font-heading text-2xl font-bold mb-4 ${plan.popular ? 'text-white' : 'text-charcoal'}`}>
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className={`font-drama text-5xl ${plan.popular ? 'text-white' : 'text-charcoal'}`}>{plan.price}</span>
                <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-charcoal/60'}`}> ₽</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <Check size={16} className={plan.popular ? 'text-clay' : 'text-moss'} />
                    <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-charcoal/60'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full font-heading font-semibold transition-all ${plan.popular ? 'bg-clay text-white hover:bg-[#b54d2c]' : 'bg-moss text-white hover:bg-[#253a2c]'}`}>
                Выбрать
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => (
  <footer className="bg-charcoal rounded-t-[4rem] px-8 py-16">
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div>
          <span className="font-heading font-bold text-2xl text-white">Nura Health</span>
          <p className="text-white/60 mt-2 text-sm">Точное долголетие, основанное на науке</p>
        </div>
        
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Навигация</h4>
          <ul className="space-y-2 text-white/60 text-sm">
            <li><a href="#features" className="hover:text-clay">Возможности</a></li>
            <li><a href="#philosophy" className="hover:text-clay">Философия</a></li>
            <li><a href="#protocol" className="hover:text-clay">Протокол</a></li>
            <li><a href="#pricing" className="hover:text-clay">Цены</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Компания</h4>
          <ul className="space-y-2 text-white/60 text-sm">
            <li><a href="#" className="hover:text-clay">О нас</a></li>
            <li><a href="#" className="hover:text-clay">Команда</a></li>
            <li><a href="#" className="hover:text-clay">Контакты</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Контакты</h4>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>hello@nura.health</li>
            <li>+7 (999) 000-00-00</li>
            <li>Москва, Сити</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/40 text-sm">© 2026 Nura Health. Все права защищены.</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="font-data text-xs text-green-500">System Operational</span>
        </div>
      </div>
    </div>
  </footer>
)

// Main App
function App() {
  return (
    <div className="min-h-screen">
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}

export default App
