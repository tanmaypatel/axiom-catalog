import * as React from 'react';
import { SFC } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import * as numeral from 'numeral';

import { Phone } from '../models/phone';

interface IProps {
    phone: Phone;
}

const PhoneCard: SFC<IProps> = (props: IProps) => {
    return (
        <Card fluid>
            <Image src={props.phone.picture} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{props.phone.phone}</Card.Header>
                <Card.Meta>
                    <span>{props.phone.brand}</span>
                </Card.Meta>
                <Card.Description>
                    {props.phone.hardware.audioJack} / {props.phone.hardware.battery} / {props.phone.hardware.gps}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <span>
                    <Icon name='euro' /> {numeral(props.phone.release.priceEur).format('0,0.00')}
                </span>
            </Card.Content>
        </Card>
    );
};

export { PhoneCard };
