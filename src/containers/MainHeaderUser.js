import React, { useEffect, useState } from 'react'
import {
  CBadge,

  CLink,
  CImg,
  CDropdownDivider,
  CButton,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { fbLogin, logout } from 'src/actions/auth';


const MainHeaderUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sysUser = useSelector(state => state.auth.user);
  const [fbSignin, setFbSignin] = useState(true)
  const [avatar, setAvatar] = useState({ icon: '', src: '' })

  const onLogout = () => {
    dispatch(logout())
    history.replace('/login')
  }

  const onFbLogin = () => {
    dispatch(fbLogin())
  }

  useEffect(() => {
    if (sysUser === null || sysUser.isAnonymous) {
      setFbSignin(true)
    } else {
      setAvatar({ icon: '', src: sysUser.photoUrl })

      if (sysUser.photoUrl === '') {
        setAvatar({
          icon: !sysUser.isAdmin ? 'cil-smile' : '',
          src: sysUser.isAdmin ? '/avatars/admin.jpg' : ''
        })
      }
      setFbSignin(false)
    }
  }, [sysUser])

  return (
    <>
      {!fbSignin &&
        <>
          <div className="c-avatar">
            <CIcon name={avatar.icon} width="44"
              src={avatar.src}
              className="c-avatar-img"
            />
          </div>
          {(sysUser.isAdmin || sysUser.group === '_') &&
            <div>
              <CButton onClick={onLogout} className={`mr-2`}>
                <CIcon size="lg" className="mr-2" name="cil-account-logout"></CIcon></CButton>
            </div>}
        </>}
      {fbSignin &&
        <div>
          <CButton onClick={onFbLogin} className={`mr-2 btn-facebook`}>
            <CIcon size="lg" className="mr-2" name="cib-facebook"></CIcon>Đăng nhập</CButton>
        </div>}

    </>
  )
}

export default MainHeaderUser
