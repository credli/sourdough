import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AttributesTable({ attributes }) {
  return (
    <Table striped>
      <tbody>
        {attributes
          .filter((a) => !!a.name)
          .map((attribute, idx) => (
            <tr key={idx}>
              <td className='fw-bold'>{attribute.name}</td>
              <td>
                {attribute.options.length > 1 ? (
                  <ul className='mb-0 ps-3'>
                    {attribute.options.map((opt, optIdx) => (
                      <li key={optIdx}>{opt}</li>
                    ))}
                  </ul>
                ) : (
                  attribute.options[0]
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

AttributesTable.propTypes = {
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};

export default AttributesTable;
