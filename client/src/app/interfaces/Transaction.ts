export interface Transaction {
    _id: '',
    user: string,
    account: string,
    transactionType?: string,
    title: string,
    description: string,
    category: string,
    currency?: string,
    amount: string,
    transactionDate: string
}