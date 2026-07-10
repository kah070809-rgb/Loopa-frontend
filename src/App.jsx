import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout'; 
import Register from './pages/auth/Register'
import Login from "./pages/auth/Login";
import Landing from './pages/auth/Landing';
import RegisterComplete from './pages/auth/RegisterComplete';
import FindPassword from './pages/auth/FindPassword';
import PasswordChangeComplete from './pages/auth/PasswordChangeComplete';
import PublicArchiveMain from './pages/publicarchive/PublicArchiveMain';
import ArchiveExtra from './pages/publicarchive/ArchiveExtra';
import MyArchive from './pages/publicarchive/MyArchive';
import SurveyPurchase from './pages/publicarchive/SurveyPurchase';
import SurveyDetail from './pages/publicarchive/SurveyDetail';
import SurveyJoinFirst from './pages/surveyjoin/SurveyJoinFirst';
import SurveyJoinQuestion from './pages/surveyjoin/SurveyJoinQuestion';
import SurveyJoinFinish from './pages/surveyjoin/SurveyJoinFinish';
import GuestSurveyJoinFinish from './pages/surveyjoin/GuestSurveyJoinFinish';
import SurveyExpired from './pages/surveyjoin/SurveyExpired';
// 💡 1. AppLayout 컴포넌트를 불러옵니다 (경로 확인 필수!)
//import './App.css';

// 테스트용 임시 컴포넌트 (나중에 실제 페이지 파일로 분리하시면 됩니다)
function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>안녕하세요! 👋</h2>
      <p>모바일 레이아웃 안의 콘텐츠입니다.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* 💡 2. 기본 주소('/')로 접속했을 때 Home 컴포넌트를 보여주도록 설정합니다 */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/archivemain" element={<PublicArchiveMain />}/>
          <Route path="/archiveextra" element={<ArchiveExtra />}/>
          <Route path="/myarchive" element={<MyArchive />}/>
          <Route path="/surveypurchase" element={<SurveyPurchase />}/>
          <Route path="/surveydetail" element={<SurveyDetail />}/>
          <Route path="/surveyjoinfirst" element={<SurveyJoinFirst />}/>
          <Route path="/survey/join/:surveyId/question" element={<SurveyJoinQuestion />} />
          <Route path="/surveyjoinfinish" element={<SurveyJoinFinish />} />
          <Route path="/registercomplete" element={<RegisterComplete />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/passwordchangecomplete" element={<PasswordChangeComplete />} />
          <Route path="/guestsurveyjoinfinish" element={<GuestSurveyJoinFinish />} />
          <Route path="/surveyexpired" element={<SurveyExpired />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;

// import { useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css';

// function App() {
//   return (
//     <BrowserRouter>
//       <AppLayout>
//         <Routes>{/* 원하는 경로들 추가... */}</Routes>
//       </AppLayout>
//     </BrowserRouter>
//   );
// }

// export default App;
