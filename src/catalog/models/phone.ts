export interface IReleaseDetails {
    announceDate: string;
    priceEur: number;
}

export interface IHardwareDetails {
    audioJack: string;
    gps: string;
    battery: string;
}

export interface IPhone {
    id: number;
    brand: string;
    phone: string;
    picture: string;
    release: IReleaseDetails;
    sim: string;
    resolution: string;
    hardware: IHardwareDetails;
}

export class Phone implements IPhone {
    readonly id: number;
    readonly brand: string;
    readonly phone: string;
    readonly picture: string;
    readonly release: IReleaseDetails;
    readonly sim: string;
    readonly resolution: string;
    readonly hardware: IHardwareDetails;

    constructor(data: IPhone) {}
}
