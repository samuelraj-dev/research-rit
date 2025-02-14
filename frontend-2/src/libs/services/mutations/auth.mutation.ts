import { useMutation } from "@tanstack/react-query";
import { checkUserActivationApi, checkUserOtpApi, loginUserApi, logoutUserApi, setUserPasswordApi } from "../apis/auth.api";

export function useCheckUserActivationMutation() {

    return useMutation({
        mutationFn: (data: { workEmail: string }) => checkUserActivationApi(data),
    })
}

export function useCheckUserOtpMutation() {

    return useMutation({
        mutationFn: (data: { workEmail: string, otp: string }) => checkUserOtpApi(data),
    })
}

export function useSetUserPasswordMutation() {

    return useMutation({
        mutationFn: (data: { workEmail: string, password: string }) => setUserPasswordApi(data),
    })
}

export function useLoginUserMutation() {

    return useMutation({
        mutationFn: (data: { workEmail: string, password: string }) => loginUserApi(data),
    })
}

export function useLogoutUserMutation() {

    return useMutation({
        mutationFn: () => logoutUserApi(),
    })
}