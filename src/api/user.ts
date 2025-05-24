import { apiClient } from "./common";
import type { User, Project, Organization } from "./type";

export function checkToken(token: string): boolean {
  // Simulate token validation
  return token === "valid-token";
}

// 无感知登录
export const login = async (username: string, password: string, captcha_token: string): Promise<{ message: string, token: string, refresh_token: string }> => {
  const response = await apiClient.post("/user/login", {
    username,
    password,
    captcha_token
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Login failed");
}

// 登出，服务器清除Cookies
export const logout = async (): Promise<{ message: string }> => {
  const response = await apiClient.post("/user/logout");
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Logout failed");
}

// 注册
export const register = async (username: string, password: string, email: string, verify_code: string, captcha_token: string): Promise<{ message: string }> => {
  const response = await apiClient.post("/user/register", {
    username,
    password,
    verify_code,
    email,
    captcha_token
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Registration failed");
}

// 获取用户信息
export const getUser = async (user_id: number): Promise<{ message: string, user: User }> => {
  const response = await apiClient.get(`/user/${user_id}`);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to fetch user info");
}

// 更新用户信息
export const updateUser = async (user: User): Promise<{ message: string }> => {
  const response = await apiClient.put("/user", user);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to update user info");
}

// 获取项目列表
export const getProjects = async (user_id: number, page: number, limit: number): Promise<{ message: string, projects: Array<Project> }> => {
  const response = await apiClient.get(`/user/${user_id}/projects?page=${page}&limit=${limit}`);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to fetch projects");
}

// 获取组织列表
export const getOrganizations = async (user_id: number, page: number, limit: number): Promise<{ message: string, organizations: Array<Organization> }> => {
  const response = await apiClient.get(`/user/${user_id}/organizations?page=${page}&limit=${limit}`);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to fetch organizations");
}