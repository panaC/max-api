
export interface Ijourney {
    readonly originCode: string;
    readonly originName: string;
    readonly destinationCode: string;
    readonly destinationName: string;
    readonly departureDateTime: string;
    readonly arrivalDateTime: string;
    readonly train: string;
    readonly availableSeatsCount: number;
}
