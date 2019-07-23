import * as React from 'react';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import { IAppState } from '../store';

import './app.scss';
import { Phone } from '../catalog/models/phone';
import { loadCatalog } from '../catalog/actions';

interface IProps {
    phones: Phone[];
    isCatalogLoading: boolean;
    catalogLoadingError: null | Error;
    dispatchLoadCatalog: (offset: number, limit: number) => void;
}

class App extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatchLoadCatalog(0, 0);
    }

    render() {
        return (
            <Fragment>
                <Menu inverted={true} fixed='top'>
                    <Menu.Item header>Axiom Telecom</Menu.Item>
                </Menu>
                <div className='container-fluid app-container'>
                    <h1>Hello, World!</h1>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: IAppState, props: any): Partial<IProps> => {
    return {
        phones: state.catalog.entities.phones,
        isCatalogLoading: state.catalog.ui.isCatalogLoading,
        catalogLoadingError: state.catalog.ui.catalogLoadingError
    };
};

const mapDispatchToProps = (dispatch: any, props: any): Partial<IProps> => {
    return {
        dispatchLoadCatalog: (offset: number, limit: number) => dispatch(loadCatalog(offset, limit))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
