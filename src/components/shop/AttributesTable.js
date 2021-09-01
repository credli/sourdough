import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AttributesTable({ attributes }) {
  return (
    <Table striped>
      <tbody>
        {attributes.map((attribute, idx) => (
          <tr key={idx}>
            <td className='fw-bold'>{attribute.title}</td>
            <td>
              {attribute.details.indexOf(' | ') > -1 ? (
                <ul className='mb-0 ps-3'>
                  {attribute.details.split(' | ').map((opt, optIdx) => (
                    <li key={optIdx}>{opt}</li>
                  ))}
                </ul>
              ) : (
                attribute.details
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
      title: PropTypes.string,
      details: PropTypes.string,
    })
  ),
};

export default AttributesTable;
