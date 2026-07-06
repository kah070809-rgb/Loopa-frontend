import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout'; 
import Register from "./pages/Register";
import Rogin from "./pages/Login";
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
          <Route path="/rogin" element={<Login />} />
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
