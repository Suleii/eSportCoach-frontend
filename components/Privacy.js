import React from 'react';
import styles from '../styles/Privacy.module.css'

const Privacy = () => {
  return (
    <div className="flex flex-col items-center">
    <div className='w-5/6 flex-1'>
      <h1 className="text-xl mb-4">Privacy Policy</h1>
      <p className='mb-10'>Welcome to Experience! Your privacy is important to us.</p>

      <h2 className="text-lg mt-4 mb-4">Information We Collect</h2>
      <p>
        We may collect and store personal information that you voluntarily provide to us when interacting with our website.
        
      </p>

      <h2 className="text-lg mt-4 mb-4">How We Use Your Information</h2>
      <p>
        We use the collected information to:
        <ul>
            <li>Provide and maintain our website's functionality.</li>
            <li>Send you updates, newsletters, or promotional materials with your consent.</li>
            <li>Respond to your inquiries or provide customer support.</li>
        </ul>
      </p>

      <h2 className="text-lg mt-4 mb-4">Data Security</h2>
      <p>
        We take appropriate measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.  However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
      </p>

      <h2 className="text-lg mt-4 mb-4">Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. Please note that we are not responsible for the privacy practices of these websites.
       
      </p>

      <h2 className="text-lg mt-4 mb-4">Updates to this Privacy Policy</h2>
      <p>
        We reserve the right to update or modify this Privacy Policy at any time. Please review this policy periodically for changes.
        
      </p>

      <p className='mt-10'>If you have any questions or concerns about our Privacy Policy, please contact us at <a>contact@email.com</a></p>
    </div>
    </div>
  );
};

export default Privacy;