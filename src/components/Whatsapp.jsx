import React from 'react'
import whatsappicon from "../assets/image/what'sapp/whatsappde.gif"

export default function Whatsapp() {
  // put the phone number here: country code + phone (no +, no spaces)
  const phone = '918527661579' // <-- replace with real number

  // the default message that will appear in the chat box
  const defaultMessage = 'Hi 👋, I found your site and would like to know more.' // <-- replace message

  // wa.me link - WhatsApp will open in app if on mobile or in web.whatsapp.com on desktop
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[100px] fixed bottom-[40px] right-0 hover:right-0 duration-500 cursor-pointer z-50"
      aria-label="Chat on WhatsApp"
    >
      <img src={whatsappicon} alt="Open WhatsApp" />
    </a>
  )
}
