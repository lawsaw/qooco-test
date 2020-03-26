import React, { PureComponent } from 'react';
import { Box } from "@material-ui/core";

class Row extends PureComponent {
    render() {
        const { className, index, style, columns } = this.props;
        return (
            <Box
                key={index}
                className={className}
                style={style}
            >
                {columns}
            </Box>
        )
    }
}

export default Row;