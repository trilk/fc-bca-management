import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade, CSpinner } from '@coreui/react'

// routes config
import routes from '../_routes';

const suspenseLoading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const MainContent = () => {
  const loading = useSelector(state => state.auth.loading);

  return (
    <main className="c-main">
      <CContainer>
        <div className="text-center">
          {loading && <CSpinner color="info" variant="grow" size="lg" />}
        </div>
        <Suspense fallback={suspenseLoading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(MainContent)
