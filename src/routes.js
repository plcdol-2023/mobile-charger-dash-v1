import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdLogout,
  MdOutlineShoppingCart,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';

import DataTables from 'views/admin/dataTables';

// Auth Imports
// import SignInCentered from "views/auth/signIn";
import SignIn from 'views/auth/signIn/index.jsx';
import SignUp from 'views/auth/signUp/index.jsx';

const routes = [
  {
    name: '대쉬보드',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: '차량관리',
    layout: '/admin',
    path: '/community',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: '데이터 리스트',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: DataTables,
  },
  {
    name: '로그인',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdHome} width="16px" height="16px" color="inherit" />,
    component: SignIn,
    hide: true,
  },
  {
    name: '회원가입',
    layout: '/auth',
    path: '/sign-up',
    icon: <Icon as={MdHome} width="16px" height="16px" color="inherit" />,
    component: SignUp,
    hide: true,
  },
];

export const Logout = [
  {
    name: '로그아웃',
    layout: '/auth',
    path: '/sign-out',
    icon: <Icon as={MdLogout} width="16px" height="16px" color="inherit" />,
    component: SignIn,
  },
];
export default routes;
