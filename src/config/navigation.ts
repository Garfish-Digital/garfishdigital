import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Using Font Awesome Pro+ Classic Regular icons
import { 
  faHouse,
  faGrid,
  faBowArrow,
  faFlaskGear,
  faMessage,
  faEnvelopeOpenDollar,
    faUserGear,

} from '@fortawesome/pro-regular-svg-icons';

export interface NavigationItem {
  id: string;
  title: string;
  href?: string;
  icon: IconDefinition;
  enabled: boolean;
  enabledOnPages?: string[]; // Pages where this icon should be enabled
  disabledOnPages?: string[]; // Pages where this icon should be disabled
  onClick?: () => void;
  order: number;
}

export type PageId = 'home' | 'gallery' | 'contact' | 'payment';

export const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    title: 'Home',
    href: '/',
    icon: faHouse,
    enabled: true,
    order: 1
  },
  {
    id: 'gallery', 
    title: 'Gallery',
    href: '/gallery',
    icon: faGrid,
    enabled: true,
    order: 2
  },
  {
    id: 'bow-arrow',
    title: 'Explore Random Page',
    icon: faBowArrow,
    enabled: false, // Disabled by default
    enabledOnPages: ['gallery'], // Enable only on gallery page
    order: 3
  },
  {
    id: 'flask-gear',
    title: 'View Techniques', 
    icon: faFlaskGear,
    enabled: false, // Disabled by default
    // Will be enabled based on gallery currentPage logic
    order: 4
  },
  {
    id: 'contact',
    title: 'Contact',
    href: '/contact',
    icon: faMessage,
    enabled: true,
    order: 5
  },
  {
    id: 'client',
    title: 'Client',
    href: '/client',
    icon: faUserGear,
    enabled: true,
    order: 6
  },
  {
    id: 'payment',
    title: 'Payment',
    href: '/payment',
    icon: faEnvelopeOpenDollar,
    enabled: true,
    order: 7
  }
];

// Helper function to get navigation items sorted by order
export const getSortedNavigationItems = (): NavigationItem[] => {
  return [...navigationItems].sort((a, b) => a.order - b.order);
};

// Helper function to determine if an icon should be enabled based on current page
export const getIconEnabledState = (
  item: NavigationItem, 
  currentPage: PageId,
  galleryCurrentPage?: string
): boolean => {
  // Handle flask-gear special logic (same as BeakerIcon)
  if (item.id === 'flask-gear') {
    return currentPage === 'gallery' && galleryCurrentPage !== 'cell5';
  }
  
  // Handle bow-arrow special logic
  if (item.id === 'bow-arrow') {
    return currentPage === 'gallery';
  }
  
  // Handle page-specific enable/disable rules
  if (item.enabledOnPages && !item.enabledOnPages.includes(currentPage)) {
    return false;
  }
  
  if (item.disabledOnPages && item.disabledOnPages.includes(currentPage)) {
    return false;
  }
  
  return item.enabled;
};

// Helper function to get active navigation item based on current page
export const getActiveNavigationItem = (currentPage: PageId): string | null => {
  const pageToNavMap: Record<PageId, string> = {
    'home': 'home',
    'gallery': 'gallery', 
    'contact': 'contact',
    'payment': 'payment'
  };
  
  return pageToNavMap[currentPage] || null;
};