// TextBox.jsx
import React from 'react';
import {
  wrapperStyle,
  labelStyle,
  getContainerStyle,
  footerStyle,
  placeholderScript,
} from './Textbox.style.js';

export default function TextBox({
  guide,
  error,
  errorColor = '#FF2EAB',
  isTextArea = false,
  limit,
  currentLength = 0,
  required = false,
  style,
  ...props
}) {
  return (
    <div style={{ ...wrapperStyle, ...style }}>
      <style type="text/css">{placeholderScript}</style>

      {/* 상단 가이드 타이틀 영역 */}
      {guide && (
        <label style={labelStyle}>
          {guide}
          {required && (
            <span style={{ color: '#EF4444', marginLeft: '4px' }}>*</span>
          )}
        </label>
      )}

      {/* 입력창 영역 */}
      {isTextArea ? (
        <textarea
          className="custom-textbox-input"
          style={{
            ...getContainerStyle(error, errorColor),
            height: '140px',
            resize: 'none',
          }}
          maxLength={limit}
          {...props}
        />
      ) : (
        <input
          className="custom-textbox-input"
          style={getContainerStyle(error, errorColor)}
          maxLength={limit}
          {...props}
        />
      )}

      {/* 하단 에러 메시지 및 글자 수 제한 영역 */}
      <div style={footerStyle}>
        {error ? (
          <span style={{ color: errorColor, fontWeight: '500' }}>{error}</span>
        ) : (
          <span />
        )}

        {limit && (
          <span style={{ color: '#9CA3AF', fontWeight: '500' }}>
            {currentLength}/{limit}
          </span>
        )}
      </div>
    </div>
  );
}
