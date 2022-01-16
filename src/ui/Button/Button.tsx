//@ts-nocheck
import React from 'react';
import './Button.css';

//JSX.Element
const Button = ({ text, onClick }) => {
  return <button className="button" onClick={onClick}>{text}</button>;
};

export default Button;
