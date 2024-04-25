import {Navigate, Route, Routes} from 'react-router-dom'
import Layout from './layouts/layout'

function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Layout>Home page.</Layout>}/>
        <Route path='/user-profile' element={<span>Home page12 2</span>}/>
        <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
  )
}

export default AppRoutes