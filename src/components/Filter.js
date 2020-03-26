import React, { PureComponent } from 'react';
import { withStyles, Grid, Slider, TextField } from "@material-ui/core";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { getMin, getMax, getMinDate, getMaxDate } from '../helpers/etc';
import { FILTER_TYPES } from '../helpers/constants';

const styles = () => ({
    filter: {
        position: 'relative',
    },
    filter_item: {
        //flexGrow: 1,
    },
});

const FILTER_RANGE = (field, [min, max]) => item => (item[field] >= min && item[field] <= max);
const FILTER_STRING = (field, value) => item => ((item[field].toLowerCase()).includes(value.toLowerCase()));

class Filter extends PureComponent {

    getFilters = () => {
        const { columns, data, values, onChange } = this.props;
        return columns.map(item => {
            let Component = null;
            const { filter_type, dataKey } = item;
            switch (filter_type) {
                case FILTER_TYPES.RANGE:
                    const [size_min, size_max] = [getMin(data, dataKey), getMax(data, dataKey)];
                    Component = <Slider
                        value={values[dataKey] || [size_min, size_max]}
                        min={size_min}
                        max={size_max}
                        onChange={(event, value) => onChange(dataKey, value, FILTER_RANGE(dataKey, value))}
                        valueLabelDisplay="auto"
                    />;
                    break;
                case FILTER_TYPES.STRING:
                    Component = <TextField
                        variant="outlined"
                        value={values[dataKey] || ''}
                        onChange={e => onChange(dataKey, e.target.value, FILTER_STRING(dataKey, e.target.value))}
                    />
                    break;
                case FILTER_TYPES.DATE:
                    const [min_date, max_date] = [getMinDate(data, dataKey), getMaxDate(data, dataKey)];
                    Component = <DateRangePicker
                        value={values[dataKey] || [min_date, max_date]}
                        minDate={min_date}
                        maxDate={max_date}
                        onChange={value => onChange(dataKey, value, FILTER_RANGE(dataKey, value))}
                        clearIcon={null}
                    />
                    break;
                default:
                    break;
            }
            return Component
        })
    }

    render() {
        const { classes } = this.props;
        let filters = this.getFilters();
        return (
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
                className={classes.filter}
            >
                {
                    filters.map((filter, index) => (
                        <Grid
                            key={index}
                            item
                            className={classes.filter_item}
                            style={{
                                'flexBasis': `${100 / (filters.length+1)}%`,
                            }}
                        >
                            {filter}
                        </Grid>
                    ))
                }
            </Grid>
        )
    }

}

export default withStyles(styles)(Filter);