import React, { useState } from 'react';

// Utility functions for validation
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

const validateName = (name) => {
  return /^[a-zA-Z\s]+$/.test(name);
};

// StepSettings component
const StepSettings = ({ name, email, label, updateParent }) => {
  return (
    <div>
      <h4>Step Settings</h4>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Label: {label}</p>
      <button onClick={() => updateParent({ /* updated info */ })}>
        Add Recipient
      </button>
    </div>
  );
};

// StepsComponent
const StepsComponent = ({ step, index, removeStep, toggleStepSettings, updateParent }) => {
  const { name, email, label } = step;
  const [isValid, setIsValid] = useState(true);

  const validate = () => {
    if (validateName(name) && validateEmail(email)) {
      setIsValid(true);
      updateParent(true);
    } else {
      setIsValid(false);
      updateParent(false);
    }
  };

  return (
    <div>
      <h3>Step {index + 1}</h3>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <button onClick={() => removeStep(index)}>Remove</button>
      <button onClick={() => toggleStepSettings(index)}>Settings</button>
      {isValid ? "Valid" : "Invalid"}
      <button onClick={validate}>Validate</button>
    </div>
  );
};

// RouteBuilder
const RouteBuilder = () => {
  const [steps, setSteps] = useState([
    { name: 'John', email: 'john@example.com', label: 'Step 1' },
    // Add more steps as needed
  ]);
  const [isValid, setIsValid] = useState(true);

  const updateStepValid = (stepIsValid) => {
    setIsValid(stepIsValid);
  };

  const removeStep = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const toggleStepSettings = (index) => {
    // Logic to toggle settings
  };

  const updateParent = (updatedInfo) => {
    // Logic to update step with new recipient, settings, etc.
  };

  return (
    <div>
      <h2>Route Builder</h2>
      {steps.map((step, index) => (
        <StepsComponent
          key={index}
          step={step}
          index={index}
          removeStep={removeStep}
          toggleStepSettings={toggleStepSettings}
          updateParent={updateStepValid}
        />
      ))}
      <button disabled={!isValid}>Continue / Submit</button>
    </div>
  );
};

export default RouteBuilder;


/*
function App() {
  return (
    <div className="App">
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </div>
  );
}

export default App;
*/