import React, { Component } from 'react';
import logo_white from './assets/soundbyte_logo_white.png';

class welcome extends Component {
   
    constructor(props) {
        super(props);

        this.state = {
            user: localStorage.getItem("user")
        };
        console.log(localStorage.getItem("user"));
    }

    redirectDashboard = () => {
        window.location.href = '/dashboard';
    }
    
    render () {
        return (
            <div class="from-blue-400 to-green-400 bg-gradient-to-r w-full h-full block">
                <div class="min-h-screen flex flex-col items-center justify-center">
                    <img class="mx-auto h-12 w-auto" src={logo_white} alt="Soundbyte"></img>
                    <p class="text-2xl mt-6 text-center text-3xl font-bold text-white">Welcome to Soundbyte</p>
                    <div class="space-y-4 mt-8 mb-8 items-center justify-center">
                        <p class="text-white text-opacity-80 text-lg">Explore our marketplace of unique soundbytes</p>
                        <p class="text-white text-opacity-80 text-lg">Purchase and own your favorite sounds</p>
                        <p class="text-white text-opacity-80 text-lg">Are you a creator? List and sell your own soundbytes</p>
                    </div>
                    <div class="w-1/3">
                        <button type="submit" onClick={this.redirectDashboard} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-green-500 bg-white hover:bg-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Let's Go
                            <span class="absolute right-0 inset-y-0 flex items-center pr-3">
                                    <svg class="animate-bounce h-5 w-5 text-green-500 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" clip-rule="evenodd" />
                                    </svg>
                            </span>
                        </button>   
                    </div>
                </div>
                
            </div>
        );
    }
}

export default welcome;