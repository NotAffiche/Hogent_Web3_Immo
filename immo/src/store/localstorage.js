export const loadState = () => {
    try {
      const serializedState = localStorage.getItem("state");
      if (serializedState === null) {
        return {}; // Return an empty object instead of undefined
      }
      return JSON.parse(serializedState); 
    } catch (error) {
      console.log("Error loading state from localStorage.", error);
      return {}; // Return an empty object in case of an error
    }
  }

export const saveState = (state) => {
    try {
        const serialized = JSON.stringify(state); // String maken van object
        localStorage.setItem("state", serialized);
    } catch (error) {
        console.log("Fout in het opslaan van de state.");
    }
}