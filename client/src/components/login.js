import React, { Component } from 'react';
import logo from './assets/soundbyte_logo.png';
import axios from 'axios';

const serverPath = require("./assets/serverPath");

class login extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("user"),
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

    setPassword = (e) => {
        this.setState({ password: e.target.value});
    }
    
    verifyLogin = (e) => {
        e.preventDefault();
        
        const currentUser = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post(serverPath + '/users/login', currentUser)
            .then(res => {
                if(res.data) {
                    // Login adapted from: https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/
                    localStorage.setItem('user', this.state.username);
                    window.location.href = '/welcome'
                } else {
                    alert("Invalid credentials");
                }
            })
            .catch(err => {
                console.log('ERROR: ' + err);
                alert("Failed to login!");
            })

    }

    redirectRegister = () => {
        window.location.href = '/register';
    }

    redirectWelcome = () => {
        window.location.href = '/welcome';
    }

    render () {
        return (
            <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-8">
                    <div>
                        <img class="mx-auto h-12 w-auto" src={logo} alt="Workflow"></img>
                        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
                        <p class="mt-2 text-center text-sm text-gray-600">Or <span onClick={this.redirectWelcome} class="font-medium text-green-500 hover:text-green-400">continue without an account</span></p>
                    </div>
                    
                    <form class="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true"></input>
                        <div class="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label for="username" class="sr-only">Username</label>
                                <input id="username" name="username" type="text" onChange={this.setUsername} autocomplete="username" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username"></input>
                            </div>
                            <div>
                                <label for="password" class="sr-only">Password</label>
                                <input id="password" name="password" type="password" onChange={this.setPassword} autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"></input>
                            </div>
                        </div>

                        <div>
                            <button type="submit" onClick={this.verifyLogin} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg class="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                Sign in
                            </button>
                        </div>

                        <div>
                            <p class="mt-2 text-center text-sm text-gray-600">Don't have an account? <span onClick={this.redirectRegister} class="font-medium text-green-500 hover:text-green-400">Create One</span></p>
                        </div>

                    </form>

                </div>
            </div>
        );
    }
}

export default login;