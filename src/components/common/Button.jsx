import React from 'react';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary(진한색), secondary(연한/회색), outline(테두리만)
  width = '100%', // '100%' 또는 'auto' 또는 '120px' 등 자유롭게 지정
  disabled = false,
  style,
  ...props
}) {
  // variant 종류에 따른 색상 스타일 매핑
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: '#E5E7EB', // 연한 회색 (와이어프레임의 비활성 느낌이나 '이전' 버튼)
          color: '#374151',
          border: 'none',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: '#374151',
          border: '1px solid #D1D5DB', // 테두리만 있는 버튼
        };
      case 'primary':
      default:
        return {
          backgroundColor: '#374151', // 메인 버튼 (진한 회색/검정 계열)
          color: 'white',
          border: 'none',
        };
    }
  };

  const baseStyle = {
    width: width,
    padding: '14px 20px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...getVariantStyle(),
    ...style, // 외부에서 커스텀하게 주는 스타일이 있다면 덮어씀
  };

  return (
    <button
      type={type}
      onClick={disabled ? null : onClick}
      style={baseStyle}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
