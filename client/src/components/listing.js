import React, { Component } from 'react';
import logo from './assets/soundbyte_logo.png';
import axios from 'axios';

const serverPath = require("./assets/serverPath");

class login extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem("user"),
            file: null,
            listingName: null,
            price: null,
            upload: [],
        };
    }

    componentDidMount () {
        let upload = [];
        upload.push(
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700">Upload soundbyte</label>
                <div class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                            <label for="file" class="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                                <span>Upload a file</span>
                                <input id="file" name="file" type="file" onChange={this.setFile} class="sr-only"></input>
                            </label>
                            <p class="pl-1">to Soundbyte</p>
                        </div>
                        <p class="text-xs text-gray-500">
                            MP3, WAV, or other audio formats
                        </p>
                    </div>
                </div>
            </div>
        );
        this.setState({upload: upload});
    }

    setListingName = (e) => {
        this.setState({listingName: e.target.value});
    }

    setPrice = (e) => {
        this.setState({price: e.target.value});
    }

    setFile = (e) => {
        let upload = [];
        upload.push(
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700">Upload soundbyte</label>
                <div class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                            <label for="file" class="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                                <span>Uploaded File</span>
                                <input id="file" name="file" type="file" onChange={this.setFile} class="sr-only"></input>
                            </label>
                            <p class="pl-1">to Soundbyte</p>
                        </div>
                        <p class="text-xs text-gray-500">
                            MP3, WAV, or other audio formats
                        </p>
                    </div>
                </div>
            </div>
        );
        this.setState({
            file: e.target.files[0],
            upload: upload,
        })
    }

    uploadListing = (e) => {
        e.preventDefault();

        // Form data for the file itself
        const form = new FormData();
        form.append('file', this.state.file);

        // Upload the file to our server
        axios.post(serverPath + '/upload', form, {
            })
            .then(res => {
                console.log(res.statusText);
            })

        // Store listing information
        const listing = {
            username: this.state.user,
            filename: (this.state.file) ? this.state.file.name : null,
            listingName: this.state.listingName,
			price: this.state.price,
			downloads: 0
		}

        // Upload Soundbyte listing to MongoDB
        axios.post(serverPath + '/soundbytes/uploadSoundbyteListing', listing)
            .then(res => {
                console.log(res.data);
                if(res.data) {
                    console.log("Successfully uploaded soundbyte");
                    window.location.href = '/dashboard';
                } else {
                    console.log("Failed to upload file");
                    alert("Failed to upload file, fields may be missing")
                }
            })
            .catch(err => {
                console.log('ERROR: ' + err);
                alert("Failed to upload file, fields may be missing or incorrect")
            })
    }

    redirectDashboard = () => {
        window.location.href = '/dashboard';
    }

    render () {
        return (
            <div class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-full h-screen">
				<form action="#" method="POST" enctype="multipart/form-data" class="items-center mx-auto lg:w-1/2">
					<div class="shadow rounded-md py-8 px-8 bg-white">
						<img class="h-9 w-9 mx-auto mb-2" src={logo} alt="Soundbyte"></img>
						<h1 class="text-xl font-semibold text-center mb-4 text-green-5">Sell a new soundbyte for the world to hear</h1>
						<div>
							<label for="listingName" class="block text-sm font-medium text-gray-700">Soundbyte Title</label>
							<input id="listingName" name="listingName" onChange={this.setListingName} class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 py-2 p sm:text-sm mt-1 border border-gray-400 rounded-md bg-white" placeholder="Song name" type="text"></input>
						</div>
						<div class="mt-4">
							<label for="price" class="block text-sm font-medium text-gray-700">Price</label>
							<input id="price" name="price" onChange={this.setPrice} class="focus:ring-green-500 focus:border-indigo-500 block w-full pl-4 pr-12 py-2 p sm:text-sm mt-1 border border-gray-400 rounded-md bg-white" placeholder="Price (in cents)" type="text"></input>
						</div>
						{this.state.upload}
						<div class="text-right py-4">
							<button type="button" onClick={this.redirectDashboard} class="mr-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
								Back
							</button>
							<button type="submit" onClick={this.uploadListing} class="justify-center py-2 px-4 rounded-md bg-green-500 text-white text-sm font-medium hover:bg-green-600">
								List Soundbyte
							</button>
						</div>
						
					</div>
				</form>
			</div>
        );
    }
}

export default login;