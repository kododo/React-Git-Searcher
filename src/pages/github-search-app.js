import React from 'react';

// Components
import Searcher from '../components/Searcher';
import UserInfo from '../components/UserInfo';

// Utils
import { getRepos, getUserData } from '../github-api';

// Debugging
import dummyUser from '../dummy-response.js';
import dummyRepos from '../dummy-repos.js';

// MUI styling
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
    root: {
        overflow: 'hidden',
        padding: `0 ${theme.spacing.unit * 3}px`,
    },
    wrapper: {
        maxWidth: 600,
        margin: '90px auto 0 auto',
    },
    progress: {
        margin: '0 auto',
        display: 'block'
    },
    toolbar: {
        maxWidth: 600,
        margin: '0 auto',
        textAlign: 'left'
    },
    snack: {
        margin: 20
    }
});

// Toggle debug mode
const DEBUG_MODE = true;

// Error messages
const messages = {
    USER_NOT_FOUND: 'Could not retrieve user data! :(',
    REPOS_NOT_FOUND: 'Could not load user repositories!'
}

// Main page component
class GithubSearchApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            reposInfo: null,
            fetchingUser: false
        }
    }

    // Toggles an error message snack
    showErrorSnack = text => {
        this.setState({
            showSnack: true,
            snackText: text
        });
    }

    // Closing the snack
    handleCloseSnack = () => {
        this.setState({
            showSnack: false,
            snackText: ''
        });
    }

    // Main logic, handles search input
    handleSearch = async search => {
        // Initial state
        let userInfo;
        let reposInfo;
        this.setState({
            fetchingUser: true,
            userInfo: null,
            reposInfo: null
        });
        
        // Try to load user info
        try {
            userInfo = DEBUG_MODE ? await this.getDummyUserData() : await getUserData(search);
        } catch (err) {
            this.showErrorSnack(messages.USER_NOT_FOUND);
            this.setState({ fetchingUser: false });
            return;
        }
        this.setState({
            userInfo: userInfo,
            fetchingUser: false,
        });

        // Try to load user repos
        try{
            reposInfo = DEBUG_MODE ? await this.getDummyReposData() : await getRepos(search);
        }catch(err){
            this.showErrorSnack(messages.REPOS_NOT_FOUND);
            reposInfo = [];
        }
        this.setState({
            reposInfo: reposInfo
        });
    }

    // Proxies a user data dummy response
    async getDummyUserData() {
        return new Promise(success => {
            setTimeout(() => success(dummyUser), 1000);
        });
    }

    // Proxies a repo data dummy response
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
                    <UserInfo 
                        userInfo={this.state.userInfo} 
                        reposInfo={this.state.reposInfo} 

                        />
                </div>
                <Snackbar
                    className={classes.snack}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.showSnack}
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnack}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackText}</span>} />
            </div>
        );
    }
}

export default withRoot(withStyles(styles)(GithubSearchApp));
