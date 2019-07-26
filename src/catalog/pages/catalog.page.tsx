import * as React from 'react';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { register } from 'enquire.js';

import { IAppState } from '../../store';
import { Phone } from '../../catalog/models/phone';
import { loadCatalog, filterCatalog, resetFilters } from '../../catalog/actions';
import { PhoneList } from '../components/phone-list/phone-list';
import { FilterPanel } from '../components/filter-panel/filter-panel';
import { IFilterOptions, ISelectedFilters } from '../models/filters';
import { applyFilters } from '../selectors/filters.selector';
import { Ref, Sticky, Header } from 'semantic-ui-react';

interface IProps {
    phones: Phone[];
    availablePhonesCount: number;
    filterOptions: IFilterOptions;
    seletedFilters: ISelectedFilters;
    isCatalogLoading: boolean;
    catalogLoadingError: null | Error;
    dispatchLoadCatalog: (offset: number, limit: number) => void;
    dispatchFilterCatalog: (selectedFilters: ISelectedFilters) => void;
    dispatchResetFilters: () => void;
}

interface IState {
    canFiltersStick: boolean;
}

class CatalogPage extends Component<IProps, IState> {
    state: IState = {
        canFiltersStick: false
    };

    contextRef = React.createRef();

    constructor(props: IProps) {
        super(props);

        this.onApplyFilter = this.onApplyFilter.bind(this);
        this.onResetFilters = this.onResetFilters.bind(this);
    }

    componentDidMount() {
        this.props.dispatchLoadCatalog(0, 0);

        register('screen and (min-width : 767px)', {
            match: () => {
                this.setState({
                    canFiltersStick: true
                });
            },
            unmatch: () => {
                this.setState({
                    canFiltersStick: false
                });
            }
        });
    }

    onApplyFilter(selectedFilters: ISelectedFilters) {
        this.props.dispatchFilterCatalog(selectedFilters);
    }

    onResetFilters() {
        this.props.dispatchResetFilters();
    }

    render() {
        return (
            <Fragment>
                <Ref innerRef={this.contextRef}>
                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-3">
                            <Sticky context={this.contextRef} offset={50} pushing active={this.state.canFiltersStick}>
                                <FilterPanel
                                    isLoading={this.props.isCatalogLoading}
                                    {...this.props.filterOptions}
                                    selectedFilters={this.props.seletedFilters}
                                    onApplyFilter={this.onApplyFilter}
                                    onResetFilters={this.onResetFilters}
                                />
                            </Sticky>
                        </div>
                        <div className="col-12 col-md-8 col-lg-9">
                            {this.props.phones.length ? (
                                <Header as="h1">
                                    <Header.Content>
                                        {this.props.phones.length} Matching Devices
                                        <Header.Subheader>From {this.props.availablePhonesCount} Available</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            ) : (
                                <Header as="h1">
                                    <Header.Content>Devices</Header.Content>
                                </Header>
                            )}
                            <PhoneList
                                isLoading={this.props.isCatalogLoading}
                                phones={this.props.phones}
                                onResetFilters={this.onResetFilters}
                            />
                        </div>
                    </div>
                </Ref>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: IAppState, props: any): Partial<IProps> => {
    return {
        phones: applyFilters(state.catalog.entities.phones, state.catalog.ui.selectedFilters),
        availablePhonesCount: Object.keys(state.catalog.entities.phones).length,
        filterOptions: state.catalog.entities.filterOptions,
        seletedFilters: state.catalog.ui.selectedFilters,
        isCatalogLoading: state.catalog.ui.isCatalogLoading,
        catalogLoadingError: state.catalog.ui.catalogLoadingError
    };
};

const mapDispatchToProps = (dispatch: any, props: any): Partial<IProps> => {
    return {
        dispatchLoadCatalog: (offset: number, limit: number) => dispatch(loadCatalog(offset, limit)),
        dispatchFilterCatalog: (selectedFilters: ISelectedFilters) => dispatch(filterCatalog(selectedFilters)),
        dispatchResetFilters: () => dispatch(resetFilters())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CatalogPage);
