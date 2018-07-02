import React from 'react';

// Utils
import { formatDate, windowOpen } from '../utils';

// MUI styling
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import SvgIcon from '@material-ui/core/SvgIcon';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    icon: {
        display: 'inline',
        verticalAlign: 'middle',
        margin: '0 5px',
        color: theme.palette.primary.dark
    },
    iconContainer: {
        textAlign: 'center',
        margin: 10
    },
    button: {
        margin: '0 15px',
        padding: '0 15px',
        maxWidth: '95%'
    }
});

// UserRepoItem component
class UserRepoItem extends React.Component {
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
        const { classes } = this.props;

        // Builds components for icon counters
        const countItems = [
            {
                title: "Forks",
                path: <path d="M3,4V12.5L6,9.5L9,13C10,14 10,15 10,15V21H14V14C14,14 14,13 13.47,12C12.94,11 12,10 12,10L9,6.58L11.5,4M18,4L13.54,8.47L14,9C14,9 14.93,10 15.47,11C15.68,11.4 15.8,11.79 15.87,12.13L21,7" />,
                count: this.props.repo.forks_count,
                id: this.props.repo.id
            },
            {
                title: "Stargazers",
                path: <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />,
                count: this.props.repo.stargazers_count,
                id: this.props.repo.id
            },
            {
                title: "Watchers",
                path: <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />,
                count: this.props.repo.watchers_count,
                id: this.props.repo.id
            },
        ].map(item =>
            <Grid key={`${item.id}-${item.title}`} item xs={2} sm={2} className={classes.iconContainer}>
                <Tooltip title={item.title}>
                    <div>
                        <SvgIcon className={classes.icon}>{item.path}</SvgIcon>
                        <Typography className={classes.icon}>{item.count}</Typography>
                    </div>
                </Tooltip>
            </Grid>
        );

        // Builds open repo button component
        const openButton = <Grid item xs={12} sm={4} className={classes.iconContainer}>
            <Button fullWidth variant="contained" color="default" className={classes.button} onClick={windowOpen.bind(null, this.props.repo.html_url)}>
                <span>Open</span>
                <SvgIcon style={{ marginLeft: 5 }}>
                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                </SvgIcon>
            </Button>
        </Grid>;

        return (
            <div>
                <ListItem key={this.props.repo.id} button onClick={this.handleClick}>
                    <Avatar>{this.props.repo.name.charAt(0).toUpperCase()}</Avatar>
                    <ListItemText
                        primary={this.props.repo.name}
                        secondary={`Last update: ${formatDate(this.props.repo.updated_at)}`}
                    />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <Grid container justify="space-around" alignItems="baseline">
                        {countItems}
                        {openButton}
                    </Grid>
                </Collapse>

            </div>
        )
    }
}

export default withStyles(styles)(UserRepoItem);
