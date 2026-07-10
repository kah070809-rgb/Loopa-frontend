import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout';
import SurveyCreatePage from './pages/SurveyCreate/SurvveyCreate';
import MainPage from './pages/Mainpage';
import Mypage from './pages/Mypage';
import Surveys from './pages/SurveysList';
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
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
