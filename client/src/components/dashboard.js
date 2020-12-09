import React, { Component } from 'react';
import Soundbyte_listing from './soundbyte_listing';
import logo from './assets/soundbyte_logo.png';
import tom_profile from './assets/tom.jpg';
import jeff_profile from './assets/jeff.jpg';
import axios from 'axios';

const serverPath = require("./assets/serverPath");

class dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem("user"),
            search: null,
            soundbyte_listings: [],
        };
    }

    componentDidMount() {
        axios.get(serverPath + '/soundbytes/getListings')
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

    

    setSearch = (e) => {
        this.setState({ search: e.target.value});
    }

    logout = () => {
        localStorage.setItem('user', "");
        window.location.href = '/';
    }

    redirectLogin = () => {
        window.location.href = '/';
    }

    redirectPostListing = () => {
        window.location.href = '/listing';
    }

    searchSoundbyte = (e) => {

        const search = {
            search: this.state.search
        }


        axios.post(serverPath + '/soundbytes/searchSoundbyte', search)
            .then(res => {
                let path = "http://ec2-3-17-165-170.us-east-2.compute.amazonaws.com/soundbyte_uploads/";
                let soundbyte_listings = [];
                let listing = res.data;
                let loggedIn = !!(this.state.user);
                if(listing){
                    soundbyte_listings.push(<Soundbyte_listing username={listing.username} soundbytename={listing.listingName} price={listing.price} soundbyte={path + listing.filename} filename={listing.filename} loggedIn={loggedIn} downloads={listing.downloads} currUser={this.state.user}/>);
                }
                else{
                    soundbyte_listings.push(<h1 class="text-3xl font-semibold text-gray-900">No Soundbytes match your search!</h1>)
                }
                this.setState({soundbyte_listings: soundbyte_listings});
                })
                .catch(err => {
                    console.log('ERROR: ' + err);
                    alert("Failed to search!");
                })
    }

    reloadPage = () => {
        window.location.reload();
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
        let mobileNavbar = [];
        let reglog = (this.state.user) ? <p class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-red-700 cursor-pointer transition duration-300 ease-in-out" onClick={this.logout}>Logout</p> : <p class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700" onClick={this.redirectLogin}>Login or Register</p>;
        let reglogMobile = (this.state.user) ? <p class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={this.logout}>Logout</p> : <p class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={this.redirectLogin}>Login or Register</p>;
        mobileNavbar.push(reglogMobile);
        navbar.push(reglog);
        if(this.state.user){
            navbar.push(<p class="transition duration-500 ease-in-out bg-gray-800 hover:bg-green-600 transform hover:-translate-y-1 hover:scale-110 text-gray-300 hover:text-white px-3 py-2 px-3 rounded-md text-sm cursor-pointer" onClick={this.redirectPostListing}>Post New Listing</p>);
            mobileNavbar.push(<p class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={this.redirectPostListing}>Post New Listing</p>);
        }
        return (
            <div>
                <div>
                    <nav class="bg-gray-800">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div class="flex items-center justify-between h-16">
                                <div class="flex items-center">

                                    <div class="flex items-center flex-shrink-0 cursor-pointer">
                                        <img onClick={this.reloadPage} class="h-9 w-9" src={logo} alt="Soundbyte"></img>
                                    </div>
                                    
                                    <div class="hidden md:block">
                                        <div class="ml-10 flex items-baseline space-x-4">
                                            <p class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900"> Welcome {this.state.user}</p>
                                            {navbar}
                                        </div>
                                    </div>

                                </div>

                                <button onClick={()=>{this.setState({show:!this.state.show})}} class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden" aria-expanded="false">
                                    <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <div class="hidden md:block">
                                    <div class="ml-4 flex md:ml-6">
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
                        <div>  
                            {
                                this.state.show? 
                                <div class="">
                                    <div class="px-2 pt-2 pb-3 space-y-1">
                                        <a href="#" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Welcome {this.state.user}</a>
                                        {mobileNavbar}
                                    </div>
                                </div> : null
                            }
                        </div>    
                    </nav>

                    <header class="bg-white shadow">
                        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <h1 class="text-3xl font-semibold leading-tight text-gray-900">Discover byte-sized sounds at byte-sized prices</h1>
                            <p class="text-lg mt-2 text-gray-700">Browse the latest soundbytes from the hottest artists.</p>
                            <div class="py-2">
                                <div class="bg-white flex items-center">
                                    <input onChange={this.setSearch} class="border border-gray-400 rounded-md w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search"/>
                                    <div class="p-4">
                                        <button onClick={this.searchSoundbyte} type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            Search
                                        </button>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <main>
                        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                            <div class="px-4 py-6 sm:px-0">
                                <div class="h-72 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
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

export default dashboard;