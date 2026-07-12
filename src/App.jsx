import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SurveyCreatePage from './pages/SurveyCreate/SurvveyCreate';
import MainPage from './pages/Mainpage';
import Mypage from './pages/Mypage';
import Surveys from './pages/SurveysList';
import AppLayout from './styles/AppLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './pages/Landing';
import PublicArchiveMain from './pages/publicarchive/PublicArchiveMain';
import ArchiveExtra from './pages/publicarchive/ArchiveExtra';
import MyArchive from './pages/publicarchive/MyArchive';
import SurveyPurchase from './pages/publicarchive/SurveyPurchase';
import SurveyDetail from './pages/publicarchive/SurveyDetail';
import SurveyJoinFirst from './pages/surveyjoin/SurveyJoinFirst';
import SurveyJoinQuestion from './pages/surveyjoin/SurveyJoinQuestion';
import SurveyJoinFinish from './pages/surveyjoin/SurveyJoinFinish';
import RegisterComplete from './pages/RegisterComplete';
import FindPassword from './pages/FindPassword';
import PasswordChangeComplete from './pages/PasswordChangeComplete';
import GuestSurveyJoinFinish from './pages/surveyjoin/GuestSurveyJoinFinish';
import SurveyExpired from './pages/surveyjoin/SurveyExpired';
//import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/create" element={<SurveyCreatePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/surveys" element={<Surveys />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="/archivemain" element={<PublicArchiveMain />} />
          <Route path="/archiveextra" element={<ArchiveExtra />} />
          <Route path="/myarchive" element={<MyArchive />} />
          <Route path="/surveypurchase" element={<SurveyPurchase />} />
          <Route
            path="/archive/surveys/:surveyId"
            element={<SurveyPurchase />}
          />
          <Route path="/surveydetail" element={<SurveyDetail />} />
          <Route path="/surveyjoinfirst" element={<SurveyJoinFirst />} />
          <Route
            path="/survey/join/:surveyId/question"
            element={<SurveyJoinQuestion />}
          />
          <Route path="/surveyjoinfinish" element={<SurveyJoinFinish />} />
          <Route path="/registercomplete" element={<RegisterComplete />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route
            path="/passwordchangecomplete"
            element={<PasswordChangeComplete />}
          />
          <Route
            path="/guestsurveyjoinfinish"
            element={<GuestSurveyJoinFinish />}
          />
          <Route path="/surveyexpired" element={<SurveyExpired />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
