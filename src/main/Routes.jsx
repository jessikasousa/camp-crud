import React from 'react'
import { Routes, Route } from "react-router-dom";

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import CampCrud from '../components/camp/CampCrud'

export default props => (
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/users' element={<UserCrud />} />
        <Route path='/camps' element={<CampCrud />} />
    </Routes>
);