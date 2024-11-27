// MenuData.js
import {
  faUser,
  faHome,
  faShoppingCart,
  faShoppingBasket,
} from '@fortawesome/free-solid-svg-icons'

const MenuData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: faHome,
  },
  {
    title: 'Product',
    path: '/',
    icon: faShoppingCart,
    submenu: [
      {
        title: 'Product List',
        path: '/product/list',
      },
      {
        title: 'Product Category',
        path: '/product/category',
      },
    ],
  },
  {
    title: 'Order',
    path: '/order',
    icon: faShoppingBasket,
  },
  {
    title: 'User',
    path: '/user',
    icon: faUser,
  },
]

export default MenuData
