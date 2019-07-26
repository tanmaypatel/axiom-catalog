import * as React from 'react';
import { SFC } from 'react';
import { map, times } from 'lodash';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';

import { Phone } from '../../models/phone';
import { PhoneCard, PhoneCardPlaceholder } from '../phone-card/phone-card';

import './phone-list.scss';

interface IProps {
    isLoading: boolean;
    phones: Phone[];
    onResetFilters: () => void;
}

const PhoneList: SFC<IProps> = (props: IProps) => {
    return (
        <div className="phone-list row">
            {props.isLoading
                ? times(3, () => {
                      return (
                          <div className="phone-card-wrapper col-6 col-lg-4">
                              <PhoneCardPlaceholder />
                          </div>
                      );
                  })
                : null}
            {!props.isLoading && props.phones.length
                ? map(props.phones, (datum) => {
                      return (
                          <div className="phone-card-wrapper col-6 col-lg-4" key={datum.id}>
                              <PhoneCard phone={datum} />
                          </div>
                      );
                  })
                : null}
            {!props.isLoading && !props.phones.length ? (
                <div className="col-12">
                    <Segment placeholder>
                        <Header icon>
                            <Icon name="warning" />
                            No Devices Available
                        </Header>
                        <Button primary onClick={props.onResetFilters}>Reset Filters</Button>
                    </Segment>
                </div>
            ) : null}
        </div>
    );
};

export { PhoneList };
