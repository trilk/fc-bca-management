import React, { useState } from 'react'
import UserEditForm from './UserEditForm'

const CreateUser = () => {
    const info = {
        firstName: '',
        lastName: '',
        username: '0988661903',
        password: '',
        email: '',
        gender: '',
        dob: '',
        role: 'user',
        roles: [],
        channels: [],
        street: '',
        province: '',
        country: '',
        isActive: true
    }

    return (
        <>
            <UserEditForm userInfo={info} isNewUser={true}></UserEditForm>
        </>
    )
}

export default CreateUser
