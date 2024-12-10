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
  Settings,
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

export function getAdminMenuList(pathname: string): Group[] {
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
          href: '/account-management',
          label: 'Account Management',
          active: pathname === '/account-management',
          icon: BookMarked,
          submenus: [],
        },
        {
          href: '/portal-management',
          label: 'Portal Management',
          active: pathname === '/portal-management',
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
