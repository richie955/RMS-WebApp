export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
     

      <header className="bg-gray-900 text-white text-center py-16">
        <h2 className="text-5xl font-bold">Effortless Restaurant Management</h2>
        <p className="mt-4 ">Streamline your operations, track orders, and manage staff seamlessly.</p>
        <a href="/signup" className="mt-6 inline-block bg-white text-gray-900 px-6 py-2 rounded font-semibold shadow hover:bg-gray-200">
          Get Started
        </a>
      </header>

      <section className="p-10 text-center mx-auto w-full ">
        <h3 className="text-2xl font-bold mb-4">🌟 Why Choose Our RMS?</h3>
        <div className="flex text-justify justify-between w-[80%] mx-auto gap-16  ">
        <p className=" text-black mb-4">
          Our Restaurant Management System (RMS) is designed to simplify and automate all aspects of your restaurant's operations. From order processing to inventory tracking, we provide a seamless experience to ensure efficiency and accuracy.
        </p>
        <p className=" text-black mb-4">
          With real-time data insights, you can monitor sales, track staff performance, and optimize workflows effortlessly. Our system ensures you stay ahead of the competition by offering a reliable and scalable solution.
        </p>

        <p className=" text-black">
          Whether you're runniall café or a large restaurant chain, our intuitive and powerful platform adapts to your needs, making management hassle-free and more profitable.
        </p>
        </div>
      </section>

      <section className="p-10 bg-gray-100 shadow-lg rounded-lg mx-6 text-center">
        <h3 className="text-2xl font-bold mb-4">📊 Monitor Performance</h3>
        <p className="">Track orders, revenue, and inventory in real-time.</p>
        <a href="/dashboard" className="mt-4 inline-block bg-gray-900 text-white px-6 py-2 rounded font-semibold shadow hover:bg-gray-800">
          Go to Dashboard
        </a>
      </section>
    </div>
  );
}
