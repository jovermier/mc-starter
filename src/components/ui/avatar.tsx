/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from 'src/lib/utils';

type AvatarVariant = 'circular' | 'rounded' | 'square';
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const defaultSize: AvatarSize = 'sm';

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn('relative flex h-10 w-10 shrink-0 rounded-full', className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn('flex h-full w-full items-center justify-center bg-muted', className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const avatarBadgeVariants = cva(
  'absolute w-4 h-4 rounded-full bg-background flex items-stretch justify-stretch [&>*]:grow [&>*]:rounded-full',
  {
    variants: {
      position: {
        bottomLeft: 'bottom-0 -left-1',
        bottomRight: 'bottom-0 -right-1',
        topLeft: 'top-0 -left-1',
        topRight: 'top-0 -right-1',
      },
    },
    defaultVariants: {
      position: 'bottomLeft',
    },
  },
);

export interface AvatarBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarBadgeVariants> {
  size?: AvatarSize;
  children?: React.ReactNode;
}

const AvatarBadge = ({
  className,
  size = defaultSize,
  position,
  children,
  ...props
}: AvatarBadgeProps) => (
  <div
    className={cn(
      avatarBadgeVariants({ position }),
      size === 'xs' && 'text-xs',
      size === 'sm' && 'text-xs',
      size === 'md' && 'text-xs',
      size === 'lg' && 'text-lg',
      size === 'xl' && 'text-xl',
      'leading-[normal]',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

type AvatarGroupContextValue = {
  count?: number;
  limit?: number;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
};

const AvatarGroupContext = React.createContext<AvatarGroupContextValue>({});

const AvatarGroupProvider = ({
  children,
  limit,
}: {
  children?: React.ReactNode;
  limit?: number;
}) => {
  const [count, setCount] = React.useState<number>(0);
  const value = React.useMemo(() => ({ count, setCount, limit }), [count, limit]);

  return <AvatarGroupContext.Provider value={value}>{children}</AvatarGroupContext.Provider>;
};

const useAvatarGroupContext = () => React.useContext(AvatarGroupContext);

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  limit?: number;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, className, limit, ...props }, ref) => (
    <AvatarGroupProvider limit={limit}>
      <div
        ref={ref}
        className={cn('relative flex items-center justify-end -space-x-4', className)}
        {...props}
      >
        {children}
      </div>
    </AvatarGroupProvider>
  ),
);
AvatarGroup.displayName = 'AvatarGroup';

const AvatarGroupList = ({ children }: { children?: React.ReactNode }) => {
  const { limit, setCount } = useAvatarGroupContext();

  setCount?.(React.Children.count(children));

  if (!limit) return <>{React.Children.toArray(children).slice(0, limit)}</>;

  return children;
};

export type AvatarOverflowIndicatorProps = React.HTMLAttributes<HTMLSpanElement>;

const AvatarOverflowIndicator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & AvatarOverflowIndicatorProps
>(({ className, ...props }, ref) => {
  const { limit, count } = useAvatarGroupContext();
  if (!limit || !count || count <= limit) return null;
  return (
    <span
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted',
        className,
      )}
      {...props}
    >
      +{count - limit}
    </span>
  );
});
AvatarOverflowIndicator.displayName = 'AvatarOverflowIndicator';

const ProfileAvatar = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  React.ComponentPropsWithoutRef<typeof Avatar> & {
    src?: string;
    initials?: string;
    alt?: string;
    variant?: AvatarVariant;
    size?: AvatarSize;
  }
>(
  (
    { size = defaultSize, src, alt, initials, variant = 'circular', className, children, ...props },
    ref,
  ) => (
    <Avatar
      ref={ref}
      className={cn(
        'flex shrink-0 rounded-full border-2 border-primary bg-white',
        variant === 'rounded' && 'rounded-lg',
        variant === 'square' && 'rounded-none',
        size === 'xs' && 'h-8 w-8 border',
        size === 'sm' && 'h-10 w-10 border',
        size === 'md' && 'h-16 w-16',
        size === 'lg' && 'h-24 w-24',
        size === 'xl' && 'h-48 w-48',
        className,
      )}
      {...props}
    >
      <AvatarImage
        src={src}
        alt={alt}
        className={cn(
          variant === 'circular' && 'rounded-full',
          variant === 'rounded' && 'rounded-lg',
          variant === 'square' && 'rounded-none',
        )}
      />

      {children || (
        <AvatarFallback
          className={cn(
            'bg-[#b33d3d]',
            variant === 'circular' && 'rounded-full',
            variant === 'rounded' && 'rounded-lg',
            variant === 'square' && 'rounded-none',
          )}
        >
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  ),
);
ProfileAvatar.displayName = AvatarPrimitive.Root.displayName;

const ProfileContainer = ({
  size = defaultSize,
  className,
  ...divProps
}: React.HTMLAttributes<HTMLDivElement> & { size?: AvatarSize }) => (
  <div
    className={cn(
      'relative flex items-center justify-center',
      size === 'xs' && 'h-8 w-8',
      size === 'sm' && 'h-10 w-10',
      size === 'md' && 'h-16 w-16',
      size === 'lg' && 'h-24 w-24',
      size === 'xl' && 'h-48 w-48',
      className,
    )}
    {...divProps}
  />
);

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupList,
  AvatarOverflowIndicator,
  ProfileAvatar,
  ProfileContainer,
};
