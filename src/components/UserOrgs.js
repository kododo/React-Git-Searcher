import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tooltip from '@material-ui/core/Tooltip';

import { windowOpen } from '../utils';



const styles = theme => ({
    avatar: {
        cursor: 'pointer',
        display: 'inline-block',
        border: `3px solid ${theme.palette.primary.main}`,
        margin: '5px 6px',
        width: 40,
        height: 40
    },
});

class UserOrgs extends React.Component {

    goTo(login){
        windowOpen(`https://www.github.com/${login}`);
    }

    render() {
        const { classes } = this.props;

        const orgItems = this.props.orgsInfo && this.props.orgsInfo.map(org =>
            <Tooltip key={org.id} title={org.login}>
                <Avatar className={classes.avatar} key={org.id} src={org.avatar_url} onClick={this.goTo.bind(null,org.login)} />
            </Tooltip>
        );

        return (
            <div>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">User organizations</ListSubheader>}
                >
                    <ListItem>
                        <ListItemText>
                            {orgItems}
                        </ListItemText>
                    </ListItem>


                </List>
            </div>
        )
    }
}

export default withStyles(styles)(UserOrgs);
