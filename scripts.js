//created function to hold the state tree
function createStore(reducer) {
    // Declare a variable 'state' to hold the current state of the store
    var state;
    // Declare an array 'listeners' to hold the subscription functions
    var listeners = [];

    /**
     * Returns the current state of the store.
     * @returns {*} The current state.
     */
    function getState() {
        return state;
    }

    /**
     * Dispatches an action to update the state of the store.
     * @param {Object} action - An action object with a 'type' property and optionally other properties.
     */
    function dispatch(action) {
        // Update the state by calling the reducer function with the current state and action
        state = reducer(state, action);
        // Iterate over each listener and invoke it to notify subscribers about the state change
        for (var i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    }

    /**
     * Adds a new listener to the store.
     * @param {Function} callback - A callback function to be called when the state changes.
     */
    function subscribe(callback) {
        // Add the callback function to the listeners array
        listeners.push(callback);
    }

    // Initialize the state by dispatching an empty action
    dispatch({});

    // Return an object containing methods to interact with the store: getState, dispatch, and subscribe
    return { getState: getState, dispatch: dispatch, subscribe: subscribe };
}

/**
 * A reducer function to manage state updates for a counter.
 * @param {Object} [state={ count: 0 }] - The current state of the counter.
 * @param {Object} action - An action object with a 'type' property.
 * @returns {Object} The next state of the counter.
 */
function counterReducer(state = { count: 0 }, action) {
    // Switch based on the action type to determine how to update the state
    switch (action.type) {
        case 'ADD':
            // Increment the count in the state object and return the updated state
            return { count: state.count + 1 };
        case 'SUBTRACT':
            // Decrement the count in the state object and return the updated state
            return { count: state.count - 1 };
        case 'RESET':
            // Reset the count to 0 and return the updated state
            return { count: 0 };
        default:
            // If the action type is unknown, return the current state without modification
            return state;
    }
}

// Create the store by passing the reducer function to the createStore function
var store = createStore(counterReducer);

// Subscribe to state changes and log them
/**
 * Logs the current state whenever it changes.
 */
store.subscribe(function() {
    console.log("State:", store.getState());
});

// Assuming HTML buttons with ids 'increment', 'decrement', 'reset' exist,
// Attach event listeners to HTML buttons to dispatch actions when clicked
document.getElementById('increment').addEventListener('click', function() {
    store.dispatch({ type: 'ADD' });
});

document.getElementById('decrement').addEventListener('click', function() {
    store.dispatch({ type: 'SUBTRACT' });
});

document.getElementById('reset').addEventListener('click', function() {
    store.dispatch({ type: 'RESET' });
});

// Scenario 1: Initial State Verification
// Log the initial state of the store
console.log("Initial state:", store.getState()); // Should log { count: 0 }

// Scenario 2: Incrementing the Counter
// Dispatch two ADD actions to increment the counter
store.dispatch({ type: 'ADD' });
store.dispatch({ type: 'ADD' });

// Scenario 3: Decrementing the Counter
// Dispatch a SUBTRACT action to decrement the counter
store.dispatch({ type: 'SUBTRACT' });

// Scenario 4: Resetting the Counter
// Dispatch a RESET action to reset the counter to 0
store.dispatch({ type: 'RESET' });