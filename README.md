# Fetch Demo

This project is mainly to demonstrate safe ways to call fetch, being careful to always use Try...Catch to protect against Throws and to add a way to simulate network failures to ensure your code doesn't crash.

## For HTTP requests, use fetchData

There are two ways to get data using code in fetchData.jsx. Both ways protect you from network errors, missing networks, server errors, etc.

- fetchDataV1 must be called within Try..Catch blocks because it will always Throw on any network error or missing server.
- fetchDataV2 does **not** need to be in a Try..Catch block because it returns a field (isOK) that tells if the call was successful. Be warned that if isOK is false, the data field will be null.

## Project uses Free JSON endpoints

This project uses free endpoints at:
- [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/) for the list of posts
- [https://randomuser.me/](https://randomuser.me/) for random users with names and photos.

Posts.jsx and Posts2.jsx create similar lists of posts calling these two free websites, but Posts uses fetchDataV1 and Posts2 uses fetchDataV2. Take a look at the code to see how to call it.

## Prepare for failure

fetchDataV1 and fetchDataV2 have an optional field that allows them to "fail" at random times. failureOdds must be a number between 0 and 1 (inclusive) where 0 means fetchData will fail 0% of the time and 1 means it will fail 100% of the time (0.4 means it fails 40% of the time, etc). Set these for passing into fetchData and the just reload the page and see how well your code handles failures.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

