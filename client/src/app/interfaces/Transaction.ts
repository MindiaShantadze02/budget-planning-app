export interface Transaction {
    _id: '',
    user: string,
    account: string,
    transactionType?: string,
    title: string,
    description: string,
    category: string,
    currency?: {
        code?: string,
        symbol?: string,
        country: string
    },
    amount: number,
    transactionDate: string
}