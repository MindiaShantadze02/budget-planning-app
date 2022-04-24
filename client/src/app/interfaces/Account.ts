export interface Account {
    _id: string,
    user: string,
    availableAmount: number,
    title: string,
    description: string,
    currency?: {
        code?: string,
        symbol?: string,
        country: string
    }
}