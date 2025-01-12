import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const createUserBodySchema = z.object({
    // roleId: z.string(),
    prefix: z.string(),
    fullName: z.string(),
    employeeId: z.string(),
    workEmail: z.string(),
    dateOfJoining: z.string(),
    designation: z.string(),
    department: z.string(),
    // password: z.string(),
    avatarUrl: z.string().optional(),
    // applicationId: z.string(),

    // initialUser: z.boolean().optional()
})

export type CreateUserBody = z.infer<typeof createUserBodySchema>;

export const createUserJsonSchema = {
    body: zodToJsonSchema(createUserBodySchema, "createUserBodySchema"),
};

const loginBodySchema = z.object({
    workEmail: z.string().email(),
    password: z.string(),
    applicationId: z.string(),
});

export type LoginBody = z.infer<typeof loginBodySchema>;

export const loginJsonSchema = {
    body: zodToJsonSchema(loginBodySchema, "loginBodySchema"),
};

const registerBodySchema = z.object({
    workEmail: z.string().email(),
    password: z.string(),
    applicationId: z.string(),
});

export type RegisterBody = z.infer<typeof registerBodySchema>;

export const registerJsonSchema = {
    body: zodToJsonSchema(registerBodySchema, "registerBodySchema"),
};