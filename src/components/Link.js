import React, { PureComponent } from 'react';

class Link extends PureComponent {

    render() {
        const { children } = this.props;
        return (
            <a href={children} target="_blank">{children}</a>
        )
    }

}

export default Link;