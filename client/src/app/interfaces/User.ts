export interface User {
    email: string,
    password?: string,
    role: string,
    firstName: string,
    lastName: string,
    gender: string,
    birthDate: Date | string,
    country?: string
}