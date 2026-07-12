import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding: 0 16px;
  position: relative;
  padding-bottom: 100px;
  box-sizing: border-box;
`;

// --- 상단 인디케이터 ---
export const IndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0 35px 0;
  gap: 8px;
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InactiveCircle = styled.div`
  width: 32px;
  height: 32px;
  background-color: #ecdbff;
  border-radius: 50%;
`;

export const ActiveCircle = styled.div`
  width: 36px;
  height: 36px;
  background-color: #5d01c6;
  border-radius: 50%;
`;

export const StepLine = styled.div`
  width: 15%;
  height: 2.5px;
  background-color: #ecdbff;
  transform: translateY(-9px);
`;

export const StepLabel = styled.span`
  font-size: 12px;
  color: #5d01c6;
  font-family: 'Pretendard-SemiBold';
  margin-top: 8px;
`;

export const Box = styled.div`
  margin: 0 30px 0 30px;
`;

// --- 문항 타입 선택 탭 바 ---
export const TabBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0e5ff;
  border-radius: 30px;
  padding: 6px 6px 6px 24px;
  margin-bottom: 30px;
  height: 52px;
  box-sizing: border-box;
`;

export const QNumText = styled.span`
  color: #5d01c6;
  font-family: 'Pretendard-Bold';
  font-size: 16px;
  margin-right: auto;
`;

export const TabGroup = styled.div`
  display: flex;
  gap: 4px;
  height: 100%;
`;

export const TabItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background-color: ${({ $isSelected }) => ($isSelected ? '#FFF' : 'transparent')};
  padding: 0 20px;
  border-radius: 24px;
  height: 100%;
  box-shadow: ${({ $isSelected }) => ($isSelected ? '0px 2px 8px rgba(0,0,0,0.05)' : 'none')};
  transition: all 0.2s ease-in-out;
`;

export const RadioCircle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid
    ${({ $isSelected }) => ($isSelected ? '#5D01C6' : '#9E77EB')};
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex-shrink: 0;
`;

export const RadioDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $isSelected }) => ($isSelected ? '#5D01C6' : 'transparent')};
  transition: background-color 0.15s ease-in-out;
`;

export const TabLabel = styled.span`
  font-size: 14px;
  font-family: 'Pretendard-Bold';
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin-bottom: 30px;
`;

// --- 객관식 / 주관식 폼 요소 ---
export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
`;

// ✨ 보기 라벨과 보기 에러를 가로로 수평 배정하기 위한 정렬 박스 추가 ✨
export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

export const FormLabel = styled.label`
  font-family: 'Pretendard-Bold';
  font-size: 14px;
  color: #5d01c6;
  text-align: left;
`;

// ✨ 보기 글자 우측에 바로 이어붙는 에러 텍스트 스타일 정의 ✨
export const SideErrorMessage = styled.span`
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  color: #ff2eab;
`;

export const OptionRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 10px;
`;

export const DragIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  user-select: none;
  flex-shrink: 0;
`;

export const OptionInput = styled.input`
  flex: 1;
  padding: 18px 24px;
  border-radius: 20px;
  border: 2px solid ${({ $hasError }) => ($hasError ? '#FF2EAB' : '#ecdbff')}; /* 비어있는 해당 인풋 창의 보더만 핑크 변경 */
  outline: none;
  font-size: 16px;
  color: #000000;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? '#FF2EAB' : '#5d01c6')};
  }
`;

export const DeleteTextBtn = styled.span`
  color: #9ca3af;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 0 5px;
`;

export const Spacer = styled.span`
  width: 16px;
  padding: 0 5px;
`;

export const OptionBtnGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
  justify-content: center;
  margin-bottom: 40px;
`;

export const OptionActionBtn = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 20px;
  border: none;
  background-color: #ecdbff;
  color: #5d01c6;
  font-family: 'Pretendard-SemiBold';
  font-size: 14px;
  cursor: pointer;
`;

export const SubjectiveBox = styled.div`
  width: 100%;
  padding: 18px 24px;
  border-radius: 20px;
  border: 2px solid #e5e7eb;
  background-color: #f3f4f6;
  color: #9ca3af;
  font-size: 16px;
  margin-bottom: 40px;
  box-sizing: border-box;
  text-align: left;
`;

// --- 토글 스위치 컴포넌트 ---
export const ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ToggleLabel = styled.span`
  font-size: 14px;
  font-family: 'Pretendard-Medium';
  color: #000000;
`;

export const SwitchTrack = styled.div`
  width: 44px;
  height: 24px;
  background-color: ${({ $isOn }) => ($isOn ? '#5D01C6' : '#E5E7EB')};
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.3s ease;
`;

export const SwitchHandle = styled.div`
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  transform: ${({ $isOn }) => ($isOn ? 'translateX(20px)' : 'translateX(0)')};
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

// --- 하단 고정 버튼 영역 ---
export const BottomFixedBar = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: center;
  padding: 0 16px;
  box-sizing: border-box;
`;
