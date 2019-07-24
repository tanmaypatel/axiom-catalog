import { Phone } from '../../models/phone';

export class PhoneAdapter {
    static fromAPIResponse(data: any): Phone {
        return new Phone({
            id: data.id,
            brand: data.brand,
            phone: data.phone,
            picture: data.picture,
            release: {
                announceDate: data.release.announceDate,
                priceEur: data.release.priceEur
            },
            sim: data.sim,
            resolution: data.resolution,
            hardware: {
                audioJack: data.hardware.audioJack,
                gps: data.hardware.gps,
                battery: data.hardware.battery
            }
        });
    }
}
