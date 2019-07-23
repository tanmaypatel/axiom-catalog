import * as React from 'react';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../store';

class App extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <h1>Hello, World!</h1>
                <pre>Version: {this.props.version}</pre>
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
