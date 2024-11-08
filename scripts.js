//created function to hold the state tree
function createStore (reducer) {
    var state;
    var listeners = [];

    function getState (){
        return state;
    }
};

//dispatches action to update state of the store 
function dispatch (action) {
    state = reducer(state, action); // state updator by calling reducer current state and action
    for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
    };
};

