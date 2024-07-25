interface LogoAttributes {
    url: string;
    // Add other attributes if needed
  }
  
  interface Logo {
    id: number;
    attributes: LogoAttributes;
  }
  
  interface LogoData {
    title: string;
    description: string;
    logos: Logo[];
  }
  
  interface HomeData {
    title: string;
    description: string;
    subdescription: string;
  }
  
  interface WithRubicrData {
    id: number;
    attributes: {
      url: string;
      // Add other attributes if needed
    };
  }
  