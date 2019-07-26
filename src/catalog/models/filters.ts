export interface IFilterOptions {
    brands: string[];
    sim: string[];
    gps: string[];
    audioJack: string[];
}

export interface ISelectedFilters extends IFilterOptions {
    searchTerm: string;
    minimumPrice: number;
    maximumPrice: number;
}
