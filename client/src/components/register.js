import React, { Component } from 'react';
import logo from './assets/soundbyte_logo.png';
import axios from 'axios';
const serverPath = require("./assets/serverPath");

class register extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("user"),
            email: null,
            password: null,
        };
    }

    componentDidMount() {
        if(this.state.username){
            window.location.href = '/dashboard';
        }
    }

    setUsername = (e) => {
        this.setState({ username: e.target.value});
    }

    setEmail = (e) => {
        this.setState({ email: e.target.value});
    }

    setPassword = (e) => {
        this.setState({ password: e.target.value});
    }
    
    registerUser = (e) => {
        e.preventDefault();
        
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios.post(serverPath + '/users/register', newUser)
            .then(res => {
                console.log(res.data);
                if(res.data) {
                    this.redirectLogin();
                }
            })
            .catch(err => {
                console.log('ERROR: ' + err);
                alert("Failed to register account!");
            })

    }

    redirectLogin = () => {
        window.location.href = '/';
    }

    render () {
        return (
            <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-8">
                    <div>
                        <img class="mx-auto h-12 w-auto" src={logo} alt="Workflow"></img>
                        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Create a Soundbyte Account</h2>
                        <p class="mt-2 text-center text-sm text-gray-600">Explore thousands of unique sounds at low prices</p>
                    </div>
                    
                    <form class="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true"></input>
                        <div class="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label for="username" class="sr-only">Set username</label>
                                <input id="username" name="username" type="text" onChange={this.setUsername} autoComplete="username" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Set username"></input>
                            </div>
                            <div>
                                <label for="email-address" class="sr-only">Your email</label>
                                <input id="email-address" name="email" type="email" onChange={this.setEmail} autoComplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Set email address"></input>
                            </div>
                            <div>
                                <label for="password" class="sr-only">Set password</label>
                                <input id="password" name="password" type="password" onChange={this.setPassword} autoComplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Set password"></input>
                            </div>
                        </div>

                        <div>
                            <button onClick={this.registerUser} type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                Join Soundbyte
                            </button>
                        </div>

                        <div>
                            <p class="mt-2 text-center text-sm text-gray-600">Already have an account? <span onClick={this.redirectLogin} class="font-medium text-green-500 hover:text-green-400">Sign In</span></p>
                        </div>

                    </form>

                </div>
            </div>
        );
    }
}

export default register;