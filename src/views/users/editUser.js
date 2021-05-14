import React, { useEffect, useState } from 'react'
import UserEditForm from './UserEditForm'
import UserService from './../../services/user.service'

const EditUser = ({ match }) => {
    const userId = match.params.id;
    const [info, setUserInfo] = useState({});

    useEffect(async () => {
        const user = await UserService.getUserInfo('?id=' + userId);
        let response = user.data;
        response['role'] = response.roles[0].name;
        response['street'] = response.address.street;
        response['province'] = response.address.province;
        response['country'] = response.address.country;
        delete response.address;

        setUserInfo(response);
    }, [userId])
    return (
        <>
            <UserEditForm userInfo={info} isNewUser={false}></UserEditForm>
        </>
    )
}

export default EditUser
