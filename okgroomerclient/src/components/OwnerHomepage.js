import React from "react";
import groomerPhoto1 from "../images/groomer-female-1.jpg"
import groomerPhoto2 from "../images/groomer-female-2.jpg"
import groomerPhoto3 from "../images/groomer-male-1.jpg"
import groomerPhoto4 from "../images/groomer-male-2.jpg"
import { Card, CardBody, CardText, CardTitle } from "reactstrap";

export const OwnerHomePage = () => {

  return <React.Fragment>
    <div className="owner-homepage">
      <div className="groomers-about">
        <div className="groomer-card">
          <Card>
            <CardBody>
              <CardTitle tag="h5">
                Kate
              </CardTitle>
            </CardBody>
            <img
              className="card-img"
              alt="Card cap"
              src={groomerPhoto1}
              width="100%"
            />
            <CardBody>
              <CardText className="groomer-text">
                Grooming for 5 years <br />
                Hates avacado toast <br />
                Has 2 retired K-9 German Shepherds
              </CardText>
            </CardBody>
          </Card>
        </div>
        <div className="groomer-card">
          <Card>
            <CardBody>
              <CardTitle tag="h5">
                Stephen
              </CardTitle>
            </CardBody>
            <img
              className="card-img"
              alt="Card cap"
              src={groomerPhoto3}
              width="100%"
            />
            <CardBody>
              <CardText className="groomer-text">
                Grooming for 12 years <br />
                Sings Katy Perry to dogs as he works<br />
                Brings his dachshund to work in a backpack
              </CardText>
            </CardBody>
          </Card>
        </div>
        <div className="groomer-card">
          <Card>
            <CardBody>
              <CardTitle tag="h5">
                Jessica
              </CardTitle>
            </CardBody>
            <img
              className="card-img"
              alt="Card cap"
              src={groomerPhoto2}
              width="100%"
            />
            <CardBody>
              <CardText className="groomer-text">
                Grooming for 10 years<br />
                Grooms shelter dogs twice a month<br />
                Once broke up with a guy for calling her yorkie a cat
              </CardText>
            </CardBody>
          </Card>
        </div>
        <div className="groomer-card">
          <Card>
            <CardBody>
              <CardTitle tag="h5">
                Michael
              </CardTitle>
            </CardBody>
            <img
              className="card-img"
              alt="Card cap"
              src={groomerPhoto4}
              width="100%"
            />
            <CardBody>
              <CardText className="groomer-text">
                Grooming for 6 years<br />
                Has 2 retired greyhounds<br />
                Believes Homeward Bound is a documentary
              </CardText>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="about-section">
        <div className="about-us-section">
          <div className="about-us-title">
            <span className="about-us-title-text">
              About us
            </span>
          </div>
          <p className="about-us-p">We are passionate about grooming dogs and ensuring their well-being. We understand that our furry friends deserve the best care, and that's why we're committed to providing exceptional grooming services to keep your dogs looking and feeling their best.</p>
        </div>
        <div className="about-us-section">
          <div className="about-us-title">
            <span className="about-us-title-text">
              Experienced and Skilled Groomers
            </span>
          </div>
          <p className="about-us-p">At Ok, Groomer, we have a team of experienced and skilled groomers who are dedicated to providing personalized attention to every dog that comes through our doors. With a deep understanding of various breeds and their specific grooming requirements, we tailor our services to meet the unique needs of each individual dog.</p>
        </div>
        <div className="about-us-section">
          <div className="about-us-title">
            <span className="about-us-title-text">
              A Calm and Comfortable Environment
            </span>
          </div>
          <p className="about-us-p">Our salon is designed to create a calm and comfortable environment, ensuring that your dog feels safe and relaxed throughout the grooming process. We use only high-quality products that are gentle on their skin and coat, and our state-of-the-art equipment allows us to provide efficient and effective grooming sessions.</p>
        </div>
        <div className="about-us-section">
          <div className="about-us-title">
            <span className="about-us-title-text">
              Wide Range of Services
            </span>
          </div>
          <p className="about-us-p">Our services go beyond just basic grooming. We offer a wide range of grooming options to address specific needs, including breed-specific haircuts, baths, nail trims, ear cleaning, and more. Our groomers are skilled in handling dogs of all sizes, temperaments, and coat types, and we make sure to provide a positive and stress-free experience for each dog.</p>
        </div>
        <div className="about-us-section">
          <div className="about-us-title">
            <span className="about-us-title-text">
              Health, Safety, and Professionalism
            </span>
          </div>
          <p className="about-us-p">We prioritize the health and safety of the dogs in our care. Our team undergoes regular training and stays up to date with the latest grooming techniques and practices. We follow strict hygiene protocols to maintain a clean and sanitized environment, ensuring that your dog is in a healthy and hygienic space.</p>
        </div>
        <div className="about-us-section">
          <div className="about-us-title">
            <span className="about-us-title-text">
              Our Commitment to You and Your Dog
            </span>
          </div>
          <p className="about-us-p">We understand that every dog is unique, and we value the trust you place in us to care for your furry companion. Our goal is to establish a long-term relationship with both you and your dog, based on trust, professionalism, and exceptional service. We believe that a well-groomed dog is a happy dog, and we take pride in enhancing their appearance while promoting their overall well-being.</p>
        </div>
        <div className="about-us-section">
          <div className="about-us-title">
            <span className="about-us-title-text">
              Contact Us
            </span>
          </div>
          <p className="about-us-p">We look forward to meeting you and your dog at our grooming salon. Experience the difference our dedicated team can make in your dog's grooming journey. Setup an appointment today!</p>
        </div>
      </div>
    </div>
  </React.Fragment>
}