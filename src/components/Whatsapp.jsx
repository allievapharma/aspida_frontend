import whatsappicon from "../assets/image/whatsapp/whatsappde.gif";

function Whatsapp() {
  const phone = "918527661579";
  const defaultMessage = "Hi, I found your site and would like to know more.";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      style={{ width: "100px" }}
      aria-label="Chat on WhatsApp"
    >
      <img src={whatsappicon} alt="WhatsApp chat" />
    </a>
  );
}

export default Whatsapp;
