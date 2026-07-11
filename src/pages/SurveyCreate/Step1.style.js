import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Illustration = styled.img`
  object-fit: contain;
`;

export const MainTitle = styled.h2`
  font-family: 'Pretendard-Bold';
  color: #5d01c6;
  line-height: 1.4;
  margin-bottom: 50px;
  text-align: center;
  font-size: 21px;
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  margin-bottom: 60px;
`;

export const FeatureItem = styled.div``;

export const FeatureTitle = styled.h4`
  margin: 0 0 8px 0;
  font-family: 'Pretendard-SemiBold';
  color: #5d01c6;
  font-size: 14px;
`;

export const FeatureDesc = styled.p`
  margin: 0;
  color: #5d01c6;
  font-family: 'Pretendard-Regular';
  font-size: 11px;
`;

export const ButtonWrapper = styled.div`
  width: 78%;
  padding-bottom: 20px;
`;
