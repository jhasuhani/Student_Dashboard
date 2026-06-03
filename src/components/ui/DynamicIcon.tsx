'use client';

import {
  Atom,
  FileCode,
  Network,
  BrainCircuit,
  BookOpen,
  Code2,
  Database,
  Globe,
  Layers,
  Lightbulb,
  Palette,
  Rocket,
  Shield,
  Terminal,
  Zap,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Atom,
  FileCode,
  Network,
  BrainCircuit,
  BookOpen,
  Code2,
  Database,
  Globe,
  Layers,
  Lightbulb,
  Palette,
  Rocket,
  Shield,
  Terminal,
  Zap,
  GraduationCap,
};

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function DynamicIcon({ name, className, size = 24 }: DynamicIconProps) {
  const IconComponent = iconMap[name] || GraduationCap;
  return <IconComponent className={className} size={size} />;
}
