import React from 'react';

export default function Button({
  children,
  onClick,
  type = 'button',
  width = '100%',
  disabled = false,
  style,
  ...props
}) {
  // 💡 getVariantStyle 함수가 없을 경우를 대비해 안전장치(비어있는 스타일 객체 반환)를 만들어둡니다.
  const getVariantStyleSafe = () => {
    if (typeof getVariantStyle === 'function') {
      return getVariantStyle();
    }
    return {};
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
    ...getVariantStyleSafe(), // 💡 에러 나던 부분 대신 안전한 함수 호출로 교체
    ...style,
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
