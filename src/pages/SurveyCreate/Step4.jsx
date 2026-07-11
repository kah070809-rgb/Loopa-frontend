import React, { useState } from 'react';
import * as S from './step4.style'; // 분리된 스타일 컴포넌트 임포트
import TextBox from '../../components/common/TextBox';
import Button from '../../components/common/Button';

export default function Step4({
  formData,
  updateFormData,
  onNext,
  onPrev,
  currentQNum = 1,
}) {
  const [qType, setQType] = useState('objective');
  const [qTitle, setQTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [isMultiple, setIsMultiple] = useState(false);
  const [isRequired, setIsRequired] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const addOtherOption = () => {
    setOptions([...options, '기타']);
  };

  const removeOption = (index) => {
    if (options.length <= 2) return;
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleAddQuestion = () => {
    if (!qTitle.trim()) {
      alert('질문을 입력해주세요.');
      return;
    }

    const questionData = {
      type: qType,
      title: qTitle,
      options: qType === 'objective' ? options : [],
      isMultiple: isMultiple,
      isRequired: isRequired,
    };

    onNext(questionData);
  };

  // 내부 모듈식 토글 스위치 컴포넌트
  const ToggleSwitch = ({ label, isOn, onToggle }) => (
    <S.ToggleRow>
      <S.ToggleLabel>{label}</S.ToggleLabel>
      <S.SwitchTrack $isOn={isOn} onClick={onToggle}>
        <S.SwitchHandle $isOn={isOn} />
      </S.SwitchTrack>
    </S.ToggleRow>
  );

  return (
    <S.Container>
      {/* ── [상단 인디케이터] ── */}
      <S.IndicatorContainer>
        <S.StepWrapper>
          <S.InactiveCircle />
          <S.StepLabel>기본정보</S.StepLabel>
        </S.StepWrapper>

        <S.StepLine />

        <S.StepWrapper>
          <S.ActiveCircle />
          <S.StepLabel>문항 구성</S.StepLabel>
        </S.StepWrapper>

        <S.StepLine />

        <S.StepWrapper>
          <S.InactiveCircle />
          <S.StepLabel>완료</S.StepLabel>
        </S.StepWrapper>
      </S.IndicatorContainer>

      {/* ── [문항 타입 선택 탭] ── */}
      <S.TabBar>
        <S.QNumText>Q{currentQNum}</S.QNumText>
        <S.TabGroup>
          {/* 객관식 탭 */}
          <S.TabItem
            $isSelected={qType === 'objective'}
            onClick={() => setQType('objective')}
          >
            {/* $isSelected를 넘겨서 선택되었을 때만 내부 점이 보이도록 조절합니다 */}
            <S.RadioCircle>
              <S.RadioDot $isSelected={qType === 'objective'} />
            </S.RadioCircle>
            <S.TabLabel
              style={{ color: qType === 'objective' ? '#5D01C6' : '#9E77EB' }}
            >
              객관식
            </S.TabLabel>
          </S.TabItem>

          {/* 주관식 탭 */}
          <S.TabItem
            $isSelected={qType === 'subjective'}
            onClick={() => setQType('subjective')}
          >
            <S.RadioCircle>
              <S.RadioDot $isSelected={qType === 'subjective'} />
            </S.RadioCircle>
            <S.TabLabel
              style={{
                color: qType === 'subjective' ? '#5D01C6' : '#9E77EB',
              }}
            >
              주관식
            </S.TabLabel>
          </S.TabItem>
        </S.TabGroup>
      </S.TabBar>

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

      <S.Divider />

      {/* ── [조건부 렌더링: 객관식] ── */}
      {qType === 'objective' && (
        <S.FormSection>
          <S.FormLabel>보기 (선택지)</S.FormLabel>
          {options.map((opt, idx) => (
            <S.OptionRow key={idx}>
              <S.DragIcon>⋮⋮</S.DragIcon>
              <S.OptionInput
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                placeholder={`보기 ${idx + 1}`}
              />
              {idx >= 2 ? (
                <S.DeleteTextBtn onClick={() => removeOption(idx)}>
                  X
                </S.DeleteTextBtn>
              ) : (
                <S.Spacer />
              )}
            </S.OptionRow>
          ))}

          <S.OptionBtnGroup>
            <S.OptionActionBtn onClick={addOption}>
              선택지 추가
            </S.OptionActionBtn>
            <S.OptionActionBtn onClick={addOtherOption}>
              기타로 변경
            </S.OptionActionBtn>
          </S.OptionBtnGroup>

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
        </S.FormSection>
      )}

      {/* ── [조건부 렌더링: 주관식] ── */}
      {qType === 'subjective' && (
        <S.FormSection>
          <S.FormLabel>보기 (선택지)</S.FormLabel>
          <S.SubjectiveBox>주관식 답변 공간입니다.</S.SubjectiveBox>
          <ToggleSwitch
            label="필수 응답"
            isOn={isRequired}
            onToggle={() => setIsRequired(!isRequired)}
          />
        </S.FormSection>
      )}

      {/* ── [하단 취소 / 추가하기 고정 버튼] ── */}
      <S.BottomFixedBar>
        <Button
          onClick={() => {
            const isConfirmed = window.confirm(
              '정말 삭제하시겠습니까?\n삭제한 설문은 복구할 수 없습니다.',
            );
            if (isConfirmed) {
              onPrev();
            }
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
          onClick={handleAddQuestion}
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
      </S.BottomFixedBar>
    </S.Container>
  );
}
