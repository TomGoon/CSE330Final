import React, { Component } from 'react';
import Soundbyte_listing from './soundbyte_listing';
import logo from './assets/soundbyte_logo.png';
import axios from 'axios';
import tom_profile from './assets/tom.jpg';
import jeff_profile from './assets/jeff.jpg';

const serverPath = require("./assets/serverPath");

class userpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem("user"),
            profile: localStorage.getItem("profile"),
            soundbyte_listings: [],
        };

    }

    componentDidMount() {

        const profile = {
            profile: this.state.profile
        }

        console.log(profile);

        axios.post(serverPath + '/soundbytes/getProfile', profile)
        .then(res => {
            let path = "http://ec2-3-17-165-170.us-east-2.compute.amazonaws.com/soundbyte_uploads/";
            // let path = "file:///Users/jeffreysu/330_modules/soundbyte_uploads/";
            let soundbyte_listings = [];
            let listings = res.data;
            let loggedIn = !!(this.state.user);
            console.log(loggedIn);
            for(let i = 0; i < listings.length; i++){
                soundbyte_listings.push(<Soundbyte_listing username={listings[i].username} soundbytename={listings[i].listingName} price={listings[i].price} soundbyte={path + listings[i].filename} filename={listings[i].filename} loggedIn={loggedIn} downloads={listings[i].downloads} currUser={this.state.user}/>);
            }
            this.setState({soundbyte_listings: soundbyte_listings});
        })
        .catch(err => {
            console.log('ERROR: ' + err);
        })
    }


    logout = () => {
        localStorage.setItem('user', "");
        window.location.href = '/';
    }

    redirectLogin = () => {
        window.location.href = '/';
    }

    redirectDashboard = () => {
        window.location.href = '/dashboard';
    }

    tom = () => {
        alert("https://www.linkedin.com/in/thomas-goon-ab5790193/");
    }

    jeff = () => {
        alert("https://www.linkedin.com/in/su-jeff/");
    }

    render = () => {
        // Login or Logout button implementation
        let navbar = [];
        let reglog = (this.state.user) ? <p class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-red-700 cursor-pointer transition duration-300 ease-in-out" onClick={this.logout}>Logout</p> : <p class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700" onClick={this.redirectLogin}>Login or Register</p>;
        navbar.push(reglog);
        if(this.state.user){
            navbar.push(<p class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700" onClick={this.redirectDashboard}>Back to Dashboard</p>);
        }
        return (
            <div>
                <div>
                    <nav class="bg-gray-800">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div class="flex items-center justify-between h-16">
                                <div class="flex items-center">
                                    <div class="flex items-center flex-shrink-0">
                                        <img class="h-9 w-9" src={logo} alt="Soundbyte"></img>
                                    </div>
                                    <div class="hidden md:block">
                                        <div class="ml-10 flex items-baseline space-x-4">
                                            <p class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900"> Welcome {this.state.user}</p>
                                            {navbar}
                                        </div>
                                    </div>
                                </div>
                                <div class="hidden md:block">
                                    <div class="ml-4 flex items-center md:ml-6">
                                        <div class="ml-3 relative">
                                            <div>
                                                <button class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white border-4 border-gray-800 hover:border-white" id="user-menu" aria-haspopup="true">
                                                    <img onClick={this.tom} class="h-8 w-8 rounded-full" src={tom_profile} alt=""></img>
                                                    {/* <img onClick={this.jeff} class="h-8 w-8 rounded-full" src={jeff_profile} alt=""></img> */}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <header class="bg-white shadow">
                        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <h1 class="text-3xl font-semibold leading-tight text-gray-900">Viewing {this.state.profile}'s Soundbytes</h1>
                        </div>
                    </header>
                    <main>
                        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                            <div class="px-4 py-6 sm:px-0">
                                <div class="h-72 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {this.state.soundbyte_listings}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default userpage;