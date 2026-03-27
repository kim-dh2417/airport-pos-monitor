import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../lib/utils'

const buttonVariants = {
  primary:
    'bg-primary text-slate-950 hover:bg-[#95d4ff] border-transparent',
  secondary:
    'bg-white/5 text-foreground hover:bg-white/10 border-border',
  ghost:
    'bg-transparent text-foreground hover:bg-white/6 border-transparent',
  danger:
    'bg-danger text-white hover:brightness-110 border-transparent',
}

const buttonSizes = {
  md: 'h-11 px-4 text-sm',
  sm: 'h-9 px-3 text-sm',
  icon: 'h-10 w-10',
}

type Variant = keyof typeof buttonVariants
type Size = keyof typeof buttonSizes

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & BaseProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60',
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  ),
)

Button.displayName = 'Button'

interface ButtonLinkProps extends LinkProps, BaseProps {
  children: React.ReactNode
}

export function ButtonLink({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  )
}
