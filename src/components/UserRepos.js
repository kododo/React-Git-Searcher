import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import UserRepoItem from './UserRepoItem';




const styles = theme => ({
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class UserRepos extends React.Component {
    render() {
        const reposItems = this.props.reposInfo && this.props.reposInfo.map(repo =>
            <UserRepoItem key={repo.id} repo={repo} />
        );

        return (
            <div>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">User repositories</ListSubheader>}
                >
                    {reposItems}
                </List>
                {!this.props.reposInfo && <LinearProgress />}
            </div>
        )
    }
}

export default withStyles(styles)(UserRepos);
