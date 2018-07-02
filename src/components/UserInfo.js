import React from 'react';

// Components
import UserRepos from './UserRepos';
import UserOrgs from '../components/UserOrgs';

// Utils
import { formatDate } from '../utils';

// MUI styling
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';

const styles = theme => ({
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
    },
    avatar: {
        width: 60,
        height: 60,
        float: 'left',
        margin: theme.spacing.unit * 2
    },
    userInfo: {
        marginLeft: 70
    },
    title: {
        marginTop: theme.spacing.unit * 2
    }
});

// UserInfo component
class UserInfo extends React.Component {
    render() {
        // Enables MUI theming
        const { classes } = this.props;

        // Doesn't render without info
        if (!this.props.userInfo) {
            return null;
        }

        // Builds generic user details components
        const details = [
            { prop: 'email', label: 'Email', value: this.props.userInfo.user.email },
            { prop: 'created_at', label: 'User since', value: formatDate(this.props.userInfo.user.created_at) },
            { prop: 'location', label: 'Location', value: this.props.userInfo.user.location },
        ].map(detail => this.props.userInfo.user[detail.prop] ? <Typography key={detail.prop} variant="body1">{detail.label}: {detail.value}</Typography> : null);

        return (
            <div>
                <Zoom in>
                    <Paper className={classes.paper}>
                        <Avatar src={this.props.userInfo.user.avatar_url} className={classes.avatar} />
                        <div className={classes.userInfo}>
                            <Typography variant="title" className={classes.title}>{this.props.userInfo.user.login}</Typography>
                            <Typography variant="subheading" paragraph>{this.props.userInfo.user.name}</Typography>
                            {details}
                        </div>
                        <div style={{clear:'both'}}></div>
                        <UserRepos reposInfo={this.props.reposInfo} />
                        <UserOrgs orgsInfo={this.props.userInfo.orgs} />
                    </Paper>
                </Zoom>
            </div>
        )
    }
}

export default withStyles(styles)(UserInfo);
