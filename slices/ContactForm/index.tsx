import Script from 'next/script'
import React, {ChangeEvent, SyntheticEvent, useState} from 'react'
import {ContactFormSlice} from "../../types.generated";
import {ContactFormInputs, ContactReason} from "../../types.global";

type ContactFormProps = {
    slice: ContactFormSlice;
}

const ContactForm = ({ slice }: ContactFormProps) => {
    const contactFormInitialState = {
        contact_reason: "scouts",
        contact_message: "",
        contact_phone: "",
        contact_email: "",
        contact_name: "",
    } as ContactFormInputs;

    const [inputs, setInputs] = useState<ContactFormInputs>(contactFormInitialState);

    const [sendingClassname, setSendingClassname] = useState('');

    function toggleSendingState(sending: boolean) {
        if (sending) {
            setSendingClassname('sending');
        }
        else {
            setSendingClassname('');
        }
    }

    const handleReasonChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setInputs(values => ({...values, contact_reason: (value as ContactReason)}));
    }

    const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputs(values => ({...values, contact_message: event.target.value }));
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputs(values => ({...values, [event.target.id]: event.target.value }));
    }

    const getRecaptchaKey = (): string => {
        return "6LcclWkiAAAAAD0Nag4yvmFRyK98whwSwpNZsvph";
    }

    const isProduction = (): boolean => (
        window.location.hostname === 'www.minsterscouts.org'
    )

    const sendEmailRequest = (token: string) => {
        toggleSendingState(true);

        fetch('/api/mail', {
            method: "POST",
            body: JSON.stringify({...inputs, token}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(
            (response) => {
                if (response.ok) {
                    alert("Message Sent.");
                    setInputs(contactFormInitialState);
                }
                else {
                    alert("Error: There was a problem sending your message.");
                }
            }
        )
        .finally(() => toggleSendingState(false))
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        if (!isProduction()) {
            return sendEmailRequest('');
        }

        grecaptcha.ready(function() {
            grecaptcha.execute(getRecaptchaKey(), {action: 'submit'}).then(function(token) {
                sendEmailRequest(token);
            });
        });
    }

    return (
        <section>
            <Script src="https://www.google.com/recaptcha/api.js?render=6LcclWkiAAAAAD0Nag4yvmFRyK98whwSwpNZsvph" />
            <div className="container">
                <form id="contact" action="" onSubmit={handleSubmit} method="post">
                    <fieldset>
                        <label htmlFor="contact_reason">Which section do you wish to contact?<span
                            className="required">*</span></label>
                        <select id="contact_reason" tabIndex={1} value={inputs.contact_reason} onChange={handleReasonChange} required autoFocus>
                            <option value="beavers">Beavers</option>
                            <option value="cubs">Cubs</option>
                            <option value="scouts">Scouts</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="contact_name">Your name<span className="required">*</span></label>
                        <input id="contact_name" placeholder="e.g. Fred Bloggs" type="text" tabIndex={2} required
                               autoFocus value={inputs.contact_name} onChange={handleInputChange}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="contact_email">Your email address<span className="required">*</span></label>
                        <input id="contact_email" placeholder="e.g. hello@example.com" type="email" tabIndex={3}
                               required value={inputs.contact_email} onChange={handleInputChange}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="contact_phone">Your phone number</label>
                        <input id="contact_phone" placeholder="e.g. 01234 123123" type="tel" tabIndex={4} value={inputs.contact_phone} onChange={handleInputChange}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="contact_message">Your message<span className="required">*</span></label>
                        <textarea minLength={10} id="contact_message" placeholder="Type your message here...." value={inputs.contact_message} onChange={handleMessageChange} tabIndex={5} required/>
                    </fieldset>
                    <fieldset className={sendingClassname}>
                        <button name="submit" type="submit" id="contact_submit" tabIndex={6}
                                data-submit="...Sending" className={sendingClassname}>Send
                        </button>
                    </fieldset>
                </form>
            </div>

            <style jsx>{`
        .container {
            display: flex;
            flex-direction: row; 
            flex-wrap: wrap;
        }
        form {
            margin: auto;
            min-width: 400px;
        }
        fieldset {
            border: none;
        }
        label {
            width: 100%;
            display: block;
            font-weight: bold;
            font-size: 0.88em;
            color: rgb(22, 22, 22);
            white-space: pre-wrap;
            margin-bottom: 6px;
        }
        select {
            display: block;
            width: 100%;
            font-size: 0.88em;
            background-color: rgb(255, 255, 255);
            box-sizing: border-box;
            border-radius: 2px;
            font-family: Roboto, sans-serif;
            color: rgb(22, 22, 22);
            border: 1px solid rgb(204, 204, 204);
            height: 30px;
            padding: 0px 7px;
        }
        input {
            display: block;
            width: 100%;
            font-size: 0.88em;
            background-color: rgb(255, 255, 255);
            box-sizing: border-box;
            border-radius: 2px;
            font-family: Roboto, sans-serif;
            color: rgb(22, 22, 22);
            border: 1px solid rgb(204, 204, 204);
            height: 30px;
            padding: 0px 7px;
        }
        textarea {
            display: block;
            width: 100%;
            font-size: 0.88em;
            background-color: rgb(255, 255, 255);
            box-sizing: border-box;
            border-radius: 2px;
            color: rgb(22, 22, 22);
            font-family: Roboto, sans-serif;
            border: 1px solid rgb(204, 204, 204);
            line-height: 15px;
            margin: 7px 0px -7px;
            padding: 7px;
            margin-bottom: 30px;
            resize: none;
            min-height: 100px;
        }
        span.required {
            color: rgb(208, 1, 27);
            margin-left: 4px;
        }
        
        button {
            width: 100%;
            height: 100px;
            height: 50px;
            font-size: 18px;
            color: #fff;
            background-color: #00A794;
        }
        
        button.sending {
            display: none;
        }
        
        fieldset.sending {
          width: 40px;
          height: 40px;
          --c: linear-gradient(currentColor 0 0);
          --r1: radial-gradient(farthest-side at bottom,currentColor 93%,#0000);
          --r2: radial-gradient(farthest-side at top   ,currentColor 93%,#0000);
          background: 
            var(--c) ,
            var(--r1),
            var(--r2),
            var(--c) ,  
            var(--r1),
            var(--r2),
            var(--c) ,
            var(--r1),
            var(--r2);
          background-repeat: no-repeat;
          animation: db1 1s infinite  alternate;
        }
        
        @keyframes db1 {
          0%,10% {
            background-size: 8px 0,8px 4px,8px 4px;
            background-position: 0 50%,0 calc(50% - 2px),0 calc(50% + 2px),50% 50%,50% calc(50% - 2px),50% calc(50% + 2px),100% 50%,100% calc(50% - 2px),100% calc(50% + 2px);
         }
         90%,100% {
            background-size: 8px 100%,8px 4px, 8px 4px;
            background-position: 0 50%,0 -2px,0 calc(100% + 2px),50% 50%,50% -2px,50% calc(100% + 2px),100% 50%,100% -2px,100% calc(100% + 2px);
         }
        }

        
    `}</style>
        </section>
    )
}

export default ContactForm
