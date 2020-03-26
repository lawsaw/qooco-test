import React, { PureComponent } from 'react';

class CellBody extends PureComponent {
    render() {
        const { cellData, Container } = this.props;
        return Container ? <Container>{cellData}</Container> : cellData
    }
}

export default CellBody;