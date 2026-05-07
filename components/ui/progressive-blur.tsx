import { cn } from '@/lib/utils'

interface ProgressiveBlurProps {
  className?: string
  direction?: 'left' | 'right' | 'top' | 'bottom'
  blurIntensity?: number
}

export function ProgressiveBlur({
  className,
  direction = 'left',
  blurIntensity = 1,
}: ProgressiveBlurProps) {
  const gradientMap = {
    left:   'to right',
    right:  'to left',
    top:    'to bottom',
    bottom: 'to top',
  }

  return (
    <div
      className={cn('pointer-events-none', className)}
      style={{
        backdropFilter: `blur(${blurIntensity * 4}px)`,
        WebkitBackdropFilter: `blur(${blurIntensity * 4}px)`,
        maskImage: `linear-gradient(${gradientMap[direction]}, black, transparent)`,
        WebkitMaskImage: `linear-gradient(${gradientMap[direction]}, black, transparent)`,
      }}
    />
  )
}
