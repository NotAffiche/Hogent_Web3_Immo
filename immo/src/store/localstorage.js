export const loadState = () => {
  try {
      const serializedState = localStorage.getItem("state");
      if (serializedState == null) {
          return undefined;
      }
      return JSON.parse(serializedState); 
  } catch (error) {
      console.log("Fout in het laden van de state.");
  }
}

export const saveState = (state) => {
  try {
      const serialized = JSON.stringify(state);
      localStorage.setItem("state", serialized);
  } catch (error) {
      console.log("Fout in het opslaan van de state.");
  }
}