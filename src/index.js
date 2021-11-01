// highlight
import './utils/highlight'

// scroll bar
import 'simplebar/src/simplebar.css'

// lightbox
import 'react-image-lightbox/style.css'

// editor
import 'react-quill/dist/quill.snow.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// slick-carousel
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// lazy image
import 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'
import 'lazysizes/plugins/object-fit/ls.object-fit'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
// contexts
import { SettingsProvider } from './contexts/SettingsContext'
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext'
import { AuthProvider } from './contexts/JWTContext'

//
import App from './App'
//  redux
import rootSaga from './redux/sagas'
import { INIT_STATE } from './redux/initialState'
import reducers from './redux/reducers'
// ----------------------------------------------------------------------

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, INIT_STATE, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <ReduxProvider store={store}>
    <HelmetProvider>
      <SettingsProvider>
        <CollapseDrawerProvider>
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </CollapseDrawerProvider>
      </SettingsProvider>
    </HelmetProvider>
  </ReduxProvider>,
  document.getElementById('root'),
)
