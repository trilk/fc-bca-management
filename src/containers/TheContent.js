import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes';

const suspenseLoading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  const loading = useSelector(state => state.auth.loading);

  return (
    <main className="c-main">
      <CContainer fluid>
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
                    <CFade className={loading ? 'loading' : ''}>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
