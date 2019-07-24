import * as React from 'react';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import { IAppState } from '../../store';
import { Phone } from '../../catalog/models/phone';
import { loadCatalog } from '../../catalog/actions';
import { PhoneList } from '../components/phone-list';

interface IProps {
    phones: Phone[];
    isCatalogLoading: boolean;
    catalogLoadingError: null | Error;
    dispatchLoadCatalog: (offset: number, limit: number) => void;
}

class CatalogPage extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatchLoadCatalog(0, 0);
    }

    render() {
        return (
            <Fragment>
                <h1>Phones</h1>
                <PhoneList phones={this.props.phones} />
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
)(CatalogPage);
