import * as React from 'react';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import { IAppState } from '../store';
import CatalogPage from '../catalog/pages/catalog.page';

import './app.scss';

interface IProps {}

class App extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Menu inverted={true} fixed='top'>
                    <Menu.Item header>Axiom Telecom</Menu.Item>
                </Menu>
                <div className='container app-container'>
                    <CatalogPage />
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: IAppState, props: any): Partial<IProps> => {
    return {};
};

const mapDispatchToProps = (dispatch: any, props: any): Partial<IProps> => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
