import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

export const OwnerHomePage = () => {

  return <>
    <div className="about-section">
      <Card className="about-us-section">
        <CardTitle className="about-us-title">About us</CardTitle>
        <CardBody className="about-us-p">We are passionate about grooming dogs and ensuring their well-being. We understand that our furry friends deserve the best care, and that's why we're committed to providing exceptional grooming services to keep your dogs looking and feeling their best.</CardBody>
      </Card>
      <Card className="about-us-section">
        <CardTitle className="about-us-title">Experienced and Skilled Groomers</CardTitle>
        <CardBody className="about-us-p">At Ok, Groomer, we have a team of experienced and skilled groomers who are dedicated to providing personalized attention to every dog that comes through our doors. With a deep understanding of various breeds and their specific grooming requirements, we tailor our services to meet the unique needs of each individual dog.</CardBody>
      </Card>
      <Card className="about-us-section">
        <CardTitle className="about-us-title">A Calm and Comfortable Environment</CardTitle>
        <CardBody className="about-us-p">Our salon is designed to create a calm and comfortable environment, ensuring that your dog feels safe and relaxed throughout the grooming process. We use only high-quality products that are gentle on their skin and coat, and our state-of-the-art equipment allows us to provide efficient and effective grooming sessions.</CardBody>
      </Card>
      <Card className="about-us-section">
        <CardTitle className="about-us-title">Wide Range of Services</CardTitle>
        <CardBody className="about-us-p">Our services go beyond just basic grooming. We offer a wide range of grooming options to address specific needs, including breed-specific haircuts, baths, nail trims, ear cleaning, and more. Our groomers are skilled in handling dogs of all sizes, temperaments, and coat types, and we make sure to provide a positive and stress-free experience for each dog.</CardBody>
      </Card>
      <Card className="about-us-section">
        <CardTitle className="about-us-title">Health, Safety, and Professionalism</CardTitle>
        <CardBody className="about-us-p">We prioritize the health and safety of the dogs in our care. Our team undergoes regular training and stays up to date with the latest grooming techniques and practices. We follow strict hygiene protocols to maintain a clean and sanitized environment, ensuring that your dog is in a healthy and hygienic space.</CardBody>
      </Card>
      <Card className="about-us-section">
        <CardTitle className="about-us-title">Our Commitment to You and Your Dog</CardTitle>
        <CardBody className="about-us-p">We understand that every dog is unique, and we value the trust you place in us to care for your furry companion. Our goal is to establish a long-term relationship with both you and your dog, based on trust, professionalism, and exceptional service. We believe that a well-groomed dog is a happy dog, and we take pride in enhancing their appearance while promoting their overall well-being.</CardBody>
      </Card>
      <Card className="about-us-section">
        <CardTitle className="about-us-title">Contact Us</CardTitle>
        <CardBody className="about-us-p">We look forward to meeting you and your dog at our grooming salon. Experience the difference our dedicated team can make in your dog's grooming journey. Setup an appointment today!</CardBody>
      </Card>
    </div>
  </>
}