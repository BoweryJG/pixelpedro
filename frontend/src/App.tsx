import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { supabase } from './supabaseClient';

interface Testimonial {
  id: number;
  name: string;
  quote: string;
}

function App() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*');
    if (data) {
      setTestimonials(data);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormValues(prevValues => ({ ...prevValues, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('consultation_requests')
      .insert([formValues]);
    if (error) {
      alert('Error submitting form: ' + error.message);
    } else {
      alert('Form submitted successfully!');
      setFormValues({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <div className="App">
      <header>
        <Navbar bg="light" expand="lg" fixed="top">
          <Container>
            <Navbar.Brand href="#home">Staten Island TMJ</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#about">About Us</Nav.Link>
                <Nav.Link href="#treatments">Treatments</Nav.Link>
                <Nav.Link href="#testimonials">Testimonials</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main style={{ paddingTop: '56px' }}>
        <Container>
          <section id="home" className="py-5 text-center">
            <h1>Welcome to Staten Island TMJ</h1>
            <p className="lead">Your journey to a pain-free life starts here.</p>
          </section>

          <section id="about" className="py-5">
            <h2>About Us</h2>
            <p>
              We are dedicated to providing the highest quality of care for patients suffering from TMJ disorders. Our team is led by Dr. John Doe, a renowned specialist in the field.
            </p>
          </section>

          <section id="treatments" className="py-5">
            <h2>Treatments</h2>
            <Row>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Diagnosis</Card.Title>
                    <Card.Text>
                      We use the latest technology to accurately diagnose your TMJ condition.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Non-Surgical Treatments</Card.Title>
                    <Card.Text>
                      A variety of non-surgical options are available to relieve your pain.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Surgical Treatments</Card.Title>
                    <Card.Text>
                      For severe cases, we offer advanced surgical solutions.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>

          <section id="testimonials" className="py-5">
            <h2>Testimonials</h2>
            {testimonials.length > 0 ? (
              testimonials.map(testimonial => (
                <Card key={testimonial.id} className="mb-3">
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>{testimonial.quote}</p>
                      <footer className="blockquote-footer">
                        {testimonial.name}
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No testimonials yet.</p>
            )}
          </section>

          <section id="contact" className="py-5">
            <h2>Request a Consultation</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" value={formValues.name} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={formValues.email} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter your phone number" value={formValues.phone} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} value={formValues.message} onChange={handleInputChange} />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </section>
        </Container>
      </main>

      <footer className="py-4 bg-light">
        <Container className="text-center">
          <p>&copy; 2025 Staten Island TMJ. All Rights Reserved.</p>
        </Container>
      </footer>
    </div>
  );
}

export default App;