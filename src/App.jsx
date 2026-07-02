import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>{/* 원하는 경로들 추가... */}</Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
