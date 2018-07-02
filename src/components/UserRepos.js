import React from 'react';

// Components
import UserRepoItem from './UserRepoItem';

// MUI styling
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    loading: {
        width: '90%',
        margin: '0 auto'
    },
    emptyRepos: {
        textAlign: 'center',
        background: theme.palette.secondary.light,
        padding: theme.spacing.unit * 2
    },
    button: {
        display: 'block',
        margin: '0 auto'
    }
});

const MAX_VISIBLE = 5;

// UserRepos component
class UserRepos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    // Handles click on expand/collapse button
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    }

    render() {
        // Enables MUI theming
        const { classes, reposInfo } = this.props;

        // Builds components for user repos
        const reposItems = reposInfo && reposInfo.map((repo) =>
            <UserRepoItem key={repo.id} repo={repo} />
        );

        // Builds component for empty user repos message
        const emptyRepos = reposInfo && reposInfo.length === 0 &&
            <ListItem>
                <ListItemText>
                    <Typography className={classes.emptyRepos} variant="caption">No repositories found</Typography>
                </ListItemText>
            </ListItem>;

        const extraRepos = reposInfo && reposItems && reposItems.length + 1 > MAX_VISIBLE &&
            reposItems.splice(MAX_VISIBLE);

        return (
            <div>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">User repositories</ListSubheader>}
                >
                    {emptyRepos}
                    {reposItems}
                    {extraRepos &&
                        <div>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                {extraRepos}
                            </Collapse>
                            <Button size="small" onClick={this.handleClick} variant="contained" color="default" className={classes.button}>
                                {this.state.open ? 'Show less' : 'Show more'}
                            </Button>
                        </div>
                    }
                </List>

                {!reposInfo && <LinearProgress className={classes.loading} />}
            </div>
        )
    }
}

export default withStyles(styles)(UserRepos);
