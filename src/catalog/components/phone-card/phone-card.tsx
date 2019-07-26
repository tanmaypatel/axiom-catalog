import * as React from 'react';
import { SFC } from 'react';
import { Card, Icon, Image, Placeholder } from 'semantic-ui-react';
import * as numeral from 'numeral';

import { Phone } from '../../models/phone';

import './phone-card.scss';

interface IProps {
    phone: Phone;
}

export const PhoneCardPlaceholder: SFC<{}> = () => {
    return (
        <Card fluid className="phone-card">
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line length="full" />
                        <Placeholder.Line length="very short" />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length="full" />
                        <Placeholder.Line length="short" />
                        <Placeholder.Line length="medium" />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Card.Content>
            <Card.Content extra>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length="short" />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Card.Content>
        </Card>
    );
};

export const PhoneCard: SFC<IProps> = (props: IProps) => {
    return (
        <Card fluid className="phone-card">
            <Image src={props.phone.picture} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{props.phone.phone}</Card.Header>
                <Card.Meta>
                    by <span>{props.phone.brand}</span>
                </Card.Meta>
                <Card.Description>
                    <span className="attribute">
                        <span className="attribute-label">Announced:</span>
                        <span className="attribute-value">{props.phone.release.announceDate}</span>
                    </span>
                    <span className="attribute">
                        <span className="attribute-label">Screen Resolution:</span>
                        <span className="attribute-value">{props.phone.resolution}</span>
                    </span>
                    <span className="attribute">
                        <span className="attribute-label">SIM:</span>
                        <span className="attribute-value">{props.phone.sim}</span>
                    </span>
                    <span className="attribute">
                        <span className="attribute-label">Audio Jack:</span>
                        <span className="attribute-value">{props.phone.hardware.audioJack}</span>
                    </span>
                    <span className="attribute">
                        <span className="attribute-label">GPS:</span>
                        <span className="attribute-value">{props.phone.hardware.gps}</span>
                    </span>
                    <span className="attribute">
                        <span className="attribute-label">Battery:</span>
                        <span className="attribute-value">{props.phone.hardware.battery}</span>
                    </span>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <span>
                    <Icon name="euro" /> {numeral(props.phone.release.priceEur).format('0,0.00')}
                </span>
            </Card.Content>
        </Card>
    );
};
