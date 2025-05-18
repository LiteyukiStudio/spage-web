import { apiClient } from "./common";
import type { User } from "./type";

export function checkToken(token: string): boolean {
  // Simulate token validation
  return token === "valid-token";
}

/**
 * 登录，由于使用了Captcha，需要使用表单
 * @param username 用户名
 * @param password 密码
 * @returns 用户信息
 * @throws 获取失败时抛出异常
 */
export const login = async (username: string, password: string): Promise<{ message: string, token: string, refresh_token: string }> => {
  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  const response = await apiClient.post("/user/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Login failed");
}

/**
 * 获取用户信息
 * @param user_id 用户ID，默认为"0"表示当前用户
 * @returns 用户信息
 * @throws 获取失败时抛出异常
 */
export const getUserInfo = async (user_id: string = "0"): Promise<{ message: string, user: User }> => {
  const response = await apiClient.get(user_id == "0" ? '/user' : `/user/${user_id}`);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to fetch user info");
}