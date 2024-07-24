import Image from "next/image";
const BASE_URL = "http://localhost:1337";

export default function CompanyLogo({ title, description, logos }) {
  console.log("Received logos:", logos);
  if (!Array.isArray(logos)) {
    console.error("logos is not an array:", logos);
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-3">{title}</h2>
        <p className="text-xl md:text-2xl text-center text-gray-600 mb-12">{description}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {logos.map((logoData, index) => {
            const logo = logoData.attributes;
            return (
              <div key={index} className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={`${BASE_URL}${logo.url}`}
                  alt={logo.name}
                  width={150}
                  height={75}
                  objectFit="contain"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}