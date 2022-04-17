export interface Transaction {
    user: string,
    account: string,
    transactionType?: string,
    title: string,
    description: string,
    category: string,
    currency?: string,
    amount: string
}