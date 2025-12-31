import DOMPurify from "dompurify";

const RichText = ({ html, className = "" }) => {
  if (!html) return null;

  const cleanHTML = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "b", "strong", "i", "ul", "li", "br", "span"],
    ALLOWED_ATTR: ["style"],
  });

  return (
    <div
      className={`rich-text ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
};

export default RichText;
