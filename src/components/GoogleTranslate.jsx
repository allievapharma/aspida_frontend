import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Function to remove any existing Google Translate widget
    const removeExistingTranslateElement = () => {
      const existingElement = document.getElementById(
        "google_translate_element"
      );
      if (existingElement) {
        existingElement.innerHTML = ""; // Clear out the previous widget
      }
    };

    // Dynamically load the Google Translate script
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate when the script is loaded
    window.googleTranslateElementInit = () => {
      // Remove any existing widget first
      removeExistingTranslateElement();

      // Create a new Google Translate widget
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // The default language of your page
          includedLanguages: "en,es,zh-CN,hi,fr,de,ar,pt,ru,ja", // Specify popular languages
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    // Cleanup script when component unmounts to avoid any potential memory leak
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="google_translate_element" className="h-[41px]"></div>;
};

export default GoogleTranslate;
