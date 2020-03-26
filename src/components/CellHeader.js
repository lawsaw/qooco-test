import React, { PureComponent } from 'react';
import { withStyles, Box } from "@material-ui/core";
import { SortIndicator, SortDirection } from "react-virtualized";

const styles = () => ({
    cell_header: {
        width: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        cursor: 'pointer',
    },
    label: {
        display: 'inline-block',
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        flexShrink: 0,
    },
});

class CellHeader extends PureComponent {

    handleSort = () => {
        const { sort, dataKey, sortDirection } = this.props;
        let sortDirectionNext = sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
        sort(dataKey, sortDirectionNext);
    }

    render() {
        const { classes, dataKey, label, sortBy, sortDirection } = this.props;
        return (
            <Box
                key={dataKey}
                className={classes.cell_header}
                onClick={this.handleSort}
            >
                <Box
                    className={classes.label}
                >
                    {label}
                </Box>
                {
                    sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />
                }
            </Box>
        )
    }

}

export default withStyles(styles)(CellHeader);