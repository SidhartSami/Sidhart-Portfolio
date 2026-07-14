"use client"

import { useEffect, useId, useRef } from "react"
import type { Transition } from "motion/react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { metalClickSound } from "@/lib/soundcn/metal-click"
import { useSound } from "@/hooks/soundcn/use-sound"

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
}

export function ChanhDaiMarkIsometric() {
  const id = useId()
  const ids = {
    facePattern: `ncdai-face-pattern-${id}`,
    faceFill: `ncdai-face-fill-${id}`,
    stroke: `ncdai-stroke-${id}`,
    radialGradient: `ncdai-radial-gradient-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)
  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(useTransform(mouseX, [0, 1], [0, 556]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  const cy = useSpring(useTransform(mouseY, [0, 1], [0, 354]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      return
    }

    if (window.matchMedia("(hover: none)").matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [shouldReduceMotion, isInView, mouseX, mouseY])

  const leftOutlineD = `
    M330 212 L252 257 L226 242 L278 212 L252 197 L200 227 L122 182 L200 137 L226 152 L174 182 L200 197 L252 167 Z
    M330 212 L330 232 L252 277 L226 262 L226 242
    M252 277 L252 257
    M278 212 L278 232 L252 217 L200 247 L122 202 L122 182
    M252 217 L252 197
    M200 247 L200 227
    M226 152 L226 172 L174 202 L174 182
  `.trim()

  const rightOutlineD = `
    M434 152 L356 197 L330 182 L382 152 L356 137 L304 167 L226 122 L304 77 L330 92 L278 122 L304 137 L356 107 Z
    M434 152 L434 172 L356 217 L330 202 L330 182
    M356 217 L356 197
    M382 152 L382 172 L356 157 L304 187 L226 142 L226 122
    M356 157 L356 137
    M304 187 L304 167
    M330 92 L330 112 L278 142 L278 122
  `.trim()

  const tapTransition: Transition = {
    type: "spring",
    mass: 0.5,
    damping: 18,
    stiffness: 200,
  }

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
      style={{ transform: "scale(1.5)", transformOrigin: "center" }}
      viewBox="0 0 556 354"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      onTap={() => play()}
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        {/* Combined 3D Isometric "SS" Face Fills styled by class and pattern */}
        <g id={ids.faceFill}>
          {/* Left "S" Faces */}
          <path d="M330 212 L252 257 L226 242 L278 212 L252 197 L200 227 L122 182 L200 137 L226 152 L174 182 L200 197 L252 167 Z" />
          <path d="M252 257 L226 242 L226 262 L252 277 Z" />
          <path d="M278 212 L252 197 L252 217 L278 232 Z" />
          <path d="M200 227 L122 182 L122 202 L200 247 Z" />
          <path d="M330 212 L252 257 L252 277 L330 232 Z" />
          <path d="M252 197 L200 227 L200 247 L252 217 Z" />
          <path d="M226 152 L174 182 L174 202 L226 172 Z" />

          {/* Right "S" Faces */}
          <path d="M434 152 L356 197 L330 182 L382 152 L356 137 L304 167 L226 122 L304 77 L330 92 L278 122 L304 137 L356 107 Z" />
          <path d="M356 197 L330 182 L330 202 L356 217 Z" />
          <path d="M382 152 L356 137 L356 157 L382 172 Z" />
          <path d="M304 167 L226 122 L226 142 L304 187 Z" />
          <path d="M434 152 L356 197 L356 217 L434 172 Z" />
          <path d="M356 137 L304 167 L304 187 L356 157 Z" />
          <path d="M330 92 L278 122 L278 142 L330 112 Z" />
        </g>

        {/* Combined 3D Isometric "SS" Outlines */}
        <path
          id={ids.stroke}
          fill="none"
          strokeWidth="2"
          strokeLinejoin="round"
          d={`${leftOutlineD} ${rightOutlineD}`}
        />

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      {/* Grid lines */}
      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        <path d="M-477.55 756.57L1254.51 -243.41" />
        <path d="M977.37 788.58L-754.67 -211.42" />
        <path d="M1143.65 692.58L-588.39 -307.42" />
      </g>

      {/* Group to handle keyboard key press animation on tap */}
      <motion.g
        whileTap={{ y: 16 }}
        transition={tapTransition}
      >
        {/* Mask out background grid lines */}
        <use href={`#${ids.faceFill}`} className="fill-background" />

        {/* Render face textures */}
        <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />

        {/* Render wireframe outlines */}
        <use href={`#${ids.stroke}`} stroke="var(--stroke)" />
        <use href={`#${ids.stroke}`} stroke={`url(#${ids.radialGradient})`} />
      </motion.g>
    </motion.svg>
  )
}
