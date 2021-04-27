import React from 'react'
import {
    CCard,
    CCardBody,
    CCol,
} from '@coreui/react'
import {
    CChartPie,
} from '@coreui/react-chartjs'
const ChannelStatistic = () => {

    return (
        <>
            <CCol xl={6}>
                <CCard>
                    <CCardBody>
                        <h4 className="pb-3">Channels Statistics</h4>
                        <CChartPie
                            datasets={[
                                {
                                    backgroundColor: [
                                        '#41B883',
                                        '#E46651',
                                        '#00D8FF',
                                        '#DD1B16'
                                    ],
                                    data: [40, 20, 80, 10]
                                }
                            ]}
                            labels={['Zalo', 'Viber', 'Telegram', 'Skype']}
                            options={{
                                tooltips: {
                                    enabled: true
                                }
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </>
    )
}

export default ChannelStatistic