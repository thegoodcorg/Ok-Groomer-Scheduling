import React, { useEffect, useState } from "react";
import { getMyDogs } from "../Modules/DogManager";
import { me } from "../Modules/authManager";
import { Link } from "react-router-dom";
import corgibath from "../images/corgibath.jpg"
import Header from "../Header";

export const OwnerHomePage = () => {

    const [myDogs, setMyDogs] = useState([])
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        me().then((res) => {
            setUserProfile(res);
        }
        );
    }, [])



    useEffect(() => {
        if (userProfile.id) {
            getMyDogs(userProfile.id)
                .then((res) => {
                    setMyDogs(res)
                })
        }
    }, [userProfile])

    return <>
        <div className="about-section">
        <section className="about-us-section">
      <p className="about-us-p">We are passionate about grooming dogs and ensuring their well-being. We understand that our furry friends deserve the best care, and that's why we're committed to providing exceptional grooming services to keep your dogs looking and feeling their best.</p>
    </section>
    <section className="about-us-section">
      <h2>Experienced and Skilled Groomers</h2>
      <p className="about-us-p">At Ok, Groomer, we have a team of experienced and skilled groomers who are dedicated to providing personalized attention to every dog that comes through our doors. With a deep understanding of various breeds and their specific grooming requirements, we tailor our services to meet the unique needs of each individual dog.</p>
    </section>
    <section className="about-us-section">
      <h2>A Calm and Comfortable Environment</h2>
      <p className="about-us-p">Our grooming salon is designed to create a calm and comfortable environment, ensuring that your dog feels safe and relaxed throughout the grooming process. We use only high-quality products that are gentle on their skin and coat, and our state-of-the-art equipment allows us to provide efficient and effective grooming sessions.</p>
    </section>
    <section className="about-us-section">
      <h2>Wide Range of Services</h2>
      <p className="about-us-p">Our services go beyond just basic grooming. We offer a wide range of grooming options to address specific needs, including breed-specific haircuts, baths, nail trims, ear cleaning, and more. Our groomers are skilled in handling dogs of all sizes, temperaments, and coat types, and we make sure to provide a positive and stress-free experience for each dog.</p>
    </section>
    <section className="about-us-section">
      <h2>Health, Safety, and Professionalism</h2>
      <p className="about-us-p">We prioritize the health and safety of the dogs in our care. Our team undergoes regular training and stays up to date with the latest grooming techniques and practices. We follow strict hygiene protocols to maintain a clean and sanitized environment, ensuring that your dog is in a healthy and hygienic space.</p>
    </section>
    <section className="about-us-section">
      <h2>Our Commitment to You and Your Dog</h2>
      <p className="about-us-p">We understand that every dog is unique, and we value the trust you place in us to care for your furry companion. Our goal is to establish a long-term relationship with both you and your dog, based on trust, professionalism, and exceptional service. We believe that a well-groomed dog is a happy dog, and we take pride in enhancing their appearance while promoting their overall well-being.</p>
    </section>
    <section className="about-us-section">
      <h2>Contact Us</h2>
      <p className="about-us-p">We look forward to meeting you and your dog at our grooming salon. Experience the difference our dedicated team can make in your dog's grooming journey. Setup an appointment today!</p>
    </section>
        </div>
    </>
}