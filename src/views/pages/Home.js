import React, { useState, useEffect } from 'react'
import {
    CToaster,
    CToast,
    CToastBody,
    CToastHeader,
    CCol,
    CRow,
    CModal
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { TeamGroup, MatchGroup } from 'src/reusable/index'
import ModalMatchInfo from 'src/reusable/ModalMatchInfo'
import * as fbDb from 'src/services/index'
import { isEmpty } from 'lodash'
import { useMediaQuery } from 'react-responsive'
import { MODAL_RESPONSE_TYPE } from 'src/utils/_constants'
import { distanceTime } from 'src/utils/_common'

const Home = () => {
    const largeScreen = useMediaQuery({
        query: '(min-device-width: 600px)'
    });
    const dispatch = useDispatch()
    const sysUser = useSelector(state => state.auth.user);
    const event = useSelector(state => state.auth.event);
    const [tableData, setTableData] = useState({});
    const [gameData, setGameData] = useState({});
    const [isAdmin, setAdminState] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [modalData, setModalData] = useState({})
    const [modalColor, setModalColor] = useState('')
    const [countdown, setCountDown] = useState(null)
    const [toast, setToast] = useState({
        key: 0,
        show: false,
        title: 'Toast title',
        message: 'Thiss is toast message'
    })


    const onShowMatchModal = (data) => {
        setModalData(data)
        setModalColor(data.myBet.color)
        setShowModal(true);
    }

    const onNotify = (response) => {
        var color = response.status === 'OK' ? 'success' : 'danger'
        setToast({
            key: toast.key + 1,
            show: true,
            color: color,
            title: 'Thông báo',
            message: response.message
        })
    }

    const onModalSubmit = (modalRes) => {
        if (!isEmpty(modalRes)) {
            switch (modalRes.type) {
                case MODAL_RESPONSE_TYPE.BETTING:
                    fbDb.BettingService.userBetGames(event.id, sysUser.id, event.round, modalRes.data).then(response => {
                        onNotify(response)
                    });

                    break;
                case MODAL_RESPONSE_TYPE.CHANGE_STATUS:
                    fbDb.GameService.updateStatusOfGames(event.id, modalRes.data).then(response => {
                        onNotify(response)
                    });
                    break;
                case MODAL_RESPONSE_TYPE.SET_RESULT:
                    fbDb.BettingService.updateGameResult(event.id, modalRes.gameId, modalRes.goals).then(response => {
                        onNotify(response)
                    });
                    break;

                default:
                    break;
            }
        }
        setShowModal(false);
    }

    useEffect(() => {
        if (sysUser && sysUser.isAdmin) {
            setAdminState(true);
        }
        else {
            setAdminState(false);
        }
        if (isEmpty(gameData) || isEmpty(tableData)) {
            fbDb.GameService.getAllGames(event.id).then((response) => {
                setGameData(response)
            })
            fbDb.GameService.getStandingTables(event.id).then((response) => {
                setTableData(response)
            })
        }

    }, [sysUser]);

    return (
        <>
            <CRow className="px-3">
                <div className="headline w-100">
                    <div className="ribbon ribbon-top-left"><span>Euro 2021</span></div>
                    <div className="banner">ĐI TÌM THÁNH DỰ</div>
                </div>
            </CRow>
            <CRow className={'mt-2'}>

                <CCol md="5" className="pr-2">
                    {
                        Object.keys(tableData).map((key, index) =>
                            <TeamGroup key={key + index} teams={tableData[key]} table={key} admin={isAdmin} isMobile={!largeScreen} />
                        )
                    }
                </CCol>
                <CCol xl="7" className="pl-2">
                    {
                        Object.keys(gameData).map((key, index) =>
                            <MatchGroup key={key + index} items={gameData[key]} name={key} admin={isAdmin} onRowClick={onShowMatchModal} />
                        )
                    }
                </CCol>
            </CRow>
            <CRow>
                <CModal
                    show={showModal}
                    onClose={() => setShowModal(!showModal)}
                    size="lg"
                    color={modalColor}
                    className="mi-modal">
                    <ModalMatchInfo data={modalData} onModalResponse={onModalSubmit}></ModalMatchInfo>
                </CModal>
                <CToaster position={'top-right'} >
                    <CToast
                        key={toast.key}
                        show={toast.show}
                        autohide={3000}
                        fade={true} >
                        <CToastHeader closeButton={true}>
                            {toast.title}
                        </CToastHeader>
                        <CToastBody>
                            {toast.message}
                        </CToastBody>
                    </CToast>
                </CToaster>
            </CRow>

        </>
    )
}

export default Home
