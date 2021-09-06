import React, { useContext } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { ListGroup, Offcanvas, Button } from 'react-bootstrap';

import { CartContext } from '../../context/CartProvider';
import useFetchedProduct from '../../hooks/useFetchedProduct';
import QtyField from './QtyField';

const Totals = ({ cart, onCheckout }) => {
  return (
    <>
      {cart && cart.items.length > 0 && (
        <div>
          <hr className='m-0' />
          <div className='d-grid gap-2 p-4'>
            <div className='d-flex justify-content-between'>
              <div className='fs-4 fw-bold'>Delivery</div>
              <div className='fs-5 text-muted text-uppercase'>
                Calculated at Checkout
              </div>
            </div>
            <div className='d-flex justify-content-between'>
              <div className='fs-2 fw-bold'>Total</div>
              <div className='fs-3 text-muted'>{cart.total_formatted}</div>
            </div>
            <Button size='lg' variant='primary' onClick={onCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const CartDrawer = () => {
  const { getProduct } = useFetchedProduct();
  const { loading, cart, updateCartQty, drawerOpen, closeDrawer, clearCart } =
    useContext(CartContext);

  const handleQtyChange = (e, newValue, item) => {
    updateCartQty(item.product, newValue, item.note, false);
  };

  const handleCheckout = () => {};

  const renderItemsCount = () => {
    const count =
      (cart &&
        cart.items.length > 0 &&
        cart.items.map((i) => i.qty).reduce((x, y) => x + y)) ||
      0;
    return (
      <>
        {cart && cart.items.length > 0 && (
          <span className='text-muted fw-light fs-5 ms-3'>
            {count} {`Item${count > 1 ? 's' : ''}`}{' '}
            <a
              className='text-reset fs-6 ms-1'
              href='#'
              onClick={(e) => {
                e.preventDefault();
                clearCart();
              }}
              role='button'
            >
              Clear
            </a>
          </span>
        )}
      </>
    );
  };

  return (
    <Offcanvas
      show={drawerOpen}
      onHide={() => {
        closeDrawer();
      }}
      placement='end'
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className='fs-2 d-flex align-items-center'>
          My Basket
          {renderItemsCount()}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='p-0 overflow-hidden d-flex flex-column justify-content-between'>
        <hr className='m-0' />
        <div className='h-100 overflow-scroll'>
          <div className='p-3'>
            {!cart || cart.items.length === 0 ? (
              <span className='text-muted mx-auto display-6'>
                There are no items in your basket
              </span>
            ) : (
              <>
                <ListGroup variant='flush'>
                  {cart.items.map((item, idx) => {
                    const fetchedProduct = getProduct(item.product);
                    return (
                      <ListGroup.Item key={idx}>
                        <div className='d-flex'>
                          <div>
                            <GatsbyImage
                              image={
                                fetchedProduct.image.childImageSharp
                                  .gatsbyImageData
                              }
                              alt={fetchedProduct.name}
                            />
                          </div>
                          <div className='fs-3 flex-grow-1 px-3'>
                            <div>{fetchedProduct.name}</div>
                            {item.note && (
                              <span className='text-muted fst-italic fs-5'>
                                {item.note}
                              </span>
                            )}
                            <QtyField
                              loading={loading}
                              className='my-2'
                              value={item.qty}
                              onChange={(e, newValue) =>
                                handleQtyChange(e, newValue, item)
                              }
                            />
                          </div>
                          <div className='fs-4 text-muted flex-shrink-0'>
                            {item.line_total_formatted}
                          </div>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </>
            )}
          </div>
        </div>
        <Totals cart={cart} onCheckout={handleCheckout} />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartDrawer;
