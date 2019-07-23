import * as React from 'react';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import { IAppState } from '../store';

import './app.scss';

class App extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Menu inverted={true} fixed='top'>
                    <Menu.Item header>Axiom Telecom</Menu.Item>
                </Menu>
                <div className='container-fluid app-container'>
                    <h1>Hello, World!</h1>
                    <pre>Version: {this.props.version}</pre>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: IAppState, props: any) => ({
    version: state.version
});

const mapDispatchToProps = (dispatch: any, props: any) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
