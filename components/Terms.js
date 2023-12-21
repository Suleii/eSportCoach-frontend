import React from 'react';
import styles from '../styles/Privacy.module.css'

const PrivacyPage = () => {
  return (
    <div className="flex flex-col items-center ">
    <div className='w-5/6 flex-1'>
      <h1 className="text-xl mb-4">Terms and Conditions</h1>

      <h2 className="text-lg mt-4 mb-4">1. Acceptance of Terms</h2>
      <p>
      By accessing and using the services provided by Experience, you agree to abide by these terms and conditions. If you do not agree with any part of these terms, please refrain from using our services.
      </p>

      <h2 className="text-lg mt-4 mb-4">2. Coaching Services</h2>
      <p>
      Experience offers esports coaching services to improve your gaming skills. Sessions are tailored to meet individual needs. We strive to provide quality coaching, but results may vary depending on the effort and commitment of the user.
      </p>

      <h2 className="text-lg mt-4 mb-4">3. Scheduling and Payments</h2>
      <p>
      Coaching sessions can be scheduled through our website. Payments are required in advance to confirm a coaching session. 
      </p>

      <h2 className="text-lg mt-4 mb-4">4. Code of Conduct</h2>
      <p>
      Users are expected to maintain a respectful and positive attitude during coaching sessions. Harassment, discrimination, or any form of inappropriate behavior will not be tolerated. Coaches reserve the right to terminate a session if a user violates the code of conduct. 
      </p>

      <h2 className="text-lg mt-4 mb-4">5. Disclaimer</h2>
      <p>
      We are not responsible for any consequences resulting from the use of coaching services. We do not guarantee specific outcomes or success in esports competitions. Users acknowledge that gaming involves inherent risks, and Experience is not liable for any damages or losses.
      </p>

      <h2 className="text-lg mt-4 mb-4">6. Privacy Policy</h2>
      <p>
      Our <span className='text-accent cursor-pointer'><a href="/privacy">privacy policy</a></span> outlines how we collect, use, and protect your personal information. By using our services, you agree to the terms outlined in our privacy policy.
      </p>

      <h2 className="text-lg mt-4 mb-4">7. Termination of Services</h2>
      <p>
      Experience reserves the right to terminate coaching services for any user who violates these terms and conditions. Refunds may not be provided in such cases.
      </p>

      <h2 className="text-lg mt-4 mb-4">8. Modifications to Terms</h2>
      <p>
      We may update these terms and conditions at any time. Users are responsible for regularly reviewing the terms. Continued use of our services after changes constitutes acceptance of the modified terms.
      </p>

      <h2 className="text-lg mt-4 mb-4">9. Contact information</h2>
      <p>
      For any questions or concerns regarding these terms and conditions, please contact us throught our <span className="text-accent cursor-pointer"><a href="/contact">contact page</a></span> .
      </p>

      <p className='mt-10'>By using our esports coaching services, you agree to these terms and conditions.</p>
    </div>
    </div>
  );
};

export default PrivacyPage;