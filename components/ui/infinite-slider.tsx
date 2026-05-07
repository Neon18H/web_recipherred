'use client'

import React, { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface InfiniteSliderProps {
  children: React.ReactNode
  speed?: number
  speedOnHover?: number
  gap?: number
  className?: string
  direction?: 'left' | 'right'
}

export function InfiniteSlider({
  children,
  speed = 40,
  speedOnHover,
  gap = 16,
  className,
  direction = 'left',
}: InfiniteSliderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const currentSpeed = isHovered && speedOnHover ? speedOnHover : speed
  const duration = `${currentSpeed}s`

  const items = React.Children.toArray(children)

  return (
    <div
      ref={wrapperRef}
      className={cn('relative flex overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ gap }}>
      <div
        className="flex shrink-0 items-center"
        style={{
          gap,
          animation: `infinite-scroll-${direction} ${duration} linear infinite`,
        }}>
        {items.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {item}
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 items-center"
        style={{
          gap,
          animation: `infinite-scroll-${direction} ${duration} linear infinite`,
        }}>
        {items.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {item}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes infinite-scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        @keyframes infinite-scroll-right {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
