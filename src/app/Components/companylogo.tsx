import Image from "next/image";

const BASE_URL = "http://localhost:1337";

export default function CompanyLogo({ title, description, logos }) {
  console.log("Received logos:", logos);

  if (!Array.isArray(logos)) {
    console.error("logos is not an array:", logos);
    return null;
  }

  return (
    <div className="w-full text-center mt-8 mb-12">
      <h1 className="text-1xl md:text-2xl font-semibold mb-4">{title}</h1>
      <h1 className="text-2xl md:text-4xl font-semibold mb-2">{description}</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
        {logos.map((logoData, index) => {
          const logo = logoData.attributes;
          return (
            <div key={index} className="flex justify-center items-center">
              <Image
                src={`${BASE_URL}${logo.url}`}
                alt={logo.name}
                layout="intrinsic"
                width={200}
                height={100}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
