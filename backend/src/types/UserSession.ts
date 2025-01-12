export interface UserSession {
    id: string;
    workEmail: string;
    applicationId: string;
    roleId: string;
    role: string;
    permissions: string[];
}