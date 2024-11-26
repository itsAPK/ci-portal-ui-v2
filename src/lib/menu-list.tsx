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
          active: pathname.includes('/reports'),
          icon: BookMarked,
          submenus: [
            {
              href: '/reports/table',
              label: 'Table View',
              active: pathname === '/reports/table',
            },
            {
              href: '/reports/graphical',
              label: 'Graphical View',
              active: pathname === '/reports/graphical',
            },
            {
              href: '/reports/year',
              label: 'Year Report',
              active: pathname === '/reports/year',
            },

          ],
        },
        {
          href: '/account-management',
          label: 'Account Management',
          active: pathname === '/account-management',
          icon: Bug,
          submenus: [
            {
              href: '/account-management/changepassword',
              label: 'Change Password',
              active: pathname === '/account-management/changepassword',
            },
            {
              href: '/account-management/toolsmanagement',
              label: 'Tools Management',
              active: pathname === '/account-management/toolsmanagement',
            },
            {
              href: '/account-management/syncuserdatabase',
              label: 'Sync User Database',
              active: pathname === '/account-management/syncuserdatabase',
            },
            {
              href: '/account-management/assignciheaduser',
              label: 'Assign Ci Head User',
              active: pathname === '/account-management/assignciheaduser',
            },
            {
              href: '/account-management/requestplant',
              label: 'Request Plant/Division',
              active: pathname === '/account-management/requestplant',
            },
          ],
        },
        
      ],
    },
  ];
}
