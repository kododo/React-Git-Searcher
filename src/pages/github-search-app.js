import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import Paper from '@material-ui/core/Paper';
import Searcher from '../components/Searcher';
import { getRepos, getUserData } from '../github-api';
import UserInfo from '../components/UserInfo';
import UserRepos from '../components/UserRepos';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


import dummyUser from '../dummy-response.js';
import dummyRepos from '../dummy-repos.js';




const styles = theme => ({
    root: {
        overflow: 'hidden',
        padding: `0 ${theme.spacing.unit * 3}px`,
    },
    wrapper: {
        maxWidth: 600,
        margin: '90px auto 0 auto',
    },
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
    },
    progress: {
        margin: '0 auto',
        display: 'block'
    },
    toolbar: {
        maxWidth: 600,
        margin: '0 auto',
        textAlign: 'left'
    }
});


class GithubSearchApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            fetchingUser: false,
            fetchingRepos: false
        }
    }

    handleSearch = async search => {
        //todo: cambiar por getUserdata
        this.setState({
            fetchingUser: true
        });
        this.setState({
            userInfo: await getUserData(search),
            fetchingUser: false,
        });
        this.setState({
            reposInfo: await getRepos(search)
        })
        /* setTimeout(() => {
            this.setState({
                userInfo: dummyUser,
                fetchingUser: false,
                reposInfo: dummyRepos
            });
        }, 1000); */
    }

    async getDummyUserData() {
        return new Promise(success => {
            setTimeout(() => success(dummyUser), 1000);
        });
    }

    async getDummyReposData() {
        return new Promise(success => {
            setTimeout(() => success(dummyRepos), 1000);
        });
    }

    render() {
        const { classes } = this.props;
        const title = 'Github Searcher';

        return (
            <div className={classes.root}>
                <AppBar position="fixed" color="primary">
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="title" color="inherit">{title}</Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.wrapper}>
                    <Searcher title="Search" onSearch={this.handleSearch} />
                    {this.state.fetchingUser && <CircularProgress className={classes.progress} />}
                    <UserInfo userInfo={this.state.userInfo} reposInfo={this.state.reposInfo} />
                    {/* <UserRepos reposInfo={this.state.reposInfo} /> */}
                </div>
            </div>
        );
    }
}

export default withRoot(withStyles(styles)(GithubSearchApp));
