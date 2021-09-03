import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

import {
  qtyField,
  qtyFieldInput,
  qtyFieldButton,
} from './QtyField.module.scss';

const QtyField = ({ loading, value, onChange, className = '' }) => {
  return (
    <InputGroup size='sm' className={`${qtyField} ${className}`}>
      <Button
        disabled={loading}
        className={qtyFieldButton}
        variant='outline-primary'
        onClick={(e) => onChange(e, -1)}
      >
        <i className='bi bi-dash fw-bold fs-5' />
      </Button>
      <FormControl
        className={`${qtyFieldInput}`}
        disabled={loading}
        value={value}
        min='1'
        max='99'
        readOnly
      />
      <Button
        className={qtyFieldButton}
        disabled={loading}
        variant='outline-primary'
        onClick={(e) => onChange(e, 1)}
      >
        <i className='bi bi-plus fw-bold fs-5' />
      </Button>
    </InputGroup>
  );
};

QtyField.propTypes = {
  loading: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default QtyField;
