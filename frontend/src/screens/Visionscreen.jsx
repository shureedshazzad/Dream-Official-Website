import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

function Visionscreen() {
  return (
    <Container fluid className="py-5" style={{ backgroundColor: 'white' }}>
    <Row className="justify-content-center wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
      <Col md={8} className="text-center">
        <h1 className="display-4 mb-4">Lifeline Crimson: KUET's Beacon of Hope Blood Donation Club</h1>
        <p className="lead mb-5" style={{ fontSize: '1.3rem', color: '#333' }}>
          Embark on a journey of compassion and community impact with Lifeline Crimson, the pulsating heart of blood donation at Khulna University of Engineering and Technology (KUET). Comprising passionate students committed to saving lives, this club stands as a beacon of hope and unity within the university.
          <br /><br />
          Dedicated to the noble cause of bridging the gap between blood donors and recipients, Lifeline Crimson orchestrates regular blood donation drives, awareness campaigns, and educational initiatives. Our club is not just a group of donors; it's a community fostering a culture of empathy and selflessness.
          <br /><br />
          With state-of-the-art facilities and a team of enthusiastic volunteers, Lifeline Crimson ensures a seamless and positive blood donation experience. By joining our club, you become part of a movement that transcends individual contributions, making a collective impact on the well-being of our community.
          <br /><br />
          Join Lifeline Crimson today and be a vital part of KUET's compassionate legacy, where every drop of blood donated becomes a beacon of hope for those in need. Together, we make a difference, one drop at a time.
        </p>
      </Col>
      <Col md={4} className="d-none d-md-block">
        {/* Place your image here */}
        <img
          src="/images/vision.jpg"
          alt="Lifeline Crimson Image"
          className="img-fluid rounded"
        />
      </Col>
    </Row>
  </Container>
  )
}

export default Visionscreen