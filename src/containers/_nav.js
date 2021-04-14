import { faCommentDots, faTachometerAlt, faUsers, faUserShield } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import i18n from './../i18n'

export const getNavs = (role) => {

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
      _tag: 'CSidebarNavDropdown',
      name: i18n.t('left-menu.item-message'),
      route: '',
      icon: <FontAwesomeIcon icon={faCommentDots} size="lg" className="mr-4" />,
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: i18n.t('left-menu.item-allmessages'),
          to: '/messages'
        },
        {
          _tag: 'CSidebarNavItem',
          name: i18n.t('left-menu.item-createmessage'),
          to: '/CreateMsg'
        },
        {
          _tag: 'CSidebarNavItem',
          name: i18n.t('left-menu.item-template'),
          to: '/template'
        }
      ]
    },


    {
      _tag: 'CSidebarNavDropdown',
      name: i18n.t('left-menu.item-audience'),
      route: '',
      icon: <FontAwesomeIcon icon={faUsers} size="lg" className="mr-4" />,
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: i18n.t('left-menu.item-segments'),
          to: '/segments'
        },
        {
          _tag: 'CSidebarNavItem',
          name: i18n.t('left-menu.item-customers'),
          to: '/contacts'
        }
      ]
    },
    {
      _tag: 'CSidebarNavItem',
      name: i18n.t('left-menu.item-users'),
      icon: <FontAwesomeIcon icon={faUserShield} size="lg" className="mr-4" />,
      to: '/users'
    }
  ];
  return _nav;
}