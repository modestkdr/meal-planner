## Recommended React-Flux Directory Structure

1. Helper functions should take care of any necessary jQuery logic, keeping the component clean and understandable.  These will live inside a helpers/ directory within the component directory.  Each component will have its own helpers module as required.

2. Complex components should have a README.md file within it’s initial parent/sub-parent directory. This file will explain in detail the API required parameters that it needs to function properly.
URLs need to be specific, whether they provide data, used for getting data, etc. Use proper names to differentiate both, and include how the data should be structured.

3. Complex components should have their own Flux architecture within the parent Flux architecture.  This is because sub-components could have inside actions that no other component should care about, keeping both modularity and and privacy within the component structure.  Each component will be given a callback as a prop IF the component is expected to ‘publish’ or export an object, array or state variable to the parent component.

5. The **most important**, crucial reason for elaborating sub-Flux patterns with complex components is because of the Dispatcher.  The Dispatcher registers the callbacks to fire per action; it cannot handle multiple actions at the same time - it **will** break: *Cannot dispatch in the middle of a dispatch.*  Giving components their own dispatcher removes this problem as they will handle their own actions without bothering the other components.  This is, of course, if the component *needs* Flux, which is not always the case.

## Tree Structure

```
+ jsx/
    |-- README.md
    |-- Main.jsx
    +-- actions/
        \-- MainActions.js
    +-- components/
        +-- ...
        +-- ComponentName/
        +-- ComponentName/
        +-- ComponentName/
            |-- README.md
            |-- ComponentName.jsx
            +-- actions/
                \-- ComponentNameActions.js
            +-- components/
                |-- SubComponentName.jsx
                |-- SubComponentName.jsx
                +-- SubComponentName/
                    |-- README.md
                    |-- SubComponentName.jsx
                    +-- actions/
                        \-- SubComponentNameActions.js
                    +-- components/
                        \-- ...
                    +-- constants/
                        \-- SubComponentNameConstants.js
                    +-- dispatcher/
                        \-- SubComponentNameDispatcher.js
                    +-- helpers/
                        \-- SubComponentNameHelpers.js
                    +-- stores/
                        \-- SubComponentNameStore.js
                \-- ...
            +-- constants/
                \-- ComponentNameConstants.js
            +-- dispatcher/
                \-- ComponentNameDispatcher.js
            +-- helpers/
                \-- ComponentNameHelpers.js
            +-- stores/
                \-- ComponentNameStore.js
  +-- constants/
      \-- MainConstants.js
  +-- dispatcher/
      \-- MainDispatcher.js
  +-- helpers/
      \-- MainHelpers.js
  +-- dispatcher/
      \-- MainStore.js
```
