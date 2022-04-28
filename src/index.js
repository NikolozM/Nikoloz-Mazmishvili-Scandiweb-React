import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./styles.css";
import { BrowserRouter } from "react-router-dom";

import {ApolloClient,InMemoryCache, HttpLink, ApolloProvider, from} from '@apollo/client'
import {onError} from '@apollo/client/link/error';

const errorLink = onError(({graphqlErrors, networkError}) =>{
    if (graphqlErrors){
        graphqlErrors.map(({message, location, path}) =>{
            alert('Graphql error ${message}');
        });
    }
    
});

const link = from([
    errorLink,
    new HttpLink({uri: "http://localhost:4000/"}),
]);

export const client = new ApolloClient ({
    cache: new InMemoryCache(),
    link: link
});

ReactDOM.render(<ApolloProvider client={client}><BrowserRouter><App /></BrowserRouter></ApolloProvider>, document.getElementById("root"))