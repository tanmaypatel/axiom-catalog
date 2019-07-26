import * as React from 'react';
import { Component, Fragment, SFC } from 'react';
import { Card, Checkbox, Button, Input, Placeholder, Icon } from 'semantic-ui-react';
import { map, forEach, filter, omitBy, zipObject, constant, times } from 'lodash';

import { IAppState } from '../../../store';
import { IFilterOptions, ISelectedFilters } from '../../models/filters';

interface IProps extends IFilterOptions {
    isLoading: boolean;
    selectedFilters: ISelectedFilters;
    onApplyFilter: (selectedFilters: ISelectedFilters) => void;
    onResetFilters: () => void;
}

interface IState {
    searchTerm: string;
    brands: { [key: string]: boolean };
    sim: { [key: string]: boolean };
    gps: { [key: string]: boolean };
    audioJack: { [key: string]: boolean };
    minimumPrice: number;
    maximumPrice: number;
}

const FilterOptionPlaceholder: SFC<{}> = () => {
    return (
        <Placeholder>
            <Placeholder.Line length="full" />
            <Placeholder.Line length="medium" />
        </Placeholder>
    );
};

export class FilterPanel extends Component<IProps, IState> {
    state: IState = {
        searchTerm: '',
        brands: {},
        sim: {},
        gps: {},
        audioJack: {},
        minimumPrice: Number.NEGATIVE_INFINITY,
        maximumPrice: Number.POSITIVE_INFINITY
    };

    constructor(props: IProps) {
        super(props);

        this.onFilterOptionCheckBoxChange = this.onFilterOptionCheckBoxChange.bind(this);
        this.onSearchInput = this.onSearchInput.bind(this);
        this.onTxtMinimumPriceInput = this.onTxtMinimumPriceInput.bind(this);
        this.onTxtMaximumPriceInput = this.onTxtMaximumPriceInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBtnResetFiltersClick = this.onBtnResetFiltersClick.bind(this);
    }

    componentWillReceiveProps(nextProps: IProps) {
        const updatedState: unknown = this._updateStateWithProps(nextProps);
        this.setState(updatedState);
    }

    onFilterOptionCheckBoxChange(key: string) {
        const filterName: string = key;
        return ((event: React.FormEvent, data: any) => {
            const existingStateForFilterName = (this.state as any)[filterName];
            existingStateForFilterName[data.label] = data.checked;

            const updatedState: { [key: string]: boolean } = {};
            updatedState[filterName] = existingStateForFilterName;

            this.setState(updatedState as unknown);
        }).bind(this);
    }

    onSearchInput(event: React.FormEvent) {
        this.setState({
            searchTerm: (event.target as HTMLInputElement).value
        });
    }

    onTxtMinimumPriceInput(event: React.FormEvent) {
        let price: number = parseFloat((event.target as HTMLInputElement).value);
        if (isNaN(price)) {
            price = Number.NEGATIVE_INFINITY;
        }
        this.setState({
            minimumPrice: price
        });
    }

    onTxtMaximumPriceInput(event: React.FormEvent) {
        let price: number = parseFloat((event.target as HTMLInputElement).value);
        if (isNaN(price)) {
            price = Number.POSITIVE_INFINITY;
        }
        this.setState({
            maximumPrice: price
        });
    }

    onSubmit(event: React.FormEvent) {
        event.preventDefault();
        const selectedBrands: string[] = Object.keys(omitBy(this.state.brands, (isSelected: boolean) => !isSelected));
        const selectedSim: string[] = Object.keys(omitBy(this.state.sim, (isSelected: boolean) => !isSelected));
        const selectedGPS: string[] = Object.keys(omitBy(this.state.gps, (isSelected: boolean) => !isSelected));
        const selectedAudioJack: string[] = Object.keys(omitBy(this.state.audioJack, (isSelected: boolean) => !isSelected));

        this.props.onApplyFilter({
            searchTerm: this.state.searchTerm,
            brands: selectedBrands,
            sim: selectedSim,
            gps: selectedGPS,
            audioJack: selectedAudioJack,
            minimumPrice: this.state.minimumPrice,
            maximumPrice: this.state.maximumPrice
        });
    }

    onBtnResetFiltersClick(event: React.MouseEvent) {
        event.preventDefault();
        this.props.onResetFilters();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            Filter
                            {!this.props.isLoading ? (
                                <Button
                                    as="a"
                                    href="#"
                                    basic
                                    color="grey"
                                    floated="right"
                                    size="mini"
                                    compact
                                    onClick={this.onBtnResetFiltersClick}
                                >
                                    Reset Filters
                                </Button>
                            ) : null}
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Card.Meta>Search</Card.Meta>
                        <Card.Description>
                            {!this.props.isLoading ? (
                                <Input
                                    fluid
                                    placeholder="Search..."
                                    value={this.state.searchTerm}
                                    onInput={this.onSearchInput}
                                />
                            ) : (
                                <FilterOptionPlaceholder />
                            )}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content>
                        <Card.Meta>Brands</Card.Meta>
                        <Card.Description>
                            {!this.props.isLoading ? (
                                map(this.props.brands, (name: string) => {
                                    return (
                                        <Fragment key={name}>
                                            <Checkbox
                                                label={name}
                                                checked={this.state.brands ? this.state.brands[name] : true}
                                                onChange={this.onFilterOptionCheckBoxChange('brands')}
                                            />
                                            <br />
                                        </Fragment>
                                    );
                                })
                            ) : (
                                <FilterOptionPlaceholder />
                            )}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content>
                        <Card.Meta>Price</Card.Meta>
                        <Card.Description>
                            {!this.props.isLoading ? (
                                <Fragment>
                                    <div className="row">
                                        <div className="col-6">
                                            <Input
                                                fluid
                                                iconPosition="left"
                                                placeholder="Minimum (€)"
                                                value={
                                                    this.state.minimumPrice === Number.NEGATIVE_INFINITY
                                                        ? ''
                                                        : this.state.minimumPrice
                                                }
                                                onInput={this.onTxtMinimumPriceInput}
                                            >
                                                <Icon name="eur" />
                                                <input />
                                            </Input>
                                        </div>
                                        <div className="col-6">
                                            <Input
                                                fluid
                                                iconPosition="left"
                                                placeholder="Maximum (€)"
                                                value={
                                                    this.state.maximumPrice === Number.POSITIVE_INFINITY
                                                        ? ''
                                                        : this.state.maximumPrice
                                                }
                                                onInput={this.onTxtMaximumPriceInput}
                                            >
                                                <Icon name="eur" />
                                                <input />
                                            </Input>
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                <FilterOptionPlaceholder />
                            )}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content>
                        <Card.Meta>SIM</Card.Meta>
                        <Card.Description>
                            {!this.props.isLoading ? (
                                map(this.props.sim, (name: string) => {
                                    return (
                                        <Fragment key={name}>
                                            <Checkbox
                                                label={name}
                                                checked={this.state.sim ? this.state.sim[name] : true}
                                                onChange={this.onFilterOptionCheckBoxChange('sim')}
                                            />
                                            <br />
                                        </Fragment>
                                    );
                                })
                            ) : (
                                <FilterOptionPlaceholder />
                            )}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content>
                        <Card.Meta>GPS</Card.Meta>
                        <Card.Description>
                            {!this.props.isLoading ? (
                                map(this.props.gps, (name: string) => {
                                    return (
                                        <Fragment key={name}>
                                            <Checkbox
                                                label={name}
                                                checked={this.state.gps ? this.state.gps[name] : true}
                                                onChange={this.onFilterOptionCheckBoxChange('gps')}
                                            />
                                            <br />
                                        </Fragment>
                                    );
                                })
                            ) : (
                                <FilterOptionPlaceholder />
                            )}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content>
                        <Card.Meta>Audio Jack</Card.Meta>
                        <Card.Description>
                            {!this.props.isLoading ? (
                                map(this.props.audioJack, (name: string) => {
                                    return (
                                        <Fragment key={name}>
                                            <Checkbox
                                                label={name}
                                                checked={this.state.audioJack ? this.state.audioJack[name] : true}
                                                onChange={this.onFilterOptionCheckBoxChange('audioJack')}
                                            />
                                            <br />
                                        </Fragment>
                                    );
                                })
                            ) : (
                                <FilterOptionPlaceholder />
                            )}
                        </Card.Description>
                    </Card.Content>
                    {!this.props.isLoading ? (
                        <Card.Content extra>
                            <Button primary fluid>
                                Apply Filters
                            </Button>
                        </Card.Content>
                    ) : null}
                </Card>
            </form>
        );
    }

    private _updateStateWithProps(props: IProps): Partial<IState> {
        const updatedState: Partial<IState> = {
            searchTerm: props.selectedFilters.searchTerm,
            brands: zipObject(props.selectedFilters.brands, times(props.selectedFilters.brands.length, constant(true))),
            sim: zipObject(props.selectedFilters.sim, times(props.selectedFilters.sim.length, constant(true))),
            gps: zipObject(props.selectedFilters.gps, times(props.selectedFilters.gps.length, constant(true))),
            audioJack: zipObject(
                props.selectedFilters.audioJack,
                times(props.selectedFilters.audioJack.length, constant(true))
            ),
            minimumPrice: props.selectedFilters.minimumPrice,
            maximumPrice: props.selectedFilters.maximumPrice
        };

        return updatedState;
    }
}

const mapStateToProps = (state: IAppState, props: any): Partial<IProps> => {
    return {};
};

const mapDispatchToProps = (dispatch: any, props: any): Partial<IProps> => {
    return {};
};
