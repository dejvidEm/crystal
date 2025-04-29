"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharper rendering
    const setCanvasDimensions = () => {
      const pixelRatio = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.scale(pixelRatio, pixelRatio)
    }

    setCanvasDimensions()

    // Throttle resize events for better performance
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setCanvasDimensions()
      }, 200)
    }

    window.addEventListener("resize", handleResize)

    // Particle class with optimized rendering
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.size = Math.random() * 1.5 + 0.2
        this.speedX = Math.random() * 0.3 - 0.15
        this.speedY = Math.random() * 0.3 - 0.15
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.15})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > window.innerWidth) {
          this.speedX = -this.speedX
        }

        if (this.y < 0 || this.y > window.innerHeight) {
          this.speedY = -this.speedY
        }
      }
    }

    // Create particles - reduce count on mobile for better performance
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 40 : 80
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Pre-calculate gradient for better performance
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight)
      gradient.addColorStop(0, "rgba(10, 10, 15, 1)")
      gradient.addColorStop(1, "rgba(5, 5, 10, 1)")
      return gradient
    }

    const backgroundGradient = createGradient()

    // Animation loop with performance optimizations
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw background
      ctx.fillStyle = backgroundGradient
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Update and batch draw particles
      ctx.save()
      particles.forEach((particle) => {
        particle.update()
      })

      // Batch similar operations for better performance
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw connections with distance optimization
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = dx * dx + dy * dy // Avoid square root for performance

          if (distance < 10000) {
            // 100 squared
            const opacity = 0.05 * (1 - distance / 10000)
            ctx.globalAlpha = opacity
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.restore()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90"></div>
    </motion.div>
  )
}
