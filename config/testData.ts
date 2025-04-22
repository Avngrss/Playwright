import { Locator } from '@playwright/test';
import { HeaderComponent } from '../pages/components/headerComponent'; 

export interface LinkTestData {
    linkGetter: (header: HeaderComponent) => Locator;
    href: string;
    text: string;
}

export const headerLinks: LinkTestData[] = [
    { linkGetter: (header) => header.homeLink(), href: "/", text: "Home" },
    {
      linkGetter: (header) => header.contactLink(),
      href: "/contact",
      text: "Contact",
    },
    {
      linkGetter: (header) => header.signInLink(),
      href: "/auth/login",
      text: "Sign in",
    },
  ];

export const categoryLinks: LinkTestData[] = [
    { linkGetter: (header) => header.categoryLink('hand-tools'), href: '/category/hand-tools', text: 'Hand Tools' },
    { linkGetter: (header) => header.categoryLink('power-tools'), href: '/category/power-tools', text: 'Power Tools' },
    { linkGetter: (header) => header.categoryLink('other'), href: '/category/other', text: 'Other' },
    { linkGetter: (header) => header.categoryLink('special-tools'), href: '/category/special-tools', text: 'Special Tools' },
    { linkGetter: (header) => header.categoryLink('rentals'), href: '/rentals', text: 'Rentals' },
];

export const languages = [
  {code: 'EN', expectedText: ' Categories '},
  {code: 'DE', expectedText: ' Kategorien '},
  {code: 'ES', expectedText: ' Categorías '},
  {code: 'FR', expectedText: ' Catégories '},
  {code: 'NL', expectedText: ' Categorieën '},
  {code: 'TR', expectedText: ' Kategoriler '},
]