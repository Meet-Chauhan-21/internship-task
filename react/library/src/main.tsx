import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// import redux store in main file
import { store } from './redux/store.ts'

// Provider use for provide all data into component
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </StrictMode>
)
