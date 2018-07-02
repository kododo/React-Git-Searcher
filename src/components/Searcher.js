import React from 'react';

// MUI styling
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
        marginTop: 0,
        paddingTop: 0,
        marginBottom: 20
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        maxWidth: '95%'
    },
});

// Searcher component
class Searcher extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    // Handles click on button, triggers parent's search
    handleSearch = () => {
        this.props.onSearch(this.state.search);
    }

    // Handles input change and updates state
    handleChange = e => {
        this.setState({ search: e.target.value })
    }

    render() {
        // Enables MUI theming
        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <Grid container alignContent="space-around" alignItems="baseline" spacing={24}>
                    <Grid item xs={12} sm={9}>
                        <TextField
                            label="Search for a username"
                            className={classes.textField}
                            margin="none"
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button disabled={!this.state.search.length} fullWidth onClick={this.handleSearch} variant="contained" color="primary" className={classes.button}>Search</Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(Searcher);
