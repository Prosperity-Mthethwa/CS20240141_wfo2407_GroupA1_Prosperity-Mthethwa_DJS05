//created function to hold the state tree
function createStore(reducer) {
    var state;
    var listeners = [];

    function getState() {
        return state;
    }
}

//dispatches action to update state of the store 
function dispatch(action) {
    state = reducer(state, action); // state updator by calling reducer current state and action
    for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
    }
}

function subscribe(callback) {
    listeners.push(callback);

    dispatch({}); //initializes the state by dispatching an empty action.

    return { getState: getState, dispatch: dispatch, subcribe: subscribe };
}

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
    };
}

var store = createStore(counterReducer);

store.subscribe(function(){
    console,log("state:", store.getState());
});

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
