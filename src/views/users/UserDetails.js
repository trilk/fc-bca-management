import React, { useEffect, useState } from 'react'
import './users.scss'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Error404 from './../../reusable/404'
import { useTranslation } from 'react-i18next'
import UserService from '../../services/user.service'
import UserInfo from './UserInfo'


const UserDetails = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const userId = match.params.id;
  const [userData, setUserData] = useState({});
  const [notFound, setNotFound] = useState(false);

  const onEditUser = () => {
    history.push(`/users/${userId}/edit`);
  }
  useEffect(() => {
    dispatch({
      type: 'LOADING',
      payload: true,
    });


    UserService.getUserInfo('?id=' + userId).then((res) => {
      setUserData(res.data);
    },
      (error) => {
        console.log(error.response.data);
        if (error.response.status === 404) {
          setNotFound(true);
        }
      }).then(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });
      });

  }, [userId])

  return (
    <>
      {notFound ? <Error404 page={'user'} backUrl={'users'}></Error404> : <UserInfo userInfo={userData} onEditClick={onEditUser} parentPage={'admin'}></UserInfo>}
    </>
  )
}

export default UserDetails
