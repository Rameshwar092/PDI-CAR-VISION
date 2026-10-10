// Text of the Privacy Policy and Terms & Conditions pages.
// Edit the wording here; the pages are built from this file (src/components/LegalPage.jsx).
import { CONTACT } from './data.js';

const COMPANY = 'PDI CarVision';
const EMAIL = CONTACT.email;

export const UPDATED = '10 October 2026';

export const PRIVACY = {
  title: 'Privacy Policy',
  intro: [
    `This Privacy Policy is an electronic record in the form of an electronic contract in terms of the Indian Information Technology Act, 2000, and the rules made thereunder (as amended from time to time). It does not require any physical signature or seal. This Privacy Policy constitutes a legal agreement between you, as a user of our platform, and ${COMPANY}, as the owner of the platform. You must be a natural person who is at least 18 years of age.`,
    'Please read this Privacy Policy carefully. By accessing or using our platform, services, or products, you indicate that you understand, agree, and consent to this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use our platform or services.',
    `The terms "We", "Us" and "Our" refer to ${COMPANY}, and "You", "Your" or "User" refer to the users of our platform. ${COMPANY} is committed to safeguarding your privacy. This Privacy Policy explains how ${COMPANY} collects, uses, shares and processes your information through its platform, and your choices for managing your information.`,
  ],
  sections: [
    {
      h: 'Information collection',
      p: `${COMPANY} collects data through various means, including log files, cookies, forms, transactions, customer support interactions, and other tracking technologies. The types of data we collect include:`,
      list: [
        ['Device and browser information', 'IP address, browser type, operating system, screen dimensions, device brand and model, internet service provider, and session duration.'],
        ['Usage data', 'Information on how you interact with our platform, including timestamps, login frequency, account activity, features used, referral sources, and browsing patterns.'],
        ['Mobile number verification', 'When you log in to view your PDI report, your mobile number is verified with a one-time password (OTP) sent by SMS through Google Firebase Authentication.'],
        ['Vehicle information', 'Registration details, manufacturer, model, variant, fuel type, transmission type, engine size, insurance details, odometer readings, accident history, service records, warranty status, recall information, and the inspection report and photos of your vehicle.'],
        ['Personal information', 'Full name, contact details, address, email ID, date of birth, gender, occupation, driving licence details, and identification proof.'],
        ['Transaction and payment information', 'Billing details, credit/debit card information, UPI IDs, transaction history, payment preferences, and invoicing data.'],
        ['Third-party information', 'Data collected from linked accounts or third-party service providers, including publicly available data and preferences shared through integrations.'],
      ],
    },
    {
      h: 'Use of information',
      p: 'We use your personal information for the following purposes:',
      list: [
        ['Service provisioning', 'To carry out vehicle inspections, pre-delivery checks, maintenance reminders, and other automobile-related services, and to give you access to your PDI reports.'],
        ['Customer support', 'To respond to inquiries, process requests, provide troubleshooting assistance, and offer service updates.'],
        ['Transactions and billing', 'To facilitate bookings, process payments, generate invoices, and send transaction confirmations.'],
        ['Service improvement', 'To enhance platform functionality, improve efficiency, analyse trends, conduct research, and personalise user experiences.'],
        ['Marketing and promotions', 'To send newsletters, offers, and promotional campaigns (with an option to opt out at any time).'],
        ['Fraud prevention and security', 'To detect and prevent fraudulent activities, unauthorised access, and misuse of the platform.'],
        ['Legal and compliance requirements', 'To comply with applicable laws, enforce policies, and assist regulatory authorities when required.'],
      ],
    },
    {
      h: 'Sharing of personal information',
      p: `${COMPANY} may share user data in the following scenarios:`,
      list: [
        ['Service providers and business partners', 'To facilitate inspections, repairs, and other automobile-related services through third-party workshops, insurers, and vehicle manufacturers, and with technology providers that host our platform and send OTP messages.'],
        ['Law enforcement and government agencies', 'If required by applicable laws, court orders, or legal processes.'],
        ['Mergers and acquisitions', 'In the event of a business transition such as a merger, acquisition, restructuring, or asset sale.'],
        ['Analytics and advertising partners', 'To analyse platform performance, personalise advertisements, and measure marketing effectiveness (subject to user consent).'],
      ],
      after: 'We do not sell or rent personal information to third parties for their marketing purposes.',
    },
    {
      h: 'Cookies and tracking technologies',
      p: 'Our platform uses cookies, web beacons, and tracking technologies to:',
      bullets: [
        'Store user preferences and authentication details.',
        'Analyse user behaviour and optimise platform functionality.',
        'Deliver personalised advertisements and measure ad performance.',
        'Enhance website security and fraud detection mechanisms.',
      ],
      after: 'Users can manage cookie preferences through browser settings. However, disabling cookies may impact certain features.',
    },
    {
      h: 'Data security and retention',
      p: 'We employ industry-standard security measures, including encryption, firewalls, and secure access controls, to protect user data. Personal information is retained for as long as necessary for legitimate business purposes or as required by applicable laws and regulatory guidelines.',
    },
    {
      h: 'User rights',
      p: 'Users have the right to:',
      list: [
        ['Access and update information', 'Review, correct, or update their personal details.'],
        ['Request data deletion', 'Request removal of personal information, subject to legal limitations.'],
        ['Opt out of marketing', 'Unsubscribe from promotional communications.'],
        ['Withdraw consent', 'Revoke consent for data processing where applicable.'],
      ],
      after: `Requests related to personal data can be sent to ${EMAIL}.`,
    },
    {
      h: 'Third-party services',
      p: `${COMPANY} may include links to third-party platforms. We are not responsible for their data practices. Users should review third-party privacy policies before sharing information.`,
    },
    {
      h: 'Changes to this Privacy Policy',
      p: 'We may update this Privacy Policy periodically. Any changes will be posted on our platform with the updated effective date. Users are encouraged to review the policy regularly.',
    },
    {
      h: 'Contact us',
      p: `For any questions or concerns regarding this Privacy Policy, please contact us at ${EMAIL} or call ${CONTACT.phone}.`,
    },
  ],
};

export const TERMS = {
  title: 'Terms & Conditions',
  intro: [
    'These terms cover booking confirmation, attendance rules, waiting charges and appointment commitments for PDI (pre-delivery inspection) services booked with PDI CarVision.',
  ],
  sections: [
    {
      h: '1. Advance booking: no refund',
      p: 'All advance booking payments are strictly non-refundable once the PDI booking has been confirmed.',
    },
    {
      h: '2. Customer / vehicle delay',
      p: 'If the PDI expert reaches the designated location at the scheduled time, but the vehicle is not available or the customer is unable to provide the vehicle for inspection on time, the full PDI service fee will be payable.',
    },
    {
      h: '3. Waiting charges',
      p: 'If the PDI expert is required to wait due to the customer’s delay or the vehicle not being ready, an additional waiting charge of ₹500 will apply for every 30 minutes of waiting.',
    },
    {
      h: '4. Vehicle availability',
      p: 'The customer is responsible for ensuring that the vehicle is available at the agreed location and scheduled time for the inspection.',
    },
    {
      h: '5. Delay in scheduled appointment',
      p: 'Any delay caused by the customer, the dealership, or unavailability of the vehicle may result in applicable waiting charges. The PDI expert will not be responsible for delays caused by circumstances beyond their control.',
    },
    {
      h: '6. EV-specific limitations',
      p: 'For electric vehicles, battery units and high-voltage systems are not opened or tested. Inspections are conducted only on externally visible and safe-to-check components. No high-voltage system testing is performed.',
    },
    {
      h: '7. Payment process',
      p: 'After the advance booking payment, the remaining payment must be made online.',
    },
    {
      h: '8. Acceptance of terms',
      p: 'By confirming the PDI booking, the customer acknowledges that they have read, understood and agreed to these Terms & Conditions.',
    },
  ],
};