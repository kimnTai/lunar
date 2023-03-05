import React from 'react'
import { HashRouter, Route, Routes, Navigate } from "react-router-dom"
import { store } from './redux/store'
import { Provider } from 'react-redux'
import AdminHome from "./pages/admin/AdminHome";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<AdminHome />}>
            {/* <Route path='/' element={<Navigate to='/' />} /> */}
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
