export const ALL_PERMISSIONS = [
    // research paper
    'research_paper:own_write',
    'research_paper:own_read',
    'research_paper:read',

    'research_paper:own_delete',
    'research_paper:accept',
    'research_paper:reject',

    // user
    'user:own_read',
    'user:read',
    'user:write',
    'user:delete'
] as const;

export const PERMISSIONS = ALL_PERMISSIONS.reduce((acc, permission) => {
    acc[permission] = permission

    return acc;
}, {} as Record<(typeof ALL_PERMISSIONS)[number], (typeof ALL_PERMISSIONS)[number]>)

export const SUPER_ADMIN_PERMISSIONS = [
    PERMISSIONS["research_paper:read"],
    PERMISSIONS["research_paper:accept"],
    PERMISSIONS["research_paper:reject"],
    PERMISSIONS["user:own_read"],
    PERMISSIONS["user:read"],
    PERMISSIONS["user:write"],
    PERMISSIONS["user:delete"],
]

export const FACULTY_PERMISSIONS = [
    PERMISSIONS["research_paper:own_write"],
    PERMISSIONS["research_paper:own_read"],
    PERMISSIONS["research_paper:own_delete"],
    PERMISSIONS["user:own_read"]
]

export const HOD_PERMISSIONS = [
    PERMISSIONS["research_paper:own_write"],
    PERMISSIONS["research_paper:own_read"],
    PERMISSIONS["research_paper:own_delete"],
    PERMISSIONS["research_paper:read"],
    PERMISSIONS["research_paper:accept"],
    PERMISSIONS["research_paper:reject"],
    PERMISSIONS["user:own_read"],
]

export const SYSTEM_ROLES = {
    SUPER_ADMIN: 'ADMIN',
    HOD: 'HOD',
    FACULTY: 'FACULTY',
}