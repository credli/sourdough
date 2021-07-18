import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Badge, ListGroup } from 'react-bootstrap';

const CategoryItem = ({ name, slug, count, selected }) => (
  <ListGroup.Item
    as={Link}
    to={`/shop/${slug}`}
    active={selected}
    className='d-flex justify-content-between align-items-start'
  >
    <div className='ms-2 me-auto'>
      <div>{name}</div>
    </div>
    {count && <Badge className='rounded-pill bg-primary'>{count}</Badge>}
  </ListGroup.Item>
);

function CategorySelector({ categories, selectedCategory }) {
  return (
    <div>
      <h4>
        <span className='d-none d-lg-inline'>Product Categories</span>
        <a
          className='link-black text-decoration-none text-reset d-flex d-lg-none justify-content-between'
          type='button'
          data-bs-toggle='collapse'
          href='#categories-list'
        >
          Product Categories
          <i className='bi bi-chevron-down' />
        </a>
      </h4>
      <ListGroup id='categories-list' className='collapse d-lg-block pb-4'>
        {categories.map((category, idx) => (
          <CategoryItem
            key={idx}
            name={category.name}
            slug={category.slug}
            count={category.count}
            selected={category.slug === selectedCategory}
          />
        ))}
      </ListGroup>
    </div>
  );
}

CategorySelector.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      count: PropTypes.number,
    })
  ).isRequired,
  selectedCategory: PropTypes.string,
};

export default CategorySelector;
