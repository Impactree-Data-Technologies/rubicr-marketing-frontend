import Navbar from "../Components/navbar";
import Button from "../Components/button";
import Footer from "../Components/footer";

export default function useCase() {
    return (
        <div className="font-arial">
            {/* Fixed Navbar with Background */}
            <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="mt-20"> {/* mt-20 for top margin to accommodate fixed navbar */}
                {/* First Section */}
                <div className="bg-yellow-100 h-100">
                    <div className="p-6 flex flex-col md:flex-row items-center md:items-start">
                        <div className="flex-1 mb-6 md:mb-0 md:mr-6 text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Sustainability Reporting</h2>
                            <p className="text-lg md:text-xl text-gray-700 mb-4">
                                Be in total control of your ESG reporting needs. RubiCr's Sustainable Intelligence Platform helps you track all the required ESG indicators.
                            </p>
                            <p className="text-lg md:text-xl text-gray-700 mb-4">
                                RubiCr supports all major global frameworks, thereby giving you the power to choose the frameworks most relevant to your business.
                            </p>
                            <p className="text-lg md:text-xl text-gray-700">
                                Collect data from multiple teams, track indicators, and create a single view for all your ESG reports.
                            </p>
                        </div>
                        <div className="flex-1 p-4 bg-white shadow-lg rounded-lg relative overflow-hidden">
                            <iframe 
                                src="https://player.vimeo.com/video/766513504?h=186e36c0a3?api=1&background=1&mute=0" 
                                width="100%" 
                                height="360" 
                                frameBorder="0" 
                                allow="autoplay; fullscreen" 
                                allowFullScreen
                                className="rounded-lg border-4 border-gray-300 relative z-10"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Second Section */}
                <div className="bg-gray-100 p-6 mt-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start">
                        <div className="flex-1 md:mr-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Simplify your Sustainability Reporting with our software</h2>
                            <p className="text-lg md:text-xl text-gray-700 mb-4">
                                Description 
                            </p>
                            <ul className="text-lg md:text-xl text-gray-700 mb-4 ml-4 list-disc">
                                <li>Point 1</li>
                                <li>Point 2</li>
                                <li>Point 3</li>
                            </ul>
                        </div>
                        <div className="flex-1 mt-6 md:mt-0">
                            {/* Example of embedding another video */}
                            <video width="100%" height="auto" controls className="rounded-lg border-4 border-gray-300">
                                <source src="https://example.com/your-video.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>

                {/* Third Section */}
                <div className="bg-white p-6 mt-6">
                    <div className="flex flex-col md:flex-row items-start">
                        <div className="flex-1 md:mr-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-20">Sustainability Reporting Software Modules</h2>

                            {/* Module 1 */}
                            <div className="border-b-2 border-gray-200 pb-6 mb-6 flex flex-col md:flex-row">
                                <div className="md:w-1/2 md:pr-6">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Extensive Standards Database</h3>
                                    <p className="text-lg md:text-xl text-gray-700 mb-4">
                                    Select from our supported standards or build you own standards database
                                    </p>
                                    <p className="text-lg md:text-xl text-gray-700">
                                        <a href="#" className="text-blue-600 hover:underline">Explore Module 1</a>
                                    </p>
                                </div>
                                <div className="md:w-1/2 mt-4 md:mt-0">
                                    {/* Module 1 Video */}
                                    <video width="100%" height="auto" controls className="rounded-lg border-4 border-gray-300">
                                        <source src="https://example.com/module1-video.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>

                            {/* Module 2 */}
                            <div className="border-b-2 border-gray-200 pb-6 mb-6 flex flex-col md:flex-row">
                                <div className="md:w-1/2 md:pr-6">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Task Management</h3>
                                    <p className="text-lg md:text-xl text-gray-700 mb-4">
                                    Collect data from authorised sources with validation using our maker-checker validation principle
                                    </p>
                                    <p className="text-lg md:text-xl text-gray-700">
                                        <a href="#" className="text-blue-600 hover:underline">Explore Module 2</a>
                                    </p>
                                </div>
                                <div className="md:w-1/2 mt-4 md:mt-0">
                                    {/* Module 2 Video */}
                                    <video width="100%" height="auto" controls className="rounded-lg border-4 border-gray-300">
                                        <source src="https://example.com/module2-video.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>

                            {/* Module 3 */}
                            <div className="border-b-2 border-gray-200 pb-6 mb-6 flex flex-col md:flex-row">
                                <div className="md:w-1/2 md:pr-6">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Sustainable Intelligence Rating</h3>
                                    <p className="text-lg md:text-xl text-gray-700 mb-4">
                                    Link all relevant ESG databases to our Sustainable Intelligence engine to give numeric scores to track your sustainability performance
                                    </p>
                                    <p className="text-lg md:text-xl text-gray-700">
                                        <a href="#" className="text-blue-600 hover:underline">Explore Module 3</a>
                                    </p>
                                </div>
                                <div className="md:w-1/2 mt-4 md:mt-0">
                                    {/* Module 3 Video */}
                                    <video width="100%" height="auto" controls className="rounded-lg border-4 border-gray-300">
                                        <source src="https://example.com/module3-video.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>

                            {/* Module 4 */}
                            <div className="pb-6 flex flex-col md:flex-row">
                                <div className="md:w-1/2 md:pr-6">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Performance Benchmarks</h3>
                                    <p className="text-lg md:text-xl text-gray-700 mb-4">
                                    Understand performance of peers through our benchmarking layer collating data from public sources
                                    </p>
                                    <p className="text-lg md:text-xl text-gray-700">
                                        <a href="#" className="text-blue-600 hover:underline">Explore Module 4</a>
                                    </p>
                                </div>
                                <div className="md:w-1/2 mt-4 md:mt-0">
                                    {/* Module 4 Video */}
                                    <video width="100%" height="auto" controls className="rounded-lg border-4 border-gray-300">
                                        <source src="https://example.com/module4-video.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-[#f6e2cb] md:bg-[#f6e2cb] h-96 md:h-80 mx-8 md:mx-20 mt-8 md:mt-12 rounded-3xl md:rounded-110px p-8 mb-20">
        <div className="flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 ml-6 md:ml-12">Get Started Today</h1>
          <hr className="border-t-2 border-[#64271F] w-1/4 md:w-1/4 ml-6 md:ml-12 mb-4 md:mb-6" />
          <p className="text-lg md:text-2xl ml-6 md:ml-12 mb-6 md:mb-8">Ready to transform your ESG Performance?</p>
          <div className="ml-11">
            <Button margintop="6" marginleft="6" background="#FFCD1B" color="black" />
          </div>
        </div>
      </div>

      <Footer />

        </div>
    );
}
