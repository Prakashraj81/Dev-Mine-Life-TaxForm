import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, StepButton, Button, Typography } from '@mui/material';

// Step titles
const labels = ['入力', '確認', '出力'];
const StepForm = ({handleNext, activeStep, handleBack}) => {  
  const [formValues, setFormValues] = useState();
  const [formErrors, setFormErrors] = useState({});  

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set values
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));

    // set errors
    const error = formValidation(name, value, fieldsValidation) || "";

    setFormErrors({
      [name]: error
    });
  };

  let ActiveStepper = 0;
  const handleSteps = (activeStep) => {
    let step = activeStep;
    if (step === 0) {
      ActiveStepper = 0;
    } else if (step === 1) {
      ActiveStepper = 1;
    } else if (step === 2) {
      ActiveStepper = 2;
    } else {
      ActiveStepper = 3;
    }
    console.log("Stepper-active:" + ActiveStepper);
  };  

  return (
    <>
      {activeStep === labels.length ? (
        // Last Component
        // <Success values={formValues} />
        <></>
      ) : (
        <>         
          <Stepper
            activeStep={activeStep}
            alternativeLabel
          >
            {labels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {handleSteps(activeStep)}          
        </>
      )}
    </>
  );
};

export default StepForm;
