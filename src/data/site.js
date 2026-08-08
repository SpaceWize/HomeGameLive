export const site = {
  name: 'Home Game Live',
  tagline: 'Great nights start around the same table.',
  description:
    'Discover and reserve seats for sports watch parties at premium venues across Metro Vancouver.',
  email: 'hello@homegamelive.ca',
  phone: '(604) 555-0142',
  serviceArea: 'Metro Vancouver, BC',

  /**
   * Social profiles are intentionally empty. The footer renders an icon only
   * for entries that have a real URL, so the site never ships the dead `#`
   * links the original had. Drop the real handles in here and the row appears.
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
