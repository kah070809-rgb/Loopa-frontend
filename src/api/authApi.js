import axiosInstance from "./axiosInstance";

export const VERIFICATION_PURPOSE = {
  SIGNUP: "SIGNUP",
  PASSWORD_RESET: "PASSWORD_RESET",
};

// 이메일 인증번호 발송
export const sendVerificationCode = async (
  email,
  purpose = VERIFICATION_PURPOSE.SIGNUP
) => {
  const response = await axiosInstance.post(
    "/auth/email-verifications",
    {
      email,
      purpose,
    }
  );

  return response.data;
};

// 이메일 인증번호 검증
export const verifyVerificationCode = async (
  email,
  code,
  purpose = VERIFICATION_PURPOSE.SIGNUP
) => {
  const response = await axiosInstance.post(
    "/auth/email-verifications/verify",
    {
      email,
      code,
      purpose,
    }
  );

  return response.data;
};

// 회원가입
export const signup = async ({
  email,
  password,
  gender,
  age,
  job,
}) => {
  const requestBody = {
    email,
    password,
    gender,
    age: Number(age),
  };

  if (job) {
    requestBody.job = job;
  }

  const response = await axiosInstance.post(
    "/auth/signup",
    requestBody
  );

  return response.data;
};

// 로그인
export const login = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

// 비밀번호 재설정
export const resetPassword = async (email, newPassword) => {
  const response = await axiosInstance.post(
    "/auth/password/reset",
    {
      email,
      newPassword,
    }
  );

  return response.data;
};