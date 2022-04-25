export interface User {
    _id: '',
    email: string,
    password?: string,
    role: string,
    firstName: string,
    lastName: string,
    gender: string,
    birthDate: Date | string,
    country?: string
}