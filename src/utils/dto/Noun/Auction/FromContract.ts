export default interface AuctionFromContract {
    nounId: number;
    amount: string;
    startTime: number;
    endTime: number;
    bidder: string;
    settled: boolean;
}
