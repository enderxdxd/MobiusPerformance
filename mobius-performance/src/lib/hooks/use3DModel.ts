'use client';

import { useState } from 'react';

// Simple state management for 3D models
// Three.js hooks will be used directly in components inside Canvas
export const useModelInteraction = () => {
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerOver = (objectName: string) => {
    setHoveredObject(objectName);
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = () => {
    setHoveredObject(null);
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'default';
    }
  };

  const handleClick = (objectName: string) => {
    setSelectedObject(selectedObject === objectName ? null : objectName);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return {
    hoveredObject,
    selectedObject,
    isDragging,
    handlePointerOver,
    handlePointerOut,
    handleClick,
    handleDragStart,
    handleDragEnd
  };
};
