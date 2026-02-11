import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CSSProperties } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const INK_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Amber: { bg: '#f59e0b', text: '#ffffff', border: '#d97706' },
  Amethyst: { bg: '#8b5cf6', text: '#ffffff', border: '#7c3aed' },
  Emerald: { bg: '#10b981', text: '#ffffff', border: '#059669' },
  Ruby: { bg: '#ef4444', text: '#ffffff', border: '#dc2626' },
  Sapphire: { bg: '#3b82f6', text: '#ffffff', border: '#2563eb' },
  Steel: { bg: '#94a3b8', text: '#0f172a', border: '#64748b' },
};

export const INK_ICONS: Record<string, string> = {
  Amber: 'https://wiki.mushureport.com/images/thumb/4/43/Amber-Ink.png/102px-Amber-Ink.png',
  Amethyst: 'https://wiki.mushureport.com/images/thumb/c/cc/Amethyst-Ink.png/102px-Amethyst-Ink.png',
  Emerald: 'https://wiki.mushureport.com/images/thumb/2/2c/Emerald-Ink.png/102px-Emerald-Ink.png',
  Ruby: 'https://wiki.mushureport.com/images/thumb/d/db/Ruby-Ink.png/102px-Ruby-Ink.png',
  Sapphire: 'https://wiki.mushureport.com/images/thumb/a/ad/Sapphire-Ink.png/102px-Sapphire-Ink.png',
  Steel: 'https://wiki.mushureport.com/images/thumb/3/31/Steel-Ink.png/102px-Steel-Ink.png',
};

export function getInkStyle(color: string, selected: boolean): CSSProperties {
  const ink = INK_COLORS[color];
  if (!ink) return {};

  if (selected) {
    return {
      backgroundColor: ink.bg,
      color: ink.text,
      borderColor: ink.border,
      boxShadow: `0 0 8px ${ink.bg}40`,
    };
  }

  return {
    backgroundColor: 'transparent',
    color: ink.bg,
    borderColor: `${ink.bg}50`,
  };
}
