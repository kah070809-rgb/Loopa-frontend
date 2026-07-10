import React, { useState } from 'react';
import Backmy from '../assets/images/Backmy.svg';
import Download from '../assets/images/Download.svg';
import Del from '../assets/images/Del.svg';
const MyPage = () => {
  // 탭 상태 관리 ('registered' = 내가 등록한 설문, 'viewed' = 열람한 설문)
  const [activeTab, setActiveTab] = useState('registered');

  // 삭제 확인 팝업 노출 상태
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState(null);

  // 더미 데이터: 내가 등록한 설문
  const registeredSurveys = [
    {
      id: 1,
      title: '대학생 AI 활용 실태 조사',
      status: '진행 중',
      date: '2026.01.01',
      target: '대학생 대상',
      respondents: 52,
    },
    {
      id: 2,
      title: '대학생 AI 활용 실태 조사',
      status: '종료',
      date: '2026.01.01',
      target: '대학생 대상',
      respondents: 52,
    },
  ];

  // 더미 데이터: 열람한 설문
  const viewedSurveys = [
    {
      id: 3,
      title: '대학생 AI 활용 실태 조사',
      date: '2026.01.01',
      respondents: 52,
      isFirst: true,
    },
    {
      id: 4,
      title: '대학생 AI 활용 실태 조사',
      date: '2026.01.01',
      respondents: 52,
      isFirst: false,
    },
    {
      id: 5,
      title: '대학생 AI 활용 실태 조사',
      date: '2026.01.01',
      respondents: 52,
      isFirst: false,
    },
  ];

  // 공유 버튼 클릭 핸들러
  const handleShareClick = () => {
    alert('설문지 링크가 클립보드에 복사되었습니다.');
  };

  // 휴지통 클릭 핸들러
  const handleDeleteClick = (id) => {
    setSelectedForDelete(id);
    setShowDeletePopup(true);
  };

  return (
    <div
      className="mypage-container"
      style={{
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        padding: '30px 30px 40px 30px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
    >
      {/* --------------------------------------------------------
         [1] 헤더 영역 (피그마 추출 뒤로가기 이미지 적용)
      -------------------------------------------------------- */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
          onClick={() => alert('메인 화면으로 이동')}
        >
          {/* 🌟 피그마와 같은 크기의 뒤로가기 이미지 적용 */}
          <img
            src={Backmy}
            alt="뒤로가기"
            style={{ height: '18px', objectFit: 'contain' }}
          />
        </div>

        <button
          onClick={() => alert('로그아웃 되었습니다.')}
          style={{
            padding: '4px 12px',
            borderRadius: '20px',
            border: '1px solid #DDBFFF',
            backgroundColor: '#ffffff',
            color: '#5D01C6',
            fontSize: '11px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          로그아웃
        </button>
      </header>

      {/* --------------------------------------------------------
         [2] 상단 유저 정보 카드
      -------------------------------------------------------- */}
      <div
        style={{
          background: 'linear-gradient(90deg, #EBE0FF 0%, #DDBFFF 100%)',
          borderRadius: '16px',
          padding: '28px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 4px 12px rgba(93, 1, 198, 0.05)',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#5D01C6',
          }}
        ></div>
        <div>
          <p style={{ margin: 0, fontSize: '12px', color: '#5D01C6' }}>
            안녕하세요,
          </p>
          <h3
            style={{
              margin: '2px 0 0 0',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#5D01C6',
            }}
          >
            likelion@gmail.com님!
          </h3>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <span style={{ fontSize: '11px', color: '#5D01C6' }}>보유 토큰</span>
          <p
            style={{
              margin: '2px 0 0 0',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#5D01C6',
            }}
          >
            124개
          </p>
        </div>
      </div>

      {/* --------------------------------------------------------
         [3] 탭 스위치 영역
      -------------------------------------------------------- */}
      <div
        style={{
          display: 'flex',
          borderBottom: '2px solid #EBE0FF',
          marginBottom: '24px',
        }}
      >
        <button
          onClick={() => setActiveTab('registered')}
          style={{
            flex: 1,
            padding: '12px 0',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom:
              activeTab === 'registered'
                ? '3px solid #5D01C6'
                : '3px solid transparent',
            color: activeTab === 'registered' ? '#5D01C6' : '#A070D6',
            fontSize: '14px',
            fontWeight: activeTab === 'registered' ? 'bold' : '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          내가 등록한 설문
        </button>
        <button
          onClick={() => setActiveTab('viewed')}
          style={{
            flex: 1,
            padding: '12px 0',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom:
              activeTab === 'viewed'
                ? '3px solid #5D01C6'
                : '3px solid transparent',
            color: activeTab === 'viewed' ? '#5D01C6' : '#A070D6',
            fontSize: '14px',
            fontWeight: activeTab === 'viewed' ? 'bold' : '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          열람한 설문
        </button>
      </div>

      {/* --------------------------------------------------------
         [4] 리스트 렌더링 영역
      -------------------------------------------------------- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* === 내가 등록한 설문 탭 내용 === */}
        {activeTab === 'registered' &&
          registeredSurveys.map((survey) => (
            <div
              key={survey.id}
              style={{
                backgroundColor: '#DDBFFF',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <h4
                    style={{
                      margin: 0,
                      fontSize: '15px',
                      color: '#5D01C6',
                      fontWeight: 'bold',
                    }}
                  >
                    {survey.title}
                  </h4>
                  <span
                    style={{
                      backgroundColor:
                        survey.status === '진행 중' ? '#ffffff' : '#F8F2FF',
                      color: '#5D01C6',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      opacity: survey.status === '종료' ? 0.7 : 1,
                    }}
                  >
                    {survey.status}
                  </span>
                </div>

                {/* 🌟 피그마에서 끌어다 쓰는 공유/휴지통 이미지 에셋 적용 */}
                <div
                  style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
                >
                  <img
                    src={Download}
                    alt="공유"
                    onClick={handleShareClick}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      objectFit: 'contain',
                    }}
                  />
                  <img
                    src={Del}
                    alt="삭제"
                    onClick={() => handleDeleteClick(survey.id)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </div>

              <p
                style={{
                  margin: '0 0 16px 0',
                  fontSize: '11px',
                  color: '#5D01C6',
                }}
              >
                {survey.date}
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: '12px',
                    color: '#5D01C6',
                    fontWeight: '500',
                  }}
                >
                  {survey.target} · 응답자 수 : {survey.respondents}
                </p>
                <span
                  onClick={() => alert('설문 열람(상세) 이동')}
                  style={{
                    fontSize: '12px',
                    color: '#5D01C6',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  자세히 보기 &gt;
                </span>
              </div>
            </div>
          ))}

        {/* === 열람한 설문 탭 내용 === */}
        {activeTab === 'viewed' &&
          viewedSurveys.map((survey) => (
            <div
              key={survey.id}
              style={{
                backgroundColor: survey.isFirst ? '#DDBFFF' : '#F8F2FF',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                border: survey.isFirst ? 'none' : '1px solid #EBE0FF',
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '15px',
                  color: '#5D01C6',
                  fontWeight: 'bold',
                }}
              >
                {survey.title}
              </h4>
              <p
                style={{
                  margin: '0 0 16px 0',
                  fontSize: '11px',
                  color: '#5D01C6',
                }}
              >
                {survey.date}
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: '12px',
                    color: '#5D01C6',
                    fontWeight: '500',
                  }}
                >
                  응답자 수 : {survey.respondents}
                </p>
                <span
                  onClick={() => alert('설문 열람(상세) 이동')}
                  style={{
                    fontSize: '12px',
                    color: '#5D01C6',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  자세히 보기 &gt;
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* --------------------------------------------------------
         [5] 휴지통 삭제 확인 팝업
      -------------------------------------------------------- */}
      {showDeletePopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
          }}
        >
          <div
            style={{
              backgroundColor: '#EAE0FF',
              width: '280px',
              borderRadius: '16px',
              padding: '28px 20px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: '0 0 8px 0',
                color: '#5D01C6',
                fontSize: '15px',
                fontWeight: 'bold',
              }}
            >
              정말 삭제하시겠습니까?
            </p>
            <p
              style={{
                margin: '0 0 24px 0',
                color: '#5D01C6',
                fontSize: '11px',
                opacity: 0.8,
              }}
            >
              삭제한 설문은 복구할 수 없습니다.
            </p>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowDeletePopup(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#ffffff',
                  color: '#5D01C6',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                취소
              </button>
              <button
                onClick={() => {
                  setShowDeletePopup(false);
                  alert(`ID ${selectedForDelete}번 설문이 삭제되었습니다.`);
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#DDBFFF',
                  color: '#5D01C6',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
