import React, { PureComponent, createElement } from 'react';
import { withStyles, Box, Paper } from "@material-ui/core";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Column, Table as TableComponent, AutoSizer, SortDirection } from "react-virtualized";
import Immutable from 'immutable';
import { Row, CellHeader, CellBody, Filter } from './';

const defaultComparer = sortBy => (a, b) => {
    return typeof a[sortBy] === 'string' ? a[sortBy].localeCompare(b[sortBy]) : a[sortBy] > b[sortBy] ? 1 : -1;
};

const styles = theme => ({
    root: {},
    table: {
        display: 'block',
        height: 300,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '&.ReactVirtualized__Table__headerRow': {
            backgroundColor: theme.palette.primary.light,
        },
        '&.ReactVirtualized__Table__row': {
            '&:nth-child(2n+1)': {
                backgroundColor: fade('#000', 0.05),
            }
        },
    },
    headerCell: {
        color: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 0,
        marginRight: 10,
        minWidth: 0,
        outline: 'none',
        '&:first-of-type': {
            marginLeft: 10,
        },
    },
    bodyCell: {
        marginRight: 10,
        minWidth: 0,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        '&:first-of-type': {
            marginLeft: 10,
        },
    },
    body: {},
});

class Table extends PureComponent {

    constructor(props) {
        super(props);
        let sortBy = props.sortBy || 'id';
        let sortDirection = SortDirection.DESC;
        let sortedList = this.sortList(sortBy, sortDirection, null);
        this.state = {
            sortDirection,
            sortedList,
            sortBy,
            filter_values: {},
            filter_functions: {},
        }
    }

    getColumns = () => {
        const { classes, columns } = this.props;
        const { sortBy } = this.state;
        return columns.map((column, index) => {
            const {
                dataKey,
                label,
                Container,
                sortComparer,
            } = column;
            let columnProps = {
                key: index,
                dataKey,
                label,
                width: 1000 / columns.length,
                headerRenderer: props => <CellHeader
                                            sort={this.sort(sortComparer)}
                                            {...props}
                                            sortBy={sortBy}
                                         />,
                cellRenderer: pr => <CellBody {...pr} Container={Container} />
            };
            return createElement(
                Column,
                {
                    className: classes.bodyCell,
                    ...columnProps,
                }
            )
        })
    }

    getListFromData = () => {
        const { data } = this.props;
        return Immutable.List(data);
    }

    sortList = (sortBy, sortDirection, sortComparer, data) => {
        let list = this.state && this.state.sortedList ? this.state.sortedList : this.getListFromData();
        return (data || list)
            .sort(sortComparer || defaultComparer(sortBy))
            .update(list => sortDirection === SortDirection.DESC ? list.reverse() : list)
    }

    sort = sortComparer => (sortBy, sortDirection) => {
        const sortedList = this.sortList(sortBy, sortDirection, sortComparer);
        const filteredSortedList = this.sortList(sortBy, sortDirection, sortComparer, this.state.filteredList);
        this.setState(() => ({
            sortDirection,
            sortedList,
            filteredList: filteredSortedList,
            sortBy,
        }));
    }


    filter = (field, value, filterFunc) => {
        const { sortedList, filter_functions } = this.state;
        const filters = {
            ...filter_functions,
            [field]: filterFunc,
        };
        const filteredList = Object.keys(filters).reduce((acc, current) => acc.filter(filters[current]), sortedList);
        this.setState(state => ({
            filteredList,
            filter_functions: filters,
            filter_values: {
                ...state.filter_values,
                [field]: value
            }
        }));
    }

    renderFilter = () => {
        const { columns, data } = this.props;
        const { filter_values } = this.state;
        return (
            <Filter
                onChange={this.filter}
                values={filter_values}
                data={data}
                columns={columns}
            />
        )
    }

    render() {
        const { classes } = this.props;
        const { sortedList, filteredList, sortDirection } = this.state;
        let list = filteredList || sortedList;
        return (
            <Box
                className={classes.root}
            >
                {
                   this.renderFilter()
                }
                <Paper
                    elevation={5}
                    className={classes.table}
                >
                    <AutoSizer>
                        {({ height, width }) => (
                            <TableComponent
                                height={height}
                                width={width}
                                headerHeight={56}
                                rowHeight={30}
                                rowCount={list.toArray().length}
                                rowClassName={classes.row}
                                headerClassName={classes.headerCell}
                                gridClassName={classes.body}
                                rowRenderer={props => <Row {...props} />}
                                rowGetter={({ index }) => list.get(index % list.size)}
                                sortDirection={sortDirection}
                            >
                                {this.getColumns()}
                            </TableComponent>
                        )}
                    </AutoSizer>
                </Paper>
            </Box>
        )
    }

}

export default withStyles(styles)(Table);