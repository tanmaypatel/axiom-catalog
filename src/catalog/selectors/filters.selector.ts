import { filter, memoize } from 'lodash';

import { Phone } from '../models/phone';
import { ISelectedFilters } from '../models/filters';

const _prepareTextForSearch = memoize((phone: Phone) => {
    return `${phone.brand} ${phone.phone} ${phone.sim} ${phone.resolution} ${phone.hardware.battery} ${phone.hardware.audioJack} ${phone.hardware.gps} ${phone.release.announceDate}`;
});

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
        } else if (selectedFilters.searchTerm) {
            if (!new RegExp(selectedFilters.searchTerm, 'ig').test(_prepareTextForSearch(datum))) {
                doesPhoneSatisfyFilter = false;
            }
        }

        return doesPhoneSatisfyFilter;
    });
};

export { applyFilters };
