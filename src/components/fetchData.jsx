// Note that the actual fetch CAN throw an Error that must be caught by a Try Catch
// see https://fetch.spec.whatwg.org/#fetch-method and search for 'throw'
// Status codes tell us whether the call was successful or not, we must check for these codes.

// fetchDataV1 checks for an extra option field 'failureOdds' that gives the odds of 
// a random failure for testing purposes. set failureOdds to a number from 0 (no failures) to 1 (100% failures)
// all calls to fetchDataV1 MUST be surrounded by Try Catch because we throw on any errors
export const fetchDataV1 = async (url, options) => {
  
  // following is if you want to fail randomly for test purposes
  if (options && typeof options.failureOdds === 'number' && willFail(options.failureOdds)) {
    throw new Error (`Simulated network failure`);
  }

  const res = await fetch(url, options);
  if (res.ok && res.status < 300) {
    const result = await res.json();
    return result;
  } else {
    throw new Error (`Fetch to ${url} failed with status ${res.status}`);
  }
}
// fetchDataV2 checks for an extra option field 'failureOdds' that gives the odds of 
// a random failure for testing purposes. set failureOdds to a number from 0 (no failures) to 1 (100% failures)
// fetchDataV2 returns an object with:
// - isOK equal to true and data with usable data OR
// - isOK equal to false and data set to null
export const fetchDataV2 = async (url, options) => {
  // initialized in error state
  const result = {
    isOK: false,
    data: null
  };

  // following is if you want to fail randomly for testing purposes
  if (options && typeof options.failureOdds === 'number' && willFail(options.failureOdds)) {
    return result;
  }

  try {
    const res = await fetch(url, options);
    if (res.ok && res.status < 300) {
      result.data = await res.json();
      result.isOK = true;
      return result;
    }
    console.error(`fetch to ${url} failed status code ${res.status}`);
  }
  catch(error) {
    console.error(`fetch to ${url} failed with ${error.message} and status code ${error.status}`);
  }
  // guaranteed that result.isOK is false at this point
  return result;
}

// How to use fetchData calls

const sampleV1 = async () => {
  let data; 
  
  // must be surrounded by try block
  try {
    data = await fetchDataV1('https://example.com');
    // use this data
  }
  catch(error) {
    // signal a network error to the user
  }
  
}

const sampleV2 = async () => {

  // failureOdds set at 0.5 is 50% chance of failure
  const result = await fetchDataV2('https://example.com', {failureOdds: 0.5});
  if (result.isOK) {
    // result.data is actual data - use it appropriately
  } else {
    // result.data is null - Signal a network error to the user and exit
  }
}


// Debug code only

// odds must be a value from 0 to 1.0
const willFail = (odds) => {
  if (odds > 1 || odds < 0 || typeof odds !== 'number') {
    console.error('willFail requires odds between 0 and 1')
  }
  return odds > Math.random() ? true : false;
}