export const staticData = {
    logos: {
      title: "Join the Movement",
      description: "Trusted By a Growing Network of Companies Globally",
      logos: [
        { attributes: { url: "/Autoline images.jpg", name: "Company 1" } },
        { attributes: { url: "/dnavin.png", name: "Company 2" } },
        { attributes: { url: "/fine.png", name: "Company 3" } },
        { attributes: { url: "/samarth-logo-300-x-120.webp", name: "Company 4" } },
        { attributes: { url: "/acgc.png", name: "Company 5" } },
        { attributes: { url: "/tvs_image.jpg", name: "Company 6" } }
      ]
    },
    whyUs: {
      heading: "How Sustainability Initiatives Can Enhance Business Performance",
      us_card: [
        {
          id: 1,
          link: "📈",
          heading: "Supply Chain Transparency",
          description: "Tracking suppliers' environmental impact with sustainability tools ensures adherence to sustainability goals, reduces risks, and fosters responsible sourcing throughout the supply chain"
        },
        {
          id: 2,
          link: "💰",
          heading: "Operational Efficiency",
          description: "Leveraging sustainability software to monitor energy consumption enables cost reductions. Similarly, businesses can minimise waste and cut expenses by utilizing real-time data for smarter resource management"
        },
        {
          id: 3,
          link: "⚙️",
          heading: "Product Innovation",
          description: "Developing eco-friendly products allows businesses in sectors such as fashion and consumer goods to differentiate themselves by meeting the growing demand for sustainable options"
        },
        {
          id: 4,
          link: "🚀",
          heading: "Regulatory Compliance",
          description: "Sustainability software helps businesses stay ahead of evolving global regulations. For example, automotive companies can use it to comply with emissions standards, avoiding penalties while ensuring operational continuity"
        }
      ]
    },
    useCase: {
      heading: "Use Cases",
      case_card: [
        {
          heading: "Sustainability Reporting",
          description: "Be in total control of your ESG reporting needs. helps you track all the required ESG indicators. RubiCr supports all major global frameworks, thereby giving you the power to choose the frameworks most relevant to your business. Collect data from multiple teams, track indicators and create a single view for all your ESG reports",
          link: { data: { attributes: { url: "/videos/demo1.mp4" } } }
        },
        {
          heading: "Performance Management",
          description: "Make ESG reporting a part of the Regular performance or MIS monitoring. Track standard or custom indicators relevant to your business that enable you to make better decisions. Integrate with key financial and non-financial indicators to know the health of your organisation,",
          link: { data: { attributes: { url: "/videos/demo2.mp4" } } }
        },
        {
          heading: "Emission Tracking",
          description: "Ground up emissions tracking platform that helps you accurately track both the absolute emissions and the drivers for scope-1/2/3 emissions. Track leading and lagging indicators like energy, fuels equipment wise and link it to scope-1 and 2 indicators to track performance Integrate support with external databases for spent based approach to calculate Scope-3 emissions.",
          link: { data: { attributes: { url: "/videos/demo3.mp4" } } }
        }
      ]
    },
    whyRubicr: {
      title: "Why Choose Rubicr",
      description: "We understand that ESG data can be manual and unstructured. Our Sustainable Intelligence engine ensures you get the right data and insights to grow your business sustainably.",
      card: [
        {
          id: 1,
          heading: "End-to-End Lifecycle Solutions",
          description: "We offer a complete end-to-end lifecycle solution for ESG management. From initial assessment to reporting and beyond, our integrated approach ensures seamless sustainability performance management."
        },
        {
          id: 2,
          heading: "Extensive Experience",
          description: "With nearly 80 clients across diverse industries, our experience is both broad and deep. We understand unique challenges and tailor solutions to meet specific needs effectively."
        },
        {
          id: 3,
          heading: "Demonstration of Value",
          description: "We provide a holistic approach encompassing the entire value chain of the market. Our clarity and depth of expertise empower clients to achieve sustainability goals efficiently and effectively."
        }
      ]
    },
    imageToggler: {
      with_rubicr: {
        data: {
          attributes: {
            url: "/MacBook Pro 16_ - 4 (2).jpg"
          }
        }
      },
      without_rubicr: {
        data: {
          attributes: {
            url: "/MacBook Pro 16_ - 7 (1).jpg"
          }
        }
      }
    },
    globalReach: {
      countries: [
        { name: 'Saudi Arabia', flag: '/saudi.jpg' },
        { name: 'United Arab Emirates', flag: '/uae.png' },
        { name: 'Singapore', flag: '/singapore.jpg' },
        { name: 'India', flag: '/india.jpg' },
        { name: 'Vietnam', flag: '/vietnam.png' },
        { name: 'Belgium', flag: '/belgium.png' }
      ]
    },
    hero: {
      title: "Go Beyond Reporting",
      subtitle: "Improve your Business Outcomes through Sustainability initiatives",
      description: "The worlds leading AI-powered ESG platform",
      videoPath: "/videos/bgvideo21.mp4",
      backgroundImage: "/forest3.jpg"
    }
  };
  
  export type StaticData = typeof staticData;