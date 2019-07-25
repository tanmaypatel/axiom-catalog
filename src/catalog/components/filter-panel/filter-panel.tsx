import * as React from 'react';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Checkbox, Button, Input } from 'semantic-ui-react';
import { map, forEach, filter } from 'lodash';

import { IAppState } from '../../../store';
import { IFilterOptions, ISelectedFilters } from '../../models/filters';

interface IProps extends IFilterOptions {
    onApplyFilter: (selectedFilters: ISelectedFilters) => void;
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
        this.setState(this._updateStateWithProps(nextProps));
    }

    onFilterOptionCheckBoxChange(key: string) {
        return ((event: React.FormEvent, data: any) => {
            this.setState({
                [key]: {
                    ...(this.state as any)[key],
                    [data.label]: !(this.state as any)[key][data.label]
                }
            });
        }).bind(this);
    }

    onSearchInput(event: React.FormEvent) {
        this.setState({
            searchTerm: (event.target as HTMLInputElement).value
        });
    }

    onSubmit(event: React.FormEvent) {
        event.preventDefault();
        const selectedBrands: string[] = Object.keys(filter(this.state.brands, (isSelected: boolean) => isSelected));
        const selectedSim: string[] = Object.keys(filter(this.state.sim, (isSelected: boolean) => isSelected));
        const selectedGPS: string[] = Object.keys(filter(this.state.gps, (isSelected: boolean) => isSelected));
        const selectedAudioJack: string[] = Object.keys(filter(this.state.audioJack, (isSelected: boolean) => isSelected));

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
                    <Card.Content>
                        <Card.Meta>Brands</Card.Meta>
                        <Card.Description>
                            {map(this.state.brands, (isSelected: boolean, name: string) => {
                                return (
                                    <Fragment key={name}>
                                        <Checkbox
                                            label={name}
                                            checked={isSelected}
                                            onChange={this.onFilterOptionCheckBoxChange('brands')}
                                        />
                                        <br />
                                    </Fragment>
                                );
                            })}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content>
                        <Card.Meta>SIM</Card.Meta>
                        <Card.Description>
                            {map(this.state.sim, (isSelected: boolean, name: string) => {
                                return (
                                    <Fragment key={name}>
                                        <Checkbox
                                            label={name}
                                            checked={isSelected}
                                            onChange={this.onFilterOptionCheckBoxChange('sim')}
                                        />
                                        <br />
                                    </Fragment>
                                );
                            })}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content>
                        <Card.Meta>GPS</Card.Meta>
                        <Card.Description>
                            {map(this.state.gps, (isSelected: boolean, name: string) => {
                                return (
                                    <Fragment key={name}>
                                        <Checkbox
                                            label={name}
                                            checked={isSelected}
                                            onChange={this.onFilterOptionCheckBoxChange('gps')}
                                        />
                                        <br />
                                    </Fragment>
                                );
                            })}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content>
                        <Card.Meta>Audio Jack</Card.Meta>
                        <Card.Description>
                            {map(this.state.audioJack, (isSelected: boolean, name: string) => {
                                return (
                                    <Fragment key={name}>
                                        <Checkbox
                                            label={name}
                                            checked={isSelected}
                                            onChange={this.onFilterOptionCheckBoxChange('audioJack')}
                                        />
                                        <br />
                                    </Fragment>
                                );
                            })}
                        </Card.Description>
                    </Card.Content>
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
        const selectedBrands: { [key: string]: boolean } = {};
        forEach(props.brands, (datum: string) => {
            selectedBrands[datum] = true;
        });

        const selectedSim: { [key: string]: boolean } = {};
        forEach(props.sim, (datum: string) => {
            selectedSim[datum] = true;
        });

        const selectedGps: { [key: string]: boolean } = {};
        forEach(props.gps, (datum: string) => {
            selectedGps[datum] = true;
        });

        const selectedAudioJack: { [key: string]: boolean } = {};
        forEach(props.audioJack, (datum: string) => {
            selectedAudioJack[datum] = true;
        });

        return {
            brands: selectedBrands,
            sim: selectedSim,
            gps: selectedGps,
            audioJack: selectedAudioJack
        };
    }
}

const mapStateToProps = (state: IAppState, props: any): Partial<IProps> => {
    return {};
};

const mapDispatchToProps = (dispatch: any, props: any): Partial<IProps> => {
    return {};
};
