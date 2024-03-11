import { Item, Transactions } from "../Interfaces/Transactions";

function calculateAverageRetention(transactions: Transactions, cryptoAddressId: string, token: string): [number, number, number, number] {
    const retentionTimes: number[] = [];
    const incomingTransactions: Item[] = transactions.items.filter(item => item.to.id === cryptoAddressId && item.tokenAddress === token);
    const outgoingTransactions: Item[] = transactions.items.filter(item => item.from.id === cryptoAddressId && item.tokenAddress === token);

    incomingTransactions.forEach(inTransaction => {
        const inTimestamp = new Date(inTransaction.createdAt).getTime();
        const relatedOutTransactions = outgoingTransactions.filter(outTransaction => new Date(outTransaction.createdAt).getTime() > inTimestamp);

        let retentionTime: number;
        if (relatedOutTransactions.length > 0) {
            const outTimestamp = new Date(relatedOutTransactions.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())[0].createdAt).getTime();
            retentionTime = (outTimestamp - inTimestamp) / (1000 * 60 * 60 * 24); // Convert ms to days
        } else {
            // Si aucun token vendu, calculez le temps jusqu'à aujourd'hui
            const nowTimestamp = new Date().getTime();
            retentionTime = (nowTimestamp - inTimestamp) / (1000 * 60 * 60 * 24); // Convert ms to days
        }
        retentionTimes.push(retentionTime);
    });

    if (retentionTimes.length === 0) return [0, incomingTransactions.length, outgoingTransactions.length, transactions.items.length];

    const totalRetention = retentionTimes.reduce((acc, curr) => acc + curr, 0);
    return [totalRetention / retentionTimes.length, incomingTransactions.length, outgoingTransactions.length, transactions.items.length];
}

function formatTimeSpent(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export { calculateAverageRetention, formatTimeSpent };