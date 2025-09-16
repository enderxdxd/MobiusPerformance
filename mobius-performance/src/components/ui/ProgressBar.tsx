'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/helpers';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  striped?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  className,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label,
  animated = true,
  striped = false,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variantClasses = {
    default: 'bg-primary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  };

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {label || 'Progress'}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className={cn(
        'w-full bg-gray-200 rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <motion.div
          className={cn(
            'h-full rounded-full transition-colors',
            variantClasses[variant],
            striped && 'bg-striped',
            animated && striped && 'animate-pulse'
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            backgroundImage: striped ? 
              'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)' : 
              undefined,
            backgroundSize: striped ? '1rem 1rem' : undefined,
          }}
        />
      </div>
    </div>
  );
};

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  label?: string;
  children?: React.ReactNode;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className,
  variant = 'default',
  showLabel = false,
  label,
  children,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const variantColors = {
    default: '#0284c7',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
  };

  const color = variantColors[variant];

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children || (
          <>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(percentage)}%
            </div>
            {showLabel && label && (
              <div className="text-sm text-gray-500 text-center">
                {label}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

interface StepProgressProps {
  steps: Array<{
    id: string;
    title: string;
    description?: string;
    completed?: boolean;
    current?: boolean;
  }>;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  className,
  orientation = 'horizontal',
}) => {
  return (
    <div className={cn(
      'flex',
      orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
      className
    )}>
      {steps.map((step, index) => (
        <div key={step.id} className={cn(
          'flex items-center',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          index < steps.length - 1 && orientation === 'horizontal' && 'flex-1'
        )}>
          {/* Step Circle */}
          <div className="relative">
            <motion.div
              className={cn(
                'w-10 h-10 rounded-full border-2 flex items-center justify-center',
                step.completed
                  ? 'bg-primary-500 border-primary-500 text-white'
                  : step.current
                  ? 'bg-white border-primary-500 text-primary-500'
                  : 'bg-white border-gray-300 text-gray-400'
              )}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {step.completed ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </motion.div>
          </div>

          {/* Step Content */}
          <div className={cn(
            'ml-4',
            orientation === 'vertical' && 'mb-4'
          )}>
            <div className={cn(
              'text-sm font-medium',
              step.completed || step.current ? 'text-gray-900' : 'text-gray-500'
            )}>
              {step.title}
            </div>
            {step.description && (
              <div className="text-xs text-gray-500 mt-1">
                {step.description}
              </div>
            )}
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className={cn(
              orientation === 'horizontal'
                ? 'flex-1 h-0.5 mx-4'
                : 'w-0.5 h-8 ml-5 -mt-2',
              step.completed ? 'bg-primary-500' : 'bg-gray-300'
            )} />
          )}
        </div>
      ))}
    </div>
  );
};
