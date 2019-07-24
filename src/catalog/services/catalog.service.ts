import { map } from 'lodash';
import 'isomorphic-fetch';

import config from '../../config/config';
import { Phone } from '../models/phone';
import { PhoneAdapter } from './adapters/phone.adapter';

export class CatalogService {
    constructor() {}

    static async retrieveCatalog(offset: number = 0, limit: number = 50): Promise<Phone[]> {
        const response: Response = await fetch(`${config.apiBaseURL}/1f2r2v`);
        if (response.status >= 400) {
            throw new Error('Bad response from server');
        }
        const responseBody: any[] = await response.json();

        const phones: Phone[] = map(responseBody, (datum: any) => {
            return PhoneAdapter.fromAPIResponse(datum);
        });

        return phones;
    }
}
