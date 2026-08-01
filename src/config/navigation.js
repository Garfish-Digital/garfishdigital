export const navigationItems = [
  {
    id: 'home',
    title: 'Home',
    label: 'Home',
    href: '/',
    enabled: true,
    order: 1
  },
  {
    id: 'gallery',
    title: 'Gallery',
    label: 'Gallery',
    href: '/gallery',
    enabled: true,
    order: 2
  },
  {
    id: 'contact',
    title: 'Contact',
    label: 'Contact',
    href: '/contact',
    enabled: true,
    order: 3
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
