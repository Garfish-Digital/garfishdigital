import { 
  faHouse,
  faGrid,
  faBowArrow,
  faFlaskGear,
  faMessage,
  faUserGear,
  faWindow,
  faEnvelopeOpenDollar,
  faFileContract,

} from '@fortawesome/pro-regular-svg-icons';

export const PageId = 'home' | 'gallery' | 'contact' | 'client' | 'project' | 'documents' | 'payment';

export const navigationItems = [
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
    id: 'project',
    title: 'View Project',
    href: '/client/project',
    icon: faWindow,
    enabled: false, // Disabled by default
    // Will be enabled based on client password success
    order: 7
  },
  {
      id: 'documents',
      title: 'View Documents',
      href: '/client/documents',
      icon: faFileContract,
      enabled: false, // Disabled by default
      // Will be enabled based on client password success
      order: 8
    },
    {
      id: 'payment',
      title: 'Make Payment',
      href: '/client/payment',
      icon: faEnvelopeOpenDollar,
      enabled: false, // Disabled by default
      // Will be enabled based on client password success
      order: 9
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
  galleryCurrentPage,
  isClientAuthenticated
) => {
  // Handle client-only icons (project, documents, payment)
  if (['project', 'documents', 'payment'].includes(item.id)) {
    return isClientAuthenticated === true;
  }
  
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
export const getActiveNavigationItem = (currentPage) => {
  const pageToNavMap = {
    'home': 'home',
    'gallery': 'gallery', 
    'contact': 'contact',
    'client': 'client',
    'project': 'project',
    'documents': 'documents',
    'payment': 'payment'
  };
  
  return pageToNavMap[currentPage] || null;
};