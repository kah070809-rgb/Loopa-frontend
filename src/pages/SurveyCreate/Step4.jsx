import React, { useState } from 'react';
import TextBox from '../../components/common/TextBox';
import Button from '../../components/common/Button';

// ⭐️ 부모 컴포넌트로부터 현재 몇 번째 문항인지(currentQNum)를 전달받습니다. (기본값 1)
export default function Step4({
  formData,
  updateFormData,
  onNext,
  onPrev,
  currentQNum = 1,
}) {
  const [qType, setQType] = useState('objective');
  const [qTitle, setQTitle] = useState('');
  const [options, setOptions] = useState(['', '']); // 기본 보기 2개 세팅
  const [isMultiple, setIsMultiple] = useState(false);
  const [isRequired, setIsRequired] = useState(false);

  // 보기 내용 수정 핸들러
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // 일반 보기 추가 핸들러
  const addOption = () => {
    setOptions([...options, '']);
  };

  // '기타' 보기 추가 핸들러
  const addOtherOption = () => {
    setOptions([...options, '기타']);
  };

  // 보기 삭제 핸들러 (보기 1, 2는 삭제 불가)
  const removeOption = (index) => {
    if (options.length <= 2) return; // 2개 이하일 땐 삭제 방지
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  // ⭐️ 백엔드로 넘겨줄 데이터 모아서 부모에게 전달하는 핸들러
  const handleAddQuestion = () => {
    if (!qTitle.trim()) {
      alert('질문을 입력해주세요.');
      return;
    }

    // 현재 작성한 문항 데이터를 하나로 예쁘게 포장합니다.
    const questionData = {
      type: qType, // 'objective' or 'subjective'
      title: qTitle,
      options: qType === 'objective' ? options : [], // 객관식일 때만 보기 배열 전송
      isMultiple: isMultiple,
      isRequired: isRequired,
    };

    // 부모 컴포넌트(SurvveyCreate.jsx 등)로 데이터 전달과 함께 다음 스텝(Step 5)으로 이동!
    onNext(questionData);
  };

  const ToggleSwitch = ({ label, isOn, onToggle }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}
    >
      <span
        style={{
          fontSize: '14px',
          fontFamily: 'Pretendard-Medium',
          color: '#000000',
        }}
      >
        {label}
      </span>
      <div
        onClick={onToggle}
        style={{
          width: '44px',
          height: '24px',
          backgroundColor: isOn ? '#5D01C6' : '#E5E7EB',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          padding: '2px',
          cursor: 'pointer',
          boxSizing: 'border-box',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: '#FFF',
            borderRadius: '50%',
            transform: isOn ? 'translateX(20px)' : 'translateX(0)',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        padding: '0 16px',
        position: 'relative',
        paddingBottom: '100px',
        boxSizing: 'border-box',
      }}
    >
      {/* ── [상단 인디케이터] ── */}
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
              backgroundColor: '#ECDBFF',
              borderRadius: '50%',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              color: '#5D01C6',
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
            backgroundColor: '#ECDBFF',
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
              backgroundColor: '#5D01C6',
              borderRadius: '50%',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              color: '#5D01C6',
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
            backgroundColor: '#ECDBFF',
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
              backgroundColor: '#ECDBFF',
              borderRadius: '50%',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              color: '#5D01C6',
              fontFamily: 'Pretendard-SemiBold',
              marginTop: '8px',
            }}
          >
            완료
          </span>
        </div>
      </div>

      {/* ── [문항 타입 선택 탭] ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#F0E5FF',
          borderRadius: '30px',
          padding: '6px 6px 6px 24px',
          marginBottom: '30px',
          height: '52px',
          boxSizing: 'border-box',
        }}
      >
        {/* ⭐️ 동적으로 바뀌는 문항 번호 적용! */}
        <span
          style={{
            color: '#5D01C6',
            fontFamily: 'Pretendard-Bold',
            fontSize: '16px',
            marginRight: 'auto',
          }}
        >
          Q{currentQNum}
        </span>
        <div style={{ display: 'flex', gap: '4px', height: '100%' }}>
          <div
            onClick={() => setQType('objective')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              backgroundColor: qType === 'objective' ? '#FFF' : 'transparent',
              padding: '0 20px',
              borderRadius: '24px',
              height: '100%',
              boxShadow:
                qType === 'objective' ? '0px 2px 8px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                border: '2px solid #5D01C6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
              }}
            >
              {qType === 'objective' && (
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#5D01C6',
                  }}
                />
              )}
            </div>
            <span
              style={{
                fontSize: '14px',
                color: qType === 'objective' ? '#5D01C6' : '#9E77EB',
                fontFamily: 'Pretendard-Bold',
              }}
            >
              객관식
            </span>
          </div>
          <div
            onClick={() => setQType('subjective')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              backgroundColor: qType === 'subjective' ? '#FFF' : 'transparent',
              padding: '0 20px',
              borderRadius: '24px',
              height: '100%',
              boxShadow:
                qType === 'subjective'
                  ? '0px 2px 8px rgba(0,0,0,0.05)'
                  : 'none',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                border: '2px solid #5D01C6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
              }}
            >
              {qType === 'subjective' && (
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#5D01C6',
                  }}
                />
              )}
            </div>
            <span
              style={{
                fontSize: '14px',
                color: qType === 'subjective' ? '#5D01C6' : '#9E77EB',
                fontFamily: 'Pretendard-Bold',
              }}
            >
              주관식
            </span>
          </div>
        </div>
      </div>

      {/* ── [질문 입력창] ── */}
      <TextBox
        guide="질문"
        required={true}
        limit={200}
        currentLength={qTitle.length}
        placeholder="질문을 입력해주세요."
        value={qTitle}
        onChange={(e) => setQTitle(e.target.value)}
        style={{ marginBottom: '30px' }}
      />

      <div
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#E5E7EB',
          marginBottom: '30px',
        }}
      />

      {/* ── [조건부 렌더링: 객관식] ── */}
      {qType === 'objective' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            style={{
              fontFamily: 'Pretendard-Bold',
              fontSize: '14px',
              color: '#5D01C6',
              marginBottom: '12px',
              textAlign: 'left',
            }}
          >
            보기 (선택지)
          </label>
          {options.map((opt, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px',
                gap: '10px',
              }}
            >
              <span style={{ color: '#D1D5DB', fontSize: '18px' }}>⋮⋮</span>
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                placeholder={`보기 ${idx + 1}`}
                style={{
                  flex: 1,
                  padding: '18px 24px',
                  borderRadius: '20px',
                  border: '2px solid #5D01C6',
                  outline: 'none',
                  fontSize: '16px',
                  color: '#000000',
                  boxSizing: 'border-box',
                }}
              />
              {/* ⭐️ 보기1, 보기2(인덱스 0, 1)는 X 버튼을 안 보여줘서 기본으로 안 지워지게 보호! */}
              {idx >= 2 ? (
                <span
                  onClick={() => removeOption(idx)}
                  style={{
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    padding: '0 5px',
                  }}
                >
                  X
                </span>
              ) : (
                <span style={{ width: '16px', padding: '0 5px' }}></span> // 자리맞춤용 빈 공간
              )}
            </div>
          ))}

          {/* ⭐️ 버튼 두 개 가운데 정렬 및 색상 통일 */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '8px',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <button
              onClick={addOption}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: '#ECDBFF',
                color: '#5D01C6',
                fontFamily: 'Pretendard-SemiBold',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              선택지 추가
            </button>
            <button
              onClick={addOtherOption}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: '#ECDBFF',
                color: '#5D01C6',
                fontFamily: 'Pretendard-SemiBold',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              기타로 변경
            </button>
          </div>
          <ToggleSwitch
            label="다중 선택"
            isOn={isMultiple}
            onToggle={() => setIsMultiple(!isMultiple)}
          />
          <ToggleSwitch
            label="필수 응답"
            isOn={isRequired}
            onToggle={() => setIsRequired(!isRequired)}
          />
        </div>
      )}

      {/* ── [조건부 렌더링: 주관식] ── */}
      {qType === 'subjective' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            style={{
              fontFamily: 'Pretendard-Bold',
              fontSize: '14px',
              color: '#5D01C6',
              marginBottom: '12px',
              textAlign: 'left',
            }}
          >
            보기 (선택지)
          </label>
          <div
            style={{
              width: '100%',
              padding: '18px 24px',
              borderRadius: '20px',
              border: '2px solid #E5E7EB',
              backgroundColor: '#F3F4F6',
              color: '#9CA3AF',
              fontSize: '16px',
              marginBottom: '40px',
              boxSizing: 'border-box',
              textAlign: 'left',
            }}
          >
            주관식 답변 공간입니다.
          </div>
          <ToggleSwitch
            label="필수 응답"
            isOn={isRequired}
            onToggle={() => setIsRequired(!isRequired)}
          />
        </div>
      )}

      {/* ── [하단 취소 / 추가하기 고정 버튼] ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '0',
          width: '100%',
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          padding: '0 16px',
          boxSizing: 'border-box',
        }}
      >
        <Button
          onClick={() => {
            // ⭐️ 브라우저 내장 팝업 띄우기
            const isConfirmed = window.confirm(
              '정말 삭제하시겠습니까?\n삭제한 설문은 복구할 수 없습니다.',
            );
            if (isConfirmed) {
              onPrev(); // 사용자가 '확인(삭제)'을 누르면 이전 화면(목록)으로 이동!
            }
            // '취소'를 누르면 아무 일도 일어나지 않고 창만 닫힙니다.
          }}
          style={{
            flex: 1,
            backgroundColor: '#FFF',
            color: '#5D01C6',
            border: '2px solid #ECDBFF',
            fontSize: '15px',
            fontFamily: 'Pretendard-Bold',
            padding: '16px',
            borderRadius: '30px',
          }}
        >
          취소
        </Button>
        <Button
          onClick={handleAddQuestion} // ⭐️ 데이터 포장 후 전송!
          style={{
            flex: 1,
            backgroundColor: '#ECDBFF',
            color: '#5D01C6',
            border: 'none',
            fontSize: '15px',
            fontFamily: 'Pretendard-Bold',
            padding: '16px',
            borderRadius: '30px',
          }}
        >
          추가하기
        </Button>
      </div>
    </div>
  );
}
