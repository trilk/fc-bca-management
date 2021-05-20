import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import UserEditForm from './UserEditForm'
import Error404 from './../../reusable/404'
import UserService from './../../services/user.service'

const EditUser = ({ match }) => {
    const dispatch = useDispatch();
    const userId = match.params.id;
    const [info, setUserInfo] = useState({});
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        dispatch({
            type: 'LOADING',
            payload: true,
        });
        UserService.getUserInfo('?id=' + userId).then((res) => {
            let response = res.data;
            response['role'] = response.roles[0].name;
            response['street'] = response.address.street;
            response['province'] = response.address.province;
            response['country'] = response.address.country;
            delete response.address;

            setUserInfo(response);
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
            {notFound ? <Error404 page={'user'} backUrl={'users'}></Error404> : <UserEditForm userInfo={info} isNewUser={false}></UserEditForm>}
        </>
    )
}

export default EditUser
