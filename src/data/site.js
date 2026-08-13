import { brand, contact } from '../config';

export const site = {
  name: brand.name,
  tagline: 'Good games deserve a good room.',
  description:
    'Find and reserve a seat for a match at venues chosen for how they actually feel on a matchday.',
  email: contact.email,
  phone: contact.phone,
  serviceArea: contact.serviceArea,

  /**
   * Social profiles are intentionally empty. The footer renders an icon only
   * for entries with a real URL, so the site never ships a placeholder link
   * that goes nowhere.
   */
  social: [
    { name: 'Instagram', url: '' },
    { name: 'Twitter', url: '' },
    { name: 'Facebook', url: '' },
    { name: 'YouTube', url: '' },
  ],
};

export const footerNav = [
  {
    heading: 'Discover',
    links: [
      { label: 'This Week', to: '/events' },
      { label: 'All Events', to: '/events' },
      { label: 'Venues', to: '/venues' },
      { label: 'Cities', to: '/cities' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'How It Works', to: '/how-it-works' },
      { label: 'Careers', to: '/careers' },
      { label: 'Press', to: '/press' },
    ],
  },
  {
    heading: 'Partners',
    links: [
      { label: 'Become a Venue Partner', to: '/partners' },
      { label: 'Partner Login', to: '/signin?role=partner' },
      { label: 'Venue Benefits', to: '/partners#benefits' },
      { label: 'List Your Venue', to: '/partners#apply' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center', to: '/help' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
];
