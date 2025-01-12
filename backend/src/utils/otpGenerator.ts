import crypto from 'crypto'

export const generateOtpByCrypto = async () => {
    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // let otp = '';
    // for (let i = 0; i < 6; i++) { // Length of OTP, adjust as needed
    //     otp += characters.charAt(Math.floor(Math.random() * characters.length));
    // }
    // return otp;
    const otp = await crypto.randomBytes(3).toString('hex')
    return otp;
};