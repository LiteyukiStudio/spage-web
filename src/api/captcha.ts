import { apiClient } from "./common";

export const getCaptcha = async (): Promise<{message: string, site_key: string, provider: string, url: string}> => {
    const response = await apiClient.get(`/user/captcha`);
    if (response.status === 200) {
        return response.data;
    }
    throw new Error("Failed to fetch captcha");
}