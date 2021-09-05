import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

// TODO: implement string, text, and checkbox options
function ProductOptions({ options, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return options.map((option, idx) => (
    <div key={idx}>
      <Form>
        <Form.Label>
          <h4>{option.name}</h4>
          <p className='mb-0 fs-6'>{option.description}</p>
        </Form.Label>
        <fieldset>
          <Form.Group onChange={handleChange}>
            {option.options.map((opt, optIdx) => (
              <Form.Check
                id={`option-${optIdx}`}
                key={optIdx}
                type='radio'
                name={option.slug}
                value={opt.value}
                radioGroup={option.slug}
                label={opt.label}
                defaultChecked={opt.selected}
              />
            ))}
          </Form.Group>
        </fieldset>
      </Form>
    </div>
  ));
}

export const ProductOptionsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
        selected: PropTypes.bool.isRequired,
      })
    ),
  })
);

ProductOptions.propTypes = {
  options: ProductOptionsPropTypes.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProductOptions;
