import * as React from 'react';
import { Component, Fragment } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';

import { IAppState } from '../../store';
import { Phone } from '../../catalog/models/phone';
import { loadCatalog, filterCatalog } from '../../catalog/actions';
import { PhoneList } from '../components/phone-list/phone-list';
import { FilterPanel } from '../components/filter-panel/filter-panel';
import { IFilterOptions, ISelectedFilters } from '../models/filters';

interface IProps {
    phones: Phone[];
    filterOptions: IFilterOptions;
    isCatalogLoading: boolean;
    catalogLoadingError: null | Error;
    dispatchLoadCatalog: (offset: number, limit: number) => void;
    dispatchFilterCatalog: (selectedFilters: ISelectedFilters) => void;
}

class CatalogPage extends Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.onApplyFilter = this.onApplyFilter.bind(this);
    }

    componentDidMount() {
        this.props.dispatchLoadCatalog(0, 0);
    }

    onApplyFilter(selectedFilters: ISelectedFilters) {
        console.log(selectedFilters);
        this.props.dispatchFilterCatalog(selectedFilters);
    }

    render() {
        return (
            <Fragment>
                <h1>Phones</h1>
                <div className="row">
                    <div className="col-3">
                        <FilterPanel {...this.props.filterOptions} onApplyFilter={this.onApplyFilter} />
                    </div>
                    <div className="col-9">
                        <PhoneList phones={this.props.phones} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: IAppState, props: any): Partial<IProps> => {
    return {
        phones: map(state.catalog.ui.filteredIds, (datum: number) => {
            return state.catalog.entities.phones[datum];
        }),
        filterOptions: state.catalog.entities.filterOptions,
        isCatalogLoading: state.catalog.ui.isCatalogLoading,
        catalogLoadingError: state.catalog.ui.catalogLoadingError
    };
};

const mapDispatchToProps = (dispatch: any, props: any): Partial<IProps> => {
    return {
        dispatchLoadCatalog: (offset: number, limit: number) => dispatch(loadCatalog(offset, limit)),
        dispatchFilterCatalog: (selectedFilters: ISelectedFilters) => dispatch(filterCatalog(selectedFilters))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CatalogPage);
