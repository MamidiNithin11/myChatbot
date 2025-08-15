export const metadata={
  title:"My AI Chatbot",
  description:"A simple AI chatbot using OpenRouter API",
}

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <div className="container mx-auto p-4">
          {children}
        </div>
      </body>
    </html>
  );
}