import React, { createContext, useState, useEffect } from 'react';
import { auth } from './../firebase';
export const AuthContext = createContext({ userPresent: false, user: null })
export default function FirebaseAuthContext(props) {
    let [state, changeState] = useState({
        userDataPresent: false,
        user: null,
        listener: null
    })

    useEffect(() => {
        console.log('Khong vo day a');
        if (state.listener == null) {

            changeState({
                ...state, listener: auth.onAuthStateChanged((user) => {
                    console.log('Check user')
                    if (user)
                        changeState(oldState => ({ ...oldState, userDataPresent: true, user: user }));
                    else
                        changeState(oldState => ({ ...oldState, userDataPresent: true, user: null }));
                })
            });

        }
        return () => {
            console.log('1: Vo day khong?');
            if (state.listener) {
                console.log('2: Vo day khong?');
                state.listener()
            }
        }

    }, [])

    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}