import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, StepButton, Button, Typography } from '@mui/material';

// Step titles
const labels = ['基礎情報の入力', '財産の入力', '分割情報、小規模宅地等の特例の入力', '贈与・各種控除', '申告書の印刷'];
const PageStepper = ({activeStep}) => {  
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

export default PageStepper;
