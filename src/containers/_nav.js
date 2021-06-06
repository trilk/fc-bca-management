import React from 'react'
import CIcon from '@coreui/icons-react'
import i18n from './../i18n'

export const getNavs = (isAdmin) => {

  const _nav = [
    {
      _tag: 'CSidebarNavItem',
      name: i18n.t('left-menu.item-dashboard'),
      to: '/dashboard',
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: [i18n.t('left-menu.item-message')]
    },
    {
      _tag: 'CSidebarNavItem',
      name: i18n.t('left-menu.item-allmessages'),
      icon: 'cil-drop',
      to: '/messages'
    },
    {
      _tag: 'CSidebarNavItem',
      name: i18n.t('left-menu.item-createmessage'),
      icon: 'cil-drop',
      to: '/CreateMsg'
    },
    {
      _tag: 'CSidebarNavItem',
      name: i18n.t('left-menu.item-template'),
      icon: 'cil-drop',
      to: '/template'
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: [i18n.t('left-menu.item-audience')]
    },
    {
      _tag: 'CSidebarNavItem',
      name: i18n.t('left-menu.item-segments'),
      icon: 'cil-drop',
      to: '/segments'
    },
    {
      _tag: 'CSidebarNavItem',
      name: i18n.t('left-menu.item-customers'),
      icon: 'cil-drop',
      to: '/contacts'
    },
    ...isAdmin ? [
      {
        _tag: 'CSidebarNavTitle',
        _children: [i18n.t('left-menu.admin-title')]
      },
      {
        _tag: 'CSidebarNavItem',
        name: i18n.t('left-menu.admin-user-mng'),
        icon: 'cil-drop',
        to: '/users'
      },
      {
        _tag: 'CSidebarNavItem',
        name: i18n.t('left-menu.admin-settings'),
        icon: 'cil-drop',
        to: '/'
      }
    ] : [],
  ];
  return _nav;
}
