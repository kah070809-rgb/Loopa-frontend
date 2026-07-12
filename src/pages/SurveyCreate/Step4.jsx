import React, { useState, useEffect } from 'react';
import * as S from './Step4.style';
import TextBox from '../../components/common/Textbox';
import Button from '../../components/common/Button';

// 피그마 사진 파일(Dot.svg) 임포트
import Dot from '../../assets/images/Dot.svg';

export default function Step4({
  questions = [],
  editingQuestionId = null,
  onNext,
  onPrev,
}) {
  const isEditMode = editingQuestionId !== null;
  const currentQNum = isEditMode ? editingQuestionId + 1 : questions.length + 1;

  const [qType, setQType] = useState('objective');
  const [qTitle, setQTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [isMultiple, setIsMultiple] = useState(false);
  const [isRequired, setIsRequired] = useState(false);

  // ✨ 예외 처리를 분리하여 개별 상태로 관리 ✨
  const [titleError, setTitleError] = useState('');
  const [optionError, setOptionError] = useState('');

  useEffect(() => {
    if (isEditMode && questions[editingQuestionId]) {
      const targetQ = questions[editingQuestionId];
      setQType(targetQ.type);
      setQTitle(targetQ.title);
      setOptions(targetQ.options.length > 0 ? targetQ.options : ['', '']);
      setIsMultiple(targetQ.isMultiple);
      setIsRequired(targetQ.isRequired);
    } else {
      setQType('objective');
      setQTitle('');
      setOptions(['', '']);
      setIsMultiple(false);
      setIsRequired(false);
    }
    setTitleError('');
    setOptionError('');
  }, [editingQuestionId, isEditMode, questions]);

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
    let hasError = false;

    // 1. 질문 예외 처리
    if (!qTitle.trim()) {
      setTitleError('질문을 입력해주세요.');
      hasError = true;
    } else {
      setTitleError('');
    }

    // 2. 객관식일 때 보기 빈 칸 예외 처리 분리
    if (qType === 'objective') {
      const hasEmptyOption = options.some((opt) => !opt.trim());
      if (hasEmptyOption) {
        setOptionError('내용을 입력해주세요.');
        hasError = true;
      } else {
        setOptionError('');
      }
    }

    if (hasError) return;

    const questionData = {
      type: qType,
      title: qTitle,
      options: qType === 'objective' ? options : [],
      isMultiple: isMultiple,
      isRequired: isRequired,
    };

    onNext(questionData);
  };

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

      {/* ── [문항 타입 선택 탭 바] ── */}
      <S.TabBar>
        <S.QNumText>Q{currentQNum}</S.QNumText>
        <S.TabGroup>
          <S.TabItem
            $isSelected={qType === 'objective'}
            onClick={() => setQType('objective')}
          >
            <S.RadioCircle $isSelected={qType === 'objective'}>
              <S.RadioDot $isSelected={qType === 'objective'} />
            </S.RadioCircle>
            <S.TabLabel
              style={{ color: qType === 'objective' ? '#5D01C6' : '#9E77EB' }}
            >
              객관식
            </S.TabLabel>
          </S.TabItem>

          <S.TabItem
            $isSelected={qType === 'subjective'}
            onClick={() => setQType('subjective')}
          >
            <S.RadioCircle $isSelected={qType === 'subjective'}>
              <S.RadioDot $isSelected={qType === 'subjective'} />
            </S.RadioCircle>
            <S.TabLabel
              style={{ color: qType === 'subjective' ? '#5D01C6' : '#9E77EB' }}
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
        error={titleError}
        limit={200}
        currentLength={qTitle.length}
        placeholder="질문을 입력해주세요."
        value={qTitle}
        onChange={(e) => {
          setQTitle(e.target.value);
          if (titleError) setTitleError('');
        }}
        style={{ marginBottom: '30px' }}
      />

      <S.Divider />

      {/* ── [조건부 렌더링: 객관식] ── */}
      {qType === 'objective' && (
        <S.FormSection>
          {/* ✨ 보기 라벨과 에러 메시지를 가로 정렬하기 위한 구조 변경 ✨ */}
          <S.LabelRow>
            <S.FormLabel style={{ marginBottom: 0 }}>보기 (선택지)</S.FormLabel>
            {optionError && (
              <S.SideErrorMessage>{optionError}</S.SideErrorMessage>
            )}
          </S.LabelRow>

          {options.map((opt, idx) => (
            <S.OptionRow key={idx}>
              <S.DragIconWrapper>
                <img
                  src={Dot}
                  alt="선택지 드래그 도트"
                  style={{ objectFit: 'contain' }}
                />
              </S.DragIconWrapper>

              <S.OptionInput
                type="text"
                value={opt}
                onChange={(e) => {
                  handleOptionChange(idx, e.target.value);
                  if (optionError) setOptionError('');
                }}
                placeholder={`보기 ${idx + 1}`}
                $hasError={!!optionError && !opt.trim()}
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

      {/* ── [하단 버튼 바] ── */}
      <S.BottomFixedBar>
        <Button
          onClick={() => {
            const isConfirmed = window.confirm(
              isEditMode
                ? '문항 수정을 취소하시겠습니까?'
                : '문항 추가를 취소하시겠습니까?',
            );
            if (isConfirmed) onPrev();
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
          {isEditMode ? '수정완료' : '추가하기'}
        </Button>
      </S.BottomFixedBar>
    </S.Container>
  );
}
