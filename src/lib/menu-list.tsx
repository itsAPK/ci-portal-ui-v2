import {
  LayoutGrid,
  LucideIcon,
  PackageOpenIcon,
  FileBox,
  Wallet2Icon,
  User,
  UsersIcon,
  School,
  TableOfContents,
  NotebookText,
  BookMarked,
  FolderGit,
  Bug,
} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/',
          label: 'Dashboard',
          active: pathname === '/',
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: '/opportunity',
          label: 'Opportunity / Execution',
          active: pathname === '/opportunity',
          icon: School,
          submenus: [],
        },
        {
          href: '/training',
          label: 'Certified Belts Details',
          active: pathname === '/training',
          icon: TableOfContents,
          submenus: [],
        },
        {
          href: '/template',
          label: 'Templates',
          active: pathname === '/template',
          icon: FolderGit,
          submenus: [],
        },
        {
          href: '/archive',
          label: 'Archive',
          active: pathname === '/archive',
          icon: NotebookText,
          submenus: [],
        },
        {
          href: '/reports',
          label: 'Reports',
          active: pathname === '/reports',
          icon: BookMarked,
          submenus: [],
        },
        {
          href: '/acount-management',
          label: 'Account Managemet',
          active: pathname === '/acount-management',
          icon: Bug,
          submenus: [],
        },
        // {
        //   href: '',
        //   label: 'Products',
        //   active: pathname.includes('/product'),
        //   icon: PackageOpenIcon,
        //   submenus: [
        //     {
        //       href: '/product/new',
        //       label: 'Add Products',
        //       active: pathname === '/product/new',
        //     },
        //     {
        //       href: '/product',
        //       label: 'Product List',
        //       active: pathname === '/product',
        //     },
        //     {
        //       href: '/product/category',
        //       label: 'Category',
        //       active: pathname === '/product/category',
        //     },
        //     {
        //       href: '/product/brand',
        //       label: 'Brand',
        //       active: pathname === '/product/brand',
        //     },
        //     {
        //       href: '/product/product-types',
        //       label: 'Product Types',
        //       active: pathname === '/product/product-types',
        //     },
        //   ],
        // },
      ],
    },
  ];
}
