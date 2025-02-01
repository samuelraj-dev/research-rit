import { axiosInstance } from "./axios";

export async function isLoggedIn() {
  try {
    const user = await axiosInstance.get("/users/user/data");
    if (!user.data.permissions) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }  
}

export async function isAuthorized(permission: string) {
  try {
    const user = await axiosInstance.get("/users/user/data");
    if (!user.data.permissions || !user.data.permissions.includes(permission)) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}