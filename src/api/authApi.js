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