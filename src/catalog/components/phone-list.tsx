import * as React from 'react';
import { SFC } from 'react';
import { map } from 'lodash';
import { Card } from 'semantic-ui-react';

import { Phone } from '../models/phone';
import { PhoneCard } from './phone-card';

interface IProps {
    phones: Phone[];
}

const PhoneList: SFC<IProps> = (props: IProps) => {
    return (
        <Card.Group className='row'>
            {map(props.phones, (datum) => {
                return (
                    <div className='col-6 col-md-4 col-lg-3' key={datum.id}>
                        <PhoneCard phone={datum} />
                    </div>
                );
            })}
        </Card.Group>
    );
};

export { PhoneList };
