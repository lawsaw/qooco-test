import React, { PureComponent } from 'react';
import { withStyles, Grid, Container, Box } from "@material-ui/core";
import { FilesViewer } from "./";
import { timeout } from '../helpers/etc';

const styles = () => ({
   app: {
       height: '100%',
   },
    delay_message: {
       textAlign: 'center',
    },
});

// const DATA = [
//     {
//         filename: 'file11_1',
//         download_url: 'http://demo_domain.com/path/file.zip',
//         size: 15,
//         create_date: '2020-03-01',
//     },{
//         filename: 'file11_2',
//         download_url: 'http://test_domain.com/path/file.zip',
//         size: 20,
//         create_date: '2020-03-02',
//     },{
//         filename: 'file11_3',
//         download_url: 'http://test_domain.com/path/file_2.zip',
//         size: 5,
//         create_date: '2020-03-07',
//     },{
//         filename: 'file22_1',
//         download_url: 'http://demo_domain.com/path/file_2.zip',
//         size: 16,
//         create_date: '2020-03-01',
//     },{
//         filename: 'file22_2',
//         download_url: 'http://demo_domain.com/path/file.zip',
//         size: 12,
//         create_date: '2020-03-01',
//     },{
//         filename: 'Megafile_1',
//         download_url: 'http://other_domain.com/path/file.zip',
//         size: 8,
//         create_date: '2020-03-01',
//     },{
//         filename: 'Megafile_2',
//         download_url: 'http://other_domain.com/path/file_2.zip',
//         size: 11,
//         create_date: '2020-03-04',
//     },{
//         filename: 'megafile_33',
//         download_url: 'http://demo_domain.com/path/file.zip',
//         size: 16,
//         create_date: '2020-03-05',
//     },{
//         filename: 'megafile_33_2',
//         download_url: 'http://demo_domain.com/path/file.zip',
//         size: 15,
//         create_date: '2020-03-05',
//     },{
//         filename: 'megafile_33_3',
//         download_url: 'http://demo_domain.com/path/file.zip',
//         size: 10,
//         create_date: '2020-03-06',
//     },{
//         filename: 'megafile_33_4',
//         download_url: 'http://demo_domain.com/path/file.zip',
//         size: 15,
//         create_date: '2020-03-07',
//     },{
//         filename: 'megafile_33_5',
//         download_url: 'http://demo_domain.com/path/file.zip',
//         size: 20,
//         create_date: '2020-03-07',
//     }
// ];

const DELAY = 3000;

class App extends PureComponent {

    state = {
        data: null,
    }

    componentDidMount () {
       this.fetchData();
    }

    fetchData = async () => {
        await timeout(DELAY);
        let response = await fetch('storage/data.json');
        let data = await response.json();
        this.setState(() => ({
            data,
        }));
    }

    render() {
        const { classes } = this.props;
        const { data } = this.state;
        return (
            <Grid
                className={classes.app}
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Container>
                    {
                        data ? (
                            <FilesViewer
                                data={data}
                            />
                        ) : (
                            <Box
                                className={classes.delay_message}
                            >
                                JSON загружается ({DELAY/1000}сек)
                            </Box>
                        )
                    }
                </Container>
            </Grid>
        )
    }

}

export default withStyles(styles)(App);