import { filter } from 'lodash';

import { Phone } from '../models/phone';
import { ISelectedFilters } from '../models/filters';

const applyFilters = (phones: { [key: number]: Phone }, selectedFilters: ISelectedFilters): Phone[] => {
    return filter(phones, (datum: Phone) => {
        let doesPhoneSatisfyFilter: boolean = true;

        if (!selectedFilters.brands.includes(datum.brand)) {
            doesPhoneSatisfyFilter = false;
        } else if (!selectedFilters.sim.includes(datum.sim)) {
            doesPhoneSatisfyFilter = false;
        } else if (!selectedFilters.gps.includes(datum.hardware.gps)) {
            doesPhoneSatisfyFilter = false;
        } else if (!selectedFilters.audioJack.includes(datum.hardware.audioJack)) {
            doesPhoneSatisfyFilter = false;
        }

        return doesPhoneSatisfyFilter;
    });
};

export { applyFilters };
