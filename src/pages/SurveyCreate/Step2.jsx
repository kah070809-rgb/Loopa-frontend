import React from 'react';
import TextBox from '../../components/common/TextBox';
import Button from '../../components/common/Button';

export default function Step2({ formData, updateFormData, onNext }) {
  // 드롭다운(select) 공통 디자인 스타일
  const selectStyle = {
    width: '100%',
    justifyContent: 'center',
    padding: '16px 24px',
    borderRadius: '20px',
    border: '2px solid #A855F7',
    outline: 'none',
    fontSize: '16px',
    color: '#DDBFFF',
    backgroundColor: '#FFF',
    boxSizing: 'border-box',
    appearance: 'none',
    margin: '0 0 20px 0',

    // 화살표 관련
    // // backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23A855F7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
    // // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'right 20px center',
    // backgroundSize: '20px',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        padding: '0 30px',
        position: 'relative',
        paddingBottom: '50px',
      }}
    >
      {/* 1. 상단 스텝 동그라미 인디케이터 껍데기 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10px 0 35px 0',
          gap: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#5D01C6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              color: '#450093',
              fontFamily: 'Pretendard-SemiBold',
              marginTop: '8px',
            }}
          >
            기본정보
          </span>
        </div>
        <div
          style={{
            width: '15%',
            height: '2.5px',
            backgroundColor: '#DDBFFF',
            transform: 'translateY(-9px)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#DDBFFF',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              color: '#450093',
              fontFamily: 'Pretendard-SemiBold',
              marginTop: '8px',
            }}
          >
            문항 구성
          </span>
        </div>
        <div
          style={{
            width: '15%',
            height: '2.5px',
            backgroundColor: '#DDBFFF',
            transform: 'translateY(-9px)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#E9D5FF',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              color: '#450093',
              fontFamily: 'Pretendard-SemiBold',
              marginTop: '8px',
            }}
          >
            완료
          </span>
        </div>
      </div>
      <h3
        style={{
          fontFamily: 'Pretendard-Bold',
          color: '#5D01C6',
          margin: '0 0 15px 0',
          textAlign: 'left',
        }}
      >
        기본 정보 입력
      </h3>
      {/* 2. 설문 제목 (TextBox 사용) */}
      <TextBox
        guide="설문 제목"
        required={true}
        limit={100}
        currentLength={formData?.title?.length || 0}
        placeholder="설문 제목을 입력해주세요."
        value={formData?.title || ''}
        onChange={(e) => updateFormData({ title: e.target.value })}
      />
      {/* 3. 설문 설명 (TextBox 주관식 모드 사용) */}
      <TextBox
        guide="설문 설명 (선택)"
        isTextArea={true}
        limit={1000}
        currentLength={formData?.description?.length || 0}
        placeholder="설문에 대한 설명을 입력해주세요."
        value={formData?.description || ''}
        onChange={(e) => updateFormData({ description: e.target.value })}
      />
      {/* 4. 희망 설문 대상 드롭다운 */}
      <div style={{ textAlign: 'left' }}>
        <label
          style={{
            fontWeight: '700',
            marginBottom: '12px',
            fontSize: '18px',
            color: '#000000',
            display: 'block',
          }}
        >
          희망 설문 대상 <span style={{ color: '#EF4444' }}>*</span>
        </label>
        <select style={selectStyle} defaultValue="">
          <option value="" disabled>
            희망 설문 대상을 선택해주세요.
          </option>
          <option value="1">대학생</option>
          <option value="2">직장인</option>
          <option value="3">청소년</option>
        </select>
      </div>
      {/* 5. 카테고리 드롭다운 */}
      <div style={{ textAlign: 'left' }}>
        <label
          style={{
            fontWeight: '700',
            marginBottom: '12px',
            fontSize: '18px',
            color: '#000000',
            display: 'block',
          }}
        >
          카테고리 <span style={{ color: '#EF4444' }}>*</span>
        </label>
        <select style={selectStyle} defaultValue="">
          <option value="" disabled>
            카테고리를 선택해주세요.
          </option>
          <option value="1">학업·진로</option>
          <option value="2">IT·AI</option>
          <option value="3">서비스·앱</option>
          <option value="4">소비·마케팅</option>
          <option value="5">게임</option>
          <option value="6">학교생활</option>
          <option value="7">일상</option>
          <option value="8">심리</option>
          <option value="9">기타</option>
        </select>
      </div>
      {/* 6. 설문 기간 (시작일 고정텍스트 & 종료일 네이티브 달력) */}
      <div style={{ marginBottom: '40px', textAlign: 'left' }}>
        <label
          style={{
            fontWeight: '700',
            marginBottom: '12px',
            fontSize: '18px',
            color: '#000000',
            display: 'block',
          }}
        >
          설문 기간 <span style={{ color: '#EF4444' }}>*</span>
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* 시작일 배경 회색 비활성 칸 */}
          <div style={{ flex: 1 }}>
            <input
              type="text"
              value="2026.07.01"
              disabled
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '24px',
                border: '2.5px solid #E5E7EB',
                backgroundColor: '#F3F4F6',
                color: '#9CA3AF',
                fontSize: '16px',
                textAlign: 'center',
                boxSizing: 'border-box',
                fontWeight: '600',
              }}
            />
          </div>

          <span style={{ color: '#A855F7', fontWeight: 'bold' }}>~</span>

          {/* 종료일 클릭하면 달력 뜨는 인풋 */}
          <div style={{ flex: 1 }}>
            <input
              type="date"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '24px',
                border: '2.5px solid #A855F7',
                color: '#A855F7',
                fontSize: '16px',
                textAlign: 'center',
                boxSizing: 'border-box',
                outline: 'none',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>
      </div>
      {/* 7. 하단 고정 다음 버튼 */}
      <div style={{ width: '100%', paddingBottom: '20px' }}>
        <Button
          onClick={onNext}
          style={{
            backgroundColor: '#ECDBFF',
            color: '#5D01C6',
            fontSize: '14px',
            fontFamily: 'Pretendard-Bold',
            padding: '16px',
            borderRadius: '30px',
            boxShadow: '2px 2px 2px rgba(0,0,0,0.25)',
          }}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
