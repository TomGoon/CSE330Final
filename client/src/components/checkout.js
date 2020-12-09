import React, { Component } from 'react';
import logo_white from './assets/soundbyte_logo_white.png';
import axios from 'axios';
const serverPath = require("./assets/serverPath");

class welcome extends Component {
   
    constructor(props) {
        super(props);
        let search = new URLSearchParams(this.props.location.search);
        this.state = {
            user: localStorage.getItem("user"),
            success: search.get("success"),
            filename: search.get("filename"),
            listingname: search.get("listingname"),
        };
    }

    redirectDashboard = () => {
        window.location.href = '/dashboard';
    }
    
    componentDidMount () {

        // Download file adapted from: https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
        if(this.state.success){

            const filename = {
                filename: this.state.filename,
            }

            const downloadUpdate = {
                listingName: this.state.listingname
            }

            axios.post(serverPath + "/soundbytes/download", filename, {
                responseType: 'blob',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', this.state.filename);
                link.click();
            })
            .catch(err => {
                console.log('ERROR: ' + err);
            });

            axios.post(serverPath + "/soundbytes/updatedownloads", downloadUpdate, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response);

            })
            .catch(err => {
                console.log('ERROR: ' + err);
            });

        }
    }

    render () {
        return (
            <div class="from-blue-400 to-green-400 bg-gradient-to-r w-full h-full block">
                <div class="min-h-screen flex flex-col items-center justify-center">
                    <img class="mx-auto h-12 w-auto" src={logo_white} alt="Soundbyte"></img>
                    <p class="text-2xl mt-6 text-center text-3xl font-bold text-white">Thank you for Shopping at Soundbyte</p>
                    <div class="space-y-4 mt-8 mb-8 items-center justify-center">
                        <p class="text-white text-opacity-80 text-lg">Enjoy your soundbyte download!</p>
                    </div>
                    <div class="w-1/3">
                        <button type="submit" onClick={this.redirectDashboard} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-green-500 bg-white hover:bg-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Back to the Soundbytes!
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