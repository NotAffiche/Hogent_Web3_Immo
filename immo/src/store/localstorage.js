export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState == null) {
            return undefined;
        }
        return JSON.parse(serializedState); 
    } catch (error) {
        console.log("Error while loading.");
    }
}

export const saveState = (state) => {
    try {
        const serialized = JSON.stringify(state);
        localStorage.setItem("state", serialized);
    } catch (error) {
        console.log("Error while saving.");
    }
}