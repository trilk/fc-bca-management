import { faCommentDots, faTachometerAlt, faUsers, faUserShield, faSitemap, faCommentMedical, faCog, faInbox } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import i18n from './../i18n'

export const getNavs = (role) => {
  const isAdmin = role === 'admin';

  const _nav = [
    {
      _tag: 'CSidebarNavItem',
      name: i18n.t('left-menu.item-dashboard'),
      to: '/dashboard',
      icon: <FontAwesomeIcon icon={faTachometerAlt} size="lg" className="mr-4" />,
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
      icon: <FontAwesomeIcon icon={faCommentDots} size="lg" className="mr-4" />,
      to: '/messages'
    },
    {
      _tag: 'CSidebarNavItem',
      name: i18n.t('left-menu.item-createmessage'),
      icon: <FontAwesomeIcon icon={faCommentMedical} size="lg" className="mr-4" />,
      to: '/CreateMsg'
    },
    {
      _tag: 'CSidebarNavItem',
      name: i18n.t('left-menu.item-template'),
      icon: <FontAwesomeIcon icon={faInbox} size="lg" className="mr-4" />,
      to: '/template'
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: [i18n.t('left-menu.item-audience')]
    },
    {
      _tag: 'CSidebarNavItem',
      name: i18n.t('left-menu.item-segments'),
      icon: <FontAwesomeIcon icon={faSitemap} size="lg" className="mr-4" />,
      to: '/segments'
    },
    {
      _tag: 'CSidebarNavItem',
      name: i18n.t('left-menu.item-customers'),
      icon: <FontAwesomeIcon icon={faUsers} size="lg" className="mr-4" />,
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
        icon: <FontAwesomeIcon icon={faUserShield} size="lg" className="mr-3" />,
        to: '/users'
      },
      {
        _tag: 'CSidebarNavItem',
        name: i18n.t('left-menu.admin-settings'),
        icon: <FontAwesomeIcon icon={faCog} size="lg" className="mr-4" />,
        to: '/'
      }
    ] : [],
  ];
  return _nav;
}
