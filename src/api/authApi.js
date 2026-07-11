import axiosInstance from "./axiosInstance";

export const sendVerificationCode = async (email) => {
  const response = await axiosInstance.post("/auth/email-verifications", {
    email,
    purpose: "SIGNUP",
  });

  return response.data;
};

// 이메일 인증번호 검증
export const verifyVerificationCode = async (email, code) => {
  const response = await axiosInstance.post(
    "/auth/email-verifications/verify",
    {
      email,
      code,
      purpose: "SIGNUP",
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