import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import NavBar from './HeaderComponent/NavBar'
import {Button, Paper} from '@material-ui/core'
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import * as favorites_action from "../actions/favorites_action";


class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            city: '',
            bio: '',
            numComments: '',
            favorites: []
        }
        this.handleFavorite = this.handleFavorite.bind(this);
    }
    componentDidMount (){
        axios({
            method: 'post',
            url: `/api/Profile`,
            data: {id: this.props.match.params.id},
            config: { headers: {'Content-Type': 'application/json' }}
        }).then(response => {
            this.setState({
                fullname: response.data.dbresponse[0].fullname,
                city: response.data.dbresponse[0].city,
                bio: response.data.dbresponse[0].bio
            });
        }).catch(function (response) {
            console.log("Error",response);
        });
        axios({
            method: 'post',
            url: `/api/Profile/commentCounts`,
            data: {id: this.props.match.params.id},
            config: { headers: {'Content-Type': 'application/json' }}
        }).then(response => {
            this.setState({
                numComments: response.data.dbresponse[0].numcomment
            });
        }).catch(function (response) {
            console.log("Error",response);
        });
    }

    handleFavorite() {
        this.props.dispatch(favorites_action.linkButton(this.props.match.params.id));
    }

    render() {
        return (
            <div>
                <Paper className='wallpaper'>
                    <NavBar/>
                    <Paper style={{padding: "2%", width:"50%", margin:"auto", paddingLeft: "5%", paddingRight: "5%", marginTop: "5%"}}>
                        <Typography variant="headline" style={{padding: "5%"}}>Name: {this.state.fullname}</Typography>
                        <Typography variant="headline" style={{padding: "5%"}}>City: {this.state.city}</Typography>
                        <Typography variant="headline" style={{padding: "5%"}}>About Me: {this.state.bio}</Typography>
                        <Typography variant="headline" style={{padding: "5%"}}>Karma: {Math.round(Math.PI * (parseInt(this.state.numComments) + 1) * 100)/100}</Typography>
                        <div>
                            <Button variant="contained"
                                    // className={classes.button}
                                    onClick={this.handleFavorite}
                                    color="white">
                                Favorite Locations
                            </Button>
                        </div>
                    </Paper>
                </Paper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(ProfilePage);
