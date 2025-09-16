'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface PowerCurveChartProps {
  data: Array<{
    rpm: number;
    hp: number;
    torque: number;
  }>;
  title?: string;
  showStock?: boolean;
  stockData?: Array<{
    rpm: number;
    hp: number;
    torque: number;
  }>;
}

export const PowerCurveChart: React.FC<PowerCurveChartProps> = ({
  data,
  title = 'Curva de Potência',
  showStock = false,
  stockData,
}) => {
  const chartData = {
    labels: data.map(point => point.rpm.toString()),
    datasets: [
      ...(showStock && stockData ? [{
        label: 'HP Original',
        data: stockData.map(point => point.hp),
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        tension: 0.4,
        yAxisID: 'y',
      }, {
        label: 'Torque Original',
        data: stockData.map(point => point.torque),
        borderColor: 'rgb(209, 213, 219)',
        backgroundColor: 'rgba(209, 213, 219, 0.1)',
        tension: 0.4,
        yAxisID: 'y1',
      }] : []),
      {
        label: 'HP Modificado',
        data: data.map(point => point.hp),
        borderColor: 'rgb(2, 132, 199)',
        backgroundColor: 'rgba(2, 132, 199, 0.1)',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Torque Modificado',
        data: data.map(point => point.torque),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'RPM',
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'HP',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Nm',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <Line data={chartData} options={options} />
    </motion.div>
  );
};

interface PerformanceComparisonProps {
  data: Array<{
    stage: string;
    hp: number;
    torque: number;
    price: number;
  }>;
  title?: string;
}

export const PerformanceComparison: React.FC<PerformanceComparisonProps> = ({
  data,
  title = 'Comparação de Stages',
}) => {
  const chartData = {
    labels: data.map(item => item.stage),
    datasets: [
      {
        label: 'HP',
        data: data.map(item => item.hp),
        backgroundColor: 'rgba(2, 132, 199, 0.8)',
        borderColor: 'rgb(2, 132, 199)',
        borderWidth: 1,
      },
      {
        label: 'Torque (Nm)',
        data: data.map(item => item.torque),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Potência / Torque',
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <Bar data={chartData} options={options} />
    </motion.div>
  );
};

interface GaugeChartProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  max,
  label,
  unit,
  color = '#0284c7',
  size = 'md',
}) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const sizeConfig = {
    sm: { size: 120, stroke: 6, fontSize: 'text-sm' },
    md: { size: 160, stroke: 8, fontSize: 'text-base' },
    lg: { size: 200, stroke: 10, fontSize: 'text-lg' },
  };

  const config = sizeConfig[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="relative" style={{ width: config.size, height: config.size }}>
        <svg
          className="transform -rotate-90"
          width={config.size}
          height={config.size}
        >
          {/* Background circle */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r="45"
            stroke="#e5e7eb"
            strokeWidth={config.stroke}
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx={config.size / 2}
            cy={config.size / 2}
            r="45"
            stroke={color}
            strokeWidth={config.stroke}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`font-bold text-gray-900 ${config.fontSize}`}
          >
            {value}
          </motion.div>
          <div className="text-xs text-gray-500">{unit}</div>
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <div className="font-medium text-gray-900">{label}</div>
        <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
      </div>
    </motion.div>
  );
};

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#0284c7',
  backgroundColor = '#e5e7eb',
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
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
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

interface StageDistributionProps {
  data: Array<{
    stage: string;
    count: number;
    color: string;
  }>;
  title?: string;
}

export const StageDistribution: React.FC<StageDistributionProps> = ({
  data,
  title = 'Distribuição de Stages',
}) => {
  const chartData = {
    labels: data.map(item => item.stage),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: data.map(item => item.color),
        borderColor: data.map(item => item.color),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <Doughnut data={chartData} options={options} />
    </motion.div>
  );
};
