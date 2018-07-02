import React from 'react';

// Utils
import { windowOpen } from '../utils';

// MUI styling
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    avatar: {
        cursor: 'pointer',
        display: 'inline-block',
        border: `3px solid ${theme.palette.primary.main}`,
        margin: theme.spacing.unit,
        width: 40,
        height: 40
    },
    emptyOrgs: {
        textAlign: 'center',
        background: theme.palette.secondary.light,
        padding: theme.spacing.unit * 2
    }
});

// Github user page
const GITHUB_USER_PAGE = 'https://www.github.com/';

// UserOrgs component
class UserOrgs extends React.Component {

    // Opens a window to navigate
    goTo(login) {
        windowOpen(`${GITHUB_USER_PAGE}${login}`);
    }

    render() {
        // Enables MUI theming
        const { classes } = this.props;

        // Builds organizations components
        const orgItems = this.props.orgsInfo && this.props.orgsInfo.map(org =>
            <Tooltip key={org.id} title={org.login}>
                <Avatar className={classes.avatar} key={org.id} src={org.avatar_url} onClick={this.goTo.bind(null, org.login)} />
            </Tooltip>
        );

        // Builds empty message component
        const emptyOrgs = this.props.orgsInfo && this.props.orgsInfo.length === 0 &&
            <Typography className={classes.emptyOrgs} variant="caption">This user doesn't belong to any organizations</Typography>;

        return (
            <div>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">User organizations</ListSubheader>}
                >
                    <ListItem>
                        <ListItemText>
                            {orgItems}
                            {emptyOrgs}
                        </ListItemText>
                    </ListItem>


                </List>
            </div>
        )
    }
}

export default withStyles(styles)(UserOrgs);
