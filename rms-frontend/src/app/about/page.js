"use client";

const AboutUs = () => {
  return (
    <div className="relative min-h-screen">
      {/* Gradient Background Covering 3/4th of Page */}
      <div className="h-[75vh] bg-gradient-to-b from-purple-500 via-pink-200 to-blue-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-200 text-black flex flex-col items-center justify-center px-6">
        {/* Header Section */}
        <h1 className="text-6xl font-extrabold tracking-wider">ABOUT US</h1>
       

        {/* Content Section */}
        <div className="max-w-3xl text-center mt-6">
          <p className="text-lg leading-relaxed">
            Welcome to <strong>Rimavish Developers</strong> At Rimavish Developers we aim at creating an application software which assists restaurants in efficient management of its various parameters.
            The database contains information regarding different aspects of restaurants like menu, order,table reservation,billing and payments,inventory and staffs of the restaurant. Our application software has various managing features 
            which supports specific operations namely, the menu management to support operations like addition, updation and removal of food items, order management to accept and track orders from the customers, table reservation to help the customers 
            book their tables beforehand, billing options to generate bills and process payments, staff management to maintain employee details and their work shifts and inventory management to track the stock levels of ingredients.
          </p>

          {/* Fun Quote - Styled to Stand Out */}
          <p className="text-2xl font-bold italic mt-8 px-4 py-3 text-white-200">
            ❝ Good food is like good music—you just feel it! 🎶🍽️ ❞
          </p>

          {/* Operating Hours - Highlighted More */}
          <div className="mt-8 p-6">
            <h2 className="text-3xl font-bold text-white-800 mt-5">🕒 Operating Hours</h2>
            <p className="text-lg mt-5 te"><strong>📅 Monday - Friday:</strong> 10:00 AM - 10:00 PM</p>
            <p className="text-lg"><strong>📅 Saturday - Sunday:</strong> 8:00 AM - 11:30 PM</p>
          </div>
        </div>
      </div>

      {/* White Background for Contact Us */}
      <div className="h-[25vh] bg-white text-center flex flex-col items-center justify-center text-gray-900 shadow-lg">
        <h2 className="text-2xl font-bold">CONTACT US</h2>
        <p className="mt-2"><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Email:</strong> rimavish@gmail.com</p>
      </div>
    </div>
  );
};

export default AboutUs;
