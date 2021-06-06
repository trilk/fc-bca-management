import React, { useState, useEffect } from 'react'
import {
    CButton,
    CCol,
    CContainer,
    CRow,
    CLink,
    CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux'
import { TeamGroup, MatchGroup } from 'src/reusable/index'
import GameService from 'src/services/game.service'
import * as firebase from 'src/firebase'
import { cilLockUnlocked } from '@coreui/icons'

const Home = () => {
    const user = useSelector(state => state.auth.user);
    const [acceptedUser, setUser] = useState(firebase.auth.currentUser);
    const [tableData, setTableData] = useState({});
    const [gameData, setGameData] = useState({});
    const [isAdmin, setAdminState] = useState(false);
    const btnText = { yes: 'Chơi luôn', no: 'Thôi khỏi' }
    const [button, setButtonText] = useState({
        leftYes: true,
        yes: btnText.yes,
        no: btnText.no
    });
    const eventId = 'EURO2021';

    // firebase.auth.onAuthStateChanged(function(response) {
    //     if (response) {
    //       // User is signed in.
    //       console.log(response)
    //     } else {
    //       // No user is signed in.
    //     }
    //   });
    const onMouseOver = (event) => {
        var name = event.target.name;
        if (name === 'yes') {
            setButtonText({
                leftYes: true,
                yes: btnText.yes,
                no: btnText.no
            })
        } else {
            setButtonText({
                leftYes: false,
                yes: btnText.no,
                no: btnText.yes
            })
        }
    }
    useEffect(() => {
        if (acceptedUser) {
            console.log(acceptedUser)
            if (user && user.isAdmin) {
                setAdminState(true)
            }
            GameService.getAllGames(eventId).then((response) => {
                setGameData(response)
            })
            GameService.getStandingTables(eventId).then((response) => {
                setTableData(response)
            })

        } else {
            firebase.auth.signInAnonymously().then(response => {
                setUser(response.user)
            })
        }
    }, [acceptedUser]);

    return (
        <div className="c-app c-default-layout flex-row">

            <CContainer>
                <CRow className="mb-3">
                    <CCol>
                        <CImg
                            src={'avatars/uefa-euro-2020.png'}
                            width="100%"
                        />
                    </CCol>
                </CRow>
                <CRow className="justify-content-center">
                    <CCol md="6">
                        <div className="position-absolute" style={{ top: '-70px' }}>
                            <CRow>
                                <CCol className="col-md-auto"><CIcon name="logo" width={80} className="" /></CCol>
                                <CCol className="text-center"><h4 className="pt-2">Anh em sẵn sàng tìm thánh dự chưa?</h4>
                                    <CLink to="/dashboard">
                                        <CButton onMouseEnter={onMouseOver} name="yes" className={`mr-2 ${button.leftYes ? 'btn-success' : 'btn-secondary'}`} >{button.yes}</CButton>
                                        <CButton onMouseEnter={onMouseOver} name="no" className={!button.leftYes ? 'btn-success' : 'btn-secondary'} >{button.no}</CButton></CLink>
                                </CCol>
                            </CRow>
                            {/* <div className="clearfix">
                                
                                
                                <p className="text-muted float-left">
                                    
                                </p>
                            </div> */}
                        </div>

                    </CCol>
                </CRow>
                <CRow className="mt-5">
                    <CCol md="5">
                        {
                            Object.keys(tableData).map((key, index) =>
                                <TeamGroup key={key + index} teams={tableData[key]} table={key} />
                            )
                        }

                    </CCol>
                    <CCol xl="7">
                        {
                            Object.keys(gameData).map((key, index) =>
                                <MatchGroup key={key + index} items={gameData[key]} name={key} />
                            )
                        }

                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Home
