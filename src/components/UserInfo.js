import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import UserRepos from './UserRepos';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import UserOrgs from '../components/UserOrgs';
import { formatDate } from '../utils';
import Paper from '@material-ui/core/Paper';




const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: '0 auto',
    },
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
    },
    avatar: {
        width: 60,
        height: 60,
        float: 'left'
    },
    userInfo: {
        marginLeft: 70
    }
});

class UserInfo extends React.Component {
    render() {
        const { classes } = this.props;

        if (!this.props.userInfo) {
            return null;
        }

        const details = [
            { prop: 'email', label: 'Email', value: this.props.userInfo.user.email },
            { prop: 'created_at', label: 'User since', value: formatDate(this.props.userInfo.user.created_at)},
            { prop: 'location', label: 'Location', value: this.props.userInfo.user.location},
        ].map( detail => this.props.userInfo.user[detail.prop] ? <Typography key={detail.prop} variant="body1">{detail.label}: {detail.value}</Typography> : null);

        return (
            <div>
                <Paper className={classes.paper}>
                    <Avatar src={this.props.userInfo.user.avatar_url} className={classes.avatar} />
                    <div className={classes.userInfo}>
                        <Typography variant="title" >{this.props.userInfo.user.login}</Typography>
                        <Typography variant="subheading" paragraph>{this.props.userInfo.user.name}</Typography>
                        {details}
                    </div>
                    {/* <CardHeader
                        avatar={
                            <Avatar src={this.props.userInfo.user.avatar_url} className={classes.avatar} />
                        }
                        title={this.props.userInfo.user.login}
                        subheader={`User since ${formatDate(this.props.userInfo.user.created_at)}`}
                    /> */}
                    <UserRepos reposInfo={this.props.reposInfo} />
                    <UserOrgs orgsInfo={this.props.userInfo.orgs} />
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(UserInfo);
