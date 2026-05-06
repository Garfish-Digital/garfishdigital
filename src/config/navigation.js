import {
  faHouse,
  faGrid,
  faFlaskGear,
  faMessage,

} from '@fortawesome/pro-regular-svg-icons';

export const PageId = 'home' | 'gallery' | 'contact';

export const navigationItems = [
  {
    id: 'home',
    title: 'Home',
    label: 'Home',
    href: '/',
    icon: faHouse,
    enabled: true,
    order: 1
  },
  {
    id: 'gallery',
    title: 'Gallery',
    label: 'Gallery',
    href: '/gallery',
    icon: faGrid,
    enabled: true,
    order: 2
  },
  {
    id: 'flask-gear',
    title: 'View Techniques',
    label: 'Techniques',
    icon: faFlaskGear,
    enabled: false, // Disabled by default
    // Will be enabled based on gallery currentPage logic
    order: 3
  },
  {
    id: 'contact',
    title: 'Contact',
    label: 'Contact',
    href: '/contact',
    icon: faMessage,
    enabled: true,
    order: 4
  },
];

// Helper function to get navigation items sorted by order
export const getSortedNavigationItems = () => {
  return [...navigationItems].sort((a, b) => a.order - b.order);
};

// Helper function to determine if an icon should be enabled based on current page
export const getIconEnabledState = (
  item,
  currentPage,
  galleryCurrentPage
) => {
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
export const getActiveNavigationItem = (currentPage) => {
  const pageToNavMap = {
    'home': 'home',
    'gallery': 'gallery',
    'contact': 'contact'
  };

  return pageToNavMap[currentPage] || null;
};
