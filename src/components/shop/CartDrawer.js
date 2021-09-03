import React, { useContext } from 'react';
import { ListGroup, Offcanvas, Button } from 'react-bootstrap';

import { CartContext } from '../../context/CartProvider';
import QtyField from './QtyField';

const CartDrawer = () => {
  const { loading, error, cart, updateCartQty, drawerOpen, closeDrawer } =
    useContext(CartContext);

  const handleQtyChange = (e, newValue, item) => {
    updateCartQty(item.product, newValue, item.note, false);
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
        <Offcanvas.Title className='fs-2'>My Basket</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='p-0'>
        <hr className='m-0' />
        <div className='h-100 d-flex flex-column justify-content-between'>
          <div className='p-3'>
            {!cart || cart.items.length === 0 ? (
              <span className='text-muted mx-auto display-6'>
                There no items in your basket
              </span>
            ) : (
              <>
                <ListGroup variant='flush'>
                  {cart.items.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      <div className='d-flex justify-content-between'>
                        <span className='fs-3'>{item.name}</span>
                        <div className='fs-4 text-muted'>
                          {item.line_total_formatted}
                        </div>
                      </div>
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
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </>
            )}
          </div>
          {cart && cart.items.length > 0 && (
            <div>
              <hr className='m-0' />
              <div className='d-grid gap-2 p-4'>
                <div className='d-flex justify-content-between'>
                  <div className='fs-2 fw-bold'>Total</div>
                  <div className='fs-3 text-muted'>{cart.total_formatted}</div>
                </div>
                <Button size='lg' variant='primary'>
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartDrawer;
