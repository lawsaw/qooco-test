import React, { PureComponent } from 'react';
import { Table, Date, Link } from '../components';
import { FILTER_TYPES } from '../helpers/constants';

const COLUMNS = [
    {
        dataKey: 'filename',
        label: 'Имя файла',
        filter_type: FILTER_TYPES.STRING,
    },{
        dataKey: 'download_url',
        label: 'Ссылка',
        Container: Link,
        filter_type: FILTER_TYPES.STRING,
    },{
        dataKey: 'size',
        label: 'Размер',
        filter_type: FILTER_TYPES.RANGE,
    },{
        dataKey: 'create_date',
        label: 'Дата создания',
        Container: Date,
        filter_type: FILTER_TYPES.DATE,
    }
];

class FilesViewer extends PureComponent {

    getData = () => {
        const { data } = this.props;
        return data.map(item => {
            item.create_date = new window.Date(item.create_date);
            return item;
        });
    }

    render() {
        const data = this.getData();
        return (
            <Table
                columns={COLUMNS}
                data={data}
                sortBy={'create_date'}
            />
        )
    }

}

export default FilesViewer;