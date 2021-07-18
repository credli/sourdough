import React from 'react';
import { Col, Row, Form, Button, Card } from 'react-bootstrap';

import { newsletterRow } from './Newsletter.module.scss';

function Newsletter() {
  return (
    <div className={`${newsletterRow}`}>
      <Row className='g-0'>
        <Col xs={0} lg={3}></Col>
        <Col xs={12} lg={6} className='p-3 p-lg-5'>
          <Card className='rounded-3 shadow-lg p-5 bg-light'>
            <Form>
              <h2>Subscribe to our Newsletter</h2>
              <p>
                Enjoy baking tips and delicious recipes delivered to your
                mailbox
              </p>
              <div className='form-floating mb-3'>
                <Form.Control id='nameInput' type='text' size='lg' />
                <Form.Label htmlFor='nameInput'>Your name</Form.Label>
              </div>
              <div className='form-floating mb-3'>
                <Form.Control id='emailInput' type='text' size='lg' />
                <Form.Label htmlFor='emailInput'>Email address</Form.Label>
              </div>
              <Button type='submit' size='lg'>
                Subscribe
              </Button>
            </Form>
          </Card>
        </Col>
        <Col xs={0} lg={3}></Col>
      </Row>
    </div>
  );
}

export default Newsletter;
