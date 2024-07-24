export default function WhyUs() {
  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          How ESG Can Help Your Business
        </h1>
        <p className="mb-12 text-xl text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto">
          Unlocking the Profit Potential of ESG: Seize new markets, boost efficiency, attract investors, and drive innovation and differentiation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Maximize Market Opportunities",
              description: "Embrace ESG initiatives to tap into growing markets for sustainable products and services, capitalizing on consumer demand and expanding revenue streams.",
              icon: "📈"
            },
            {
              title: "Enhance Operational Efficiency",
              description: "Implement sustainable practices to reduce waste, optimize resource usage, and lower operational costs, driving bottom-line savings and improving profitability.",
              icon: "⚙️"
            },
            {
              title: "Attract Investor Capital",
              description: "Position ESG as a profit center to attract investors seeking companies with strong sustainability performance, unlocking access to capital and potentially boosting stock value.",
              icon: "💰"
            },
            {
              title: "Differentiate and Innovate",
              description: "Use ESG as a catalyst for innovation, differentiation, and market leadership, setting your business apart from competitors and driving long-term growth and profitability.",
              icon: "🚀"
            }
          ].map((item, index) => (
            <div key={index} className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 h-14 flex items-center">{item.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 flex-grow">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}