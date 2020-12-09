import React, { Component } from 'react';
import {loadStripe} from "@stripe/stripe-js";
import axios from 'axios';

const stripePromise = loadStripe("pk_test_gbDI6oDXGkx6rZZWrwg4fKlh009siXbntp");
const serverPath = require("./assets/serverPath");


class soundbyte_listing extends Component {
    
    constructor(props) {
        super(props);
        this.soundbyte = new Audio(props.soundbyte);
    }

    play = () => {
        this.soundbyte.play();
    }

    pause = () => {
        this.soundbyte.pause();
    }

    // Checkout button
    redirectCheckout = async (e) => {
        const stripe = await stripePromise;

        const response = await fetch(serverPath + "/create-session", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                price: this.props.price,
                name: this.props.soundbytename,
                filename: this.props.filename,
            })
        });

        const session = await response.json();

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            alert("Checkout failed!");
        }
    }

    redirectLogin = () => {
        window.location.href = '/';
    }

    redirectProfile = () => {
        localStorage.setItem('profile', this.props.username);
        window.location.href = '/userpage';
    }

    deleteSoundbyte = (e) => {

        const name = {
            name: this.props.soundbytename
        }
        axios.post(serverPath + '/soundbytes/deleteSoundbyte', name)
            .then(res => {
                if(res.data) {
                    window.location.reload();
                } else {
                    alert("Failed to delete!");
                }
            })
            .catch(err => {
                console.log('ERROR: ' + err);
                alert("Failed to delete!");
            })
    }

    render () {
        let buyButton = [];
        let deleteButton = []
        if(this.props.loggedIn){
            buyButton.push(
                <button type="button" onClick={this.redirectCheckout} class="w-full mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ease-out duration-700">
                    <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
                    </svg>
                    Purchase
                </button>
            );
            if(this.props.username === this.props.currUser){
                deleteButton.push(
                    <div class="absolute top-2 right-2 cursor-pointer">
                        <svg class="h-5 w-5 text-red-500"onClick={this.deleteSoundbyte} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                )
            }
        }
        else{
            buyButton.push(
                <button type="button" onClick={this.redirectLogin} class="w-full mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
                    </svg>
                    Login to Purchase
                </button>
            );
        }
        return (
            <div class="relative bg-white shadow rounded-lg sm:rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-2 hover:scale-110">
                {deleteButton}
                <div class="px-4 py-5 sm:px-6">
                    <h2 class="text-2xl font-semibold text-gray-700"> {this.props.soundbytename} </h2>
                    <p class="text-green-700 mt-1 mb-1 transition duration-300 ease-in hover:text-green-500 cursor-pointer" onClick={this.redirectProfile}> Uploaded by {this.props.username} </p>
                    <p class="text-green-800 text-sm">{this.props.downloads} Downloads</p>
                    <p class="text-green-500 font-semibold text-xl mt-1"> ${this.props.price/100}</p>
                </div>
                <div class="px-4 py-5 sm: px-6">
                    <button type="button" onClick={this.play} class="w-1/2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-l-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                        Preview
                    </button>
                    <button type="button" onClick={this.pause} class="w-1/2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-r-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                        Pause
                    </button>
                    {buyButton}
                </div>
            </div>
        );
    }
}

export default soundbyte_listing;