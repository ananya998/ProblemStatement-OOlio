import React, { useState } from 'react';
import AppCSS from './App.module.css';


const InputForm: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  
 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Process the input value here
    console.log('Submitted value:', inputValue);
    // Reset the input value
    setInputValue('');
   
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text"  placeholder="CompanyName" value={inputValue} onChange={handleChange} className={AppCSS.container}/>
      <button type="submit" className={AppCSS.cusButton}>CheckOut</button>
    </form>
  );
};

export default InputForm;
