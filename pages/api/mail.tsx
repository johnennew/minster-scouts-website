// Send an email using SendGrid
export const config = { runtime: 'edge' };
import type { NextApiRequest, NextApiResponse } from 'next'
import {ContactFormInputs, ContactReason} from "../../types.global";
import sanitizeHtml from 'sanitize-html';
import emailValidator from 'deep-email-validator';
import sgMail from '@sendgrid/mail';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: ContactFormInputs;
}

type ResponseData = {
  message: string
}

type SendGridRequest = {
  to: {
    name: string;
    email: string;
  };
  from: {
    name: string;
    email: string;
  };
  replyTo: string;
  subject: string;
  text: string;
  html?: string;
};

type LeaderDetails = {
  name: string;
  email: string;
}

const getStringProcessVariable = (variableName: string): string => {
  const value = process.env[variableName];
  if (typeof value === "string" && value.length > 0) {
    return value;
  }
  throw "Invalid process variable " + variableName;
}

const getLeaderDetails = (reason: ContactReason):LeaderDetails => {
  /** replace all this with env variables */

  const beaversLeaderName = getStringProcessVariable('BEAVERS_LEADER_NAME');
  const cubsLeaderName = getStringProcessVariable('CUBS_LEADER_NAME');
  const scoutsLeaderName = getStringProcessVariable('SCOUTS_LEADER_NAME');

  const beaverLeaderEmail = getStringProcessVariable('BEAVERS_LEADER_EMAIL');
  const cubsLeaderEmail = getStringProcessVariable('CUBS_LEADER_EMAIL');
  const scoutsLeaderEmail = getStringProcessVariable('SCOUTS_LEADER_EMAIL');

  switch (reason) {
    case "beavers":   return {
      name: beaversLeaderName,
      email: beaverLeaderEmail
    }
    case "cubs": return {
      name: cubsLeaderName,
      email: cubsLeaderEmail
    }
    case "scouts": return {
      name: scoutsLeaderName,
      email: scoutsLeaderEmail
    }
  }

  throw "Bad reason";
}

const generateEmailMessage = (leaderDetails: LeaderDetails, contactName: string, contactEmail: string, contactPhone: string, contactMessage: string): SendGridRequest => {
  let date_time = new Date();

  let date = ("0" + date_time.getDate()).slice(-2);
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
  let year = date_time.getFullYear();
  let hours = date_time.getHours();
  let minutes = date_time.getMinutes();
  let seconds = date_time.getSeconds();

  const message = `This is a contact message sent from the Minster Scout website.
        
        From: ${contactName} ${contactEmail}
        Phone: ${contactPhone || "not given"}
        Time: ${year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds}
        Message:
        ${contactMessage}
        `;

  return {
    to: {
      name: leaderDetails.name,
      email: leaderDetails.email,
    },
    from: {
      name: "Minster Scout website",
      email: "no-reply@minsterscouts.org"
    },
    subject: "Scouts Contact enquiry from the website",
    text: message,
    replyTo: contactEmail,
  }
}

const cleanInput = (input: string) : string => {
  return sanitizeHtml(input);
}

const validateEmail = (email: string) => {
  if (!emailValidator(email)) {
    throw "Email address is invalid";
  }
}

const validateMessage = (message: string) => {
  if (message.length < 10) {
    throw "No message " + message;
  }
}

const validateAPI = (apikey: string | undefined): string => {
  if (typeof apikey === "string" && apikey.length > 60) {
    return apikey;
  }
  throw "Invalid API key " + apikey;
}

const validateReason = (reason: ContactReason): ContactReason => {
  if (reason !== 'beavers' && reason !== 'cubs' && reason !== 'scouts') {
    throw "Reason is invalid";
  }
  return reason;
}

const validateCaptcha = async (token: string) => {
  /** validate captcha */
  if (process.env.NODE_ENV !== 'production') {
    console.log('skipped recaptcha check');
    return true;
  }

  const recaptchaString = `secret=${getStringProcessVariable("GOOGLE_CAPTCHA_SECRET")}&response=${token}`;
  console.warn(recaptchaString);

  let response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: "POST",
    body: recaptchaString,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  });

  if (!response.ok) {
    throw "Recaptcha communication error";
  }

  let recaptchaAnalysis = await response.json();

  if (!recaptchaAnalysis.success) {
    throw "Invalid recaptcha token";
  }

  if (recaptchaAnalysis.action !== 'submit') {
    throw "Failed to verify action";
  }

  if (recaptchaAnalysis.score < 0.5) {
    throw "Identified as a bot";
  }
}

const mail = (req: ExtendedNextApiRequest, res: NextApiResponse<ResponseData>) => {

    validateCaptcha(req.body.token)
        .then(() => {
          /** get the SendGrid API key */
          const apiKey = validateAPI(process.env.SENDGRID_API_KEY);

          /** Sanitize the inputs */
          const contactName = cleanInput(req.body.contact_name);
          const contactEmail = cleanInput(req.body.contact_email);
          const contactPhone = cleanInput(req.body.contact_phone);
          const contactMessage = cleanInput(req.body.contact_message);

          /** Check email is valid */
          validateEmail(contactEmail);

          /** Check there is a message */
          validateMessage(contactMessage);

          const contactReason = validateReason(req.body.contact_reason);
          const leaderDetails = getLeaderDetails(contactReason);
          const msg = generateEmailMessage(leaderDetails, contactName, contactEmail, contactPhone, contactMessage);

          (async () => {
            try {
              sgMail.setApiKey(apiKey);
              await sgMail.send(msg);
              res.status(200).json({ message: "Message sent"});
            } catch (error:any) {
              if (error.response) {
                console.error('Error from SendGrid: ' + error.response)
                res.status(400).json({ message: "There was a problem communicating with SendGrid. " + error.response});
              }
              else {
                console.error('Error from SendGrid')
                res.status(400).json({ message: "There was a problem communicating with SendGrid. "});
              }
            }
          })();
        })
        .catch(error => {
          console.error(error);
          res.status(400).json({ message: "There was a problem validating your message request. " + error});
        });
}

export default mail;
