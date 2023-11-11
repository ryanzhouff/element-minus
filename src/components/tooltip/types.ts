import type { Placement, Options } from '@popperjs/core';

export interface TooltipProps {
  content?: string;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  manual?: boolean;
  popoverOptions?: Partial<Options>;
  transition?: string;
  openDelay?: number;
  closeDelay?: number;
}

export interface TooltipEvents {
  (e: 'visible-change', value: boolean): void;
}

export interface TooltipInstance {
  hide: () => void;
  show: () => void;
}
