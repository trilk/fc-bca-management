import React, { useEffect, useState } from 'react'
import './users.scss'
import { useHistory } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import UserService from '../../services/user.service'
import UserInfo from './UserInfo'


const UserDetails = ({ match }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const user = useSelector(state => state.auth.user);
  const lang = useSelector(state => state.auth.lang);

  const userId = match.params.id;
  const [userData, setUserData] = useState({});

  const onEditUser = () => {
    history.push(`/users/${userId}/edit`);
  }
  useEffect(async () => {
    const user = await UserService.getUserInfo('?id=' + userId);
    setUserData(user.data);
  }, [userId])

  return (
    <>
      <UserInfo userInfo={userData} onEditClick={onEditUser} parentPage={'admin'}></UserInfo>
    </>
  )
}

export default UserDetails
