import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Addons({ addons }) {
  return addons.map((addon, idx) => (
    <div key={idx}>
      <Form>
        <Form.Label>
          <h4>{addon.label}</h4>
          <p className='mb-0 fs-6'>{addon.description}</p>
        </Form.Label>
        <fieldset>
          <Form.Group>
            {addon.options.map((opt, optIdx) => (
              <Form.Check
                id={`option-${optIdx}`}
                key={optIdx}
                type='radio'
                name={addon.id}
                radioGroup={addon.id}
                label={opt.name}
                defaultChecked={opt.default}
              />
            ))}
          </Form.Group>
        </fieldset>
      </Form>
    </div>
  ));
}

Addons.propTypes = {
  addons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          default: PropTypes.bool.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Addons;
