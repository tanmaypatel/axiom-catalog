import * as React from 'react';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Checkbox, Button, Input } from 'semantic-ui-react';
import { map, forEach, filter, omitBy, zipObject, constant, times } from 'lodash';

import { IAppState } from '../../../store';
import { IFilterOptions, ISelectedFilters } from '../../models/filters';

interface IProps extends IFilterOptions {
    onApplyFilter: (selectedFilters: ISelectedFilters) => void;
    selectedFilters: ISelectedFilters;
}

interface IState {
    searchTerm: string;
    brands: { [key: string]: boolean };
    sim: { [key: string]: boolean };
    gps: { [key: string]: boolean };
    audioJack: { [key: string]: boolean };
}

export class FilterPanel extends Component<IProps> {
    state: IState = {
        searchTerm: '',
        brands: {},
        sim: {},
        gps: {},
        audioJack: {}
    };

    constructor(props: IProps) {
        super(props);

        this.onFilterOptionCheckBoxChange = this.onFilterOptionCheckBoxChange.bind(this);
        this.onSearchInput = this.onSearchInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps: IProps) {
        const updatedState = this._updateStateWithProps(nextProps);
        this.setState(updatedState);
    }

    onFilterOptionCheckBoxChange(key: string) {
        const filterName: string = key;
        return ((event: React.FormEvent, data: any) => {
            const existingStateForFilterName = (this.state as any)[filterName];
            existingStateForFilterName[data.label] = data.checked;

            const updatedState: { [key: string]: boolean } = {};
            updatedState[filterName] = existingStateForFilterName;

            this.setState(updatedState);
        }).bind(this);
    }

    onSearchInput(event: React.FormEvent) {
        this.setState({
            searchTerm: (event.target as HTMLInputElement).value
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
            audioJack: selectedAudioJack
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <Card>
                    <Card.Content>
                        <Card.Header>Filter</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Card.Meta>Search</Card.Meta>
                        <Card.Description>
                            <Input fluid placeholder="Search..." value={this.state.searchTerm} onInput={this.onSearchInput} />
                        </Card.Description>
                    </Card.Content>
                    {this.props.brands.length ? (
                        <Card.Content>
                            <Card.Meta>Brands</Card.Meta>
                            <Card.Description>
                                {map(this.props.brands, (name: string) => {
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
                                })}
                            </Card.Description>
                        </Card.Content>
                    ) : null}
                    {this.props.sim.length ? (
                        <Card.Content>
                            <Card.Meta>SIM</Card.Meta>
                            <Card.Description>
                                {map(this.props.sim, (name: string) => {
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
                                })}
                            </Card.Description>
                        </Card.Content>
                    ) : null}
                    {this.props.gps.length ? (
                        <Card.Content>
                            <Card.Meta>GPS</Card.Meta>
                            <Card.Description>
                                {map(this.props.gps, (name: string) => {
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
                                })}
                            </Card.Description>
                        </Card.Content>
                    ) : null}
                    {this.props.audioJack.length ? (
                        <Card.Content>
                            <Card.Meta>Audio Jack</Card.Meta>
                            <Card.Description>
                                {map(this.props.audioJack, (name: string) => {
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
                                })}
                            </Card.Description>
                        </Card.Content>
                    ) : null}
                    <Card.Content extra>
                        <Button basic fluid color="green">
                            Filter
                        </Button>
                    </Card.Content>
                </Card>
            </form>
        );
    }

    private _updateStateWithProps(props: IProps): Partial<IState> {
        console.log('props.selectedFilters', props.selectedFilters);

        const updatedState: Partial<IState> = {
            brands: zipObject(props.selectedFilters.brands, times(props.selectedFilters.brands.length, constant(true))),
            sim: zipObject(props.selectedFilters.sim, times(props.selectedFilters.sim.length, constant(true))),
            gps: zipObject(props.selectedFilters.gps, times(props.selectedFilters.gps.length, constant(true))),
            audioJack: zipObject(props.selectedFilters.audioJack, times(props.selectedFilters.audioJack.length, constant(true)))
        };

        console.log('updatedState', updatedState);

        return updatedState;
    }
}

const mapStateToProps = (state: IAppState, props: any): Partial<IProps> => {
    return {};
};

const mapDispatchToProps = (dispatch: any, props: any): Partial<IProps> => {
    return {};
};
