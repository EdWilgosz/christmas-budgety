import React from 'react';
import classes from './Error.module.css';

const Error = props => {

return <p className={classes.Error}>{props.errorMessage}</p>

}

export default Error;