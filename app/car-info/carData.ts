export const CAR_DATA: Record<
  string,
  {
    name: string;
    subtitle: string;
    status: string;
    heroImage: string;
    bannerImage: string;
    collageImages: string[];
    showcaseImages: string[];
    videos: string[];
    showcaseFeatures: { image: string; title: string; description: string }[];
    exteriorColors: { name: string; colorCode: string; images: { front: { essential: string; premium: string }; side: { essential: string; premium: string } } }[];
    interiorColors: { name: string; image: string }[];
    specs: { value: string; unit: string; label: string }[];
    overview: { heading: string; body: string };
    design: {
      title: string;
      features: { title: string; description: string }[];
    };
    technology: {
      title: string;
      features: { title: string; description: string }[];
    };
    styling: { title: string; subtitle: string };
    safety: { features: { title: string; description: string }[] };
    storage: { boot: string; expanded: string };
    models: { name: string; specs: string[] }[];
    moreInfo: { handbook: string; testDrive: string };
    specifications: [string, string][];
    features: string[];
  }
> = {
  "1": {
    name: "BYD ATTO 1",
    subtitle: "The Compact Electric City Car",
    status: "New Electric",
    heroImage:
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/hero.png?v=1",
    bannerImage:
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/banner-1.jpg?v=1",
    collageImages: [
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/collage-2.jpg?v=1",
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/collage-1.jpg?v=1",
    ],
    showcaseImages: [
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/showcase-1.jpg?v=1",
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/showcase-2.jpg?v=1",
    ],
    videos: [
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/video-1.mp4?v=1",
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/video-2.mp4?v=1",
    ],
    showcaseFeatures: [
      {
        image:
          "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/showcase-feature-1.jpg?v=1",
        title: "A 'floating roof' and full-width LED tail-lights",
        description:
          "The C-pillar uses a dot-matrix design inspired by ice crystals, creating a floating roof effect with full-width LED tail-lights.",
      },
      {
        image:
          "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/showcase-feature-2.jpg?v=1",
        title: "Distinctive daytime-running lights",
        description:
          "Six angled light strips create a sharp and sophisticated lighting signature.",
      },
      {
        image:
          "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/showcase-feature-3.jpg?v=1",
        title: "Sporty rear spoiler",
        description:
          "Integrated roof spoiler improves sporty styling and aerodynamic efficiency.",
      },
      {
        image:
          "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/showcase-feature-4.jpg?v=1",
        title: "Fun flourishes",
        description:
          "Cyber punk-inspired air conditioning vent design adds a futuristic feel.",
      },
    ],
    exteriorColors: [
      {
        name: "Apricity White",
        colorCode: "white",
        images: {
          front: {
            essential: "/images/atto1/white-front-essential.jpg",
            premium: "/images/atto1/white-front-premium.jpg",
          },
          side: {
            essential: "/images/atto1/white-side-essential.jpg",
            premium: "/images/atto1/white-side-premium.jpg",
          },
        },
      },
      {
        name: "Arctic Blue",
        colorCode: "blue",
        images: {
          front: {
            essential: "/images/atto1/blue-front-essential.jpg",
            premium: "/images/atto1/blue-front-premium.jpg",
          },
          side: {
            essential: "/images/atto1/blue-side-essential.jpg",
            premium: "/images/atto1/blue-side-premium.jpg",
          },
        },
      },
      {
        name: "Pine Lime",
        colorCode: "yellow",
        images: {
          front: {
            essential: "/images/atto1/yellow-front-essential.jpg",
            premium: "/images/atto1/yellow-front-premium.jpg",
          },
          side: {
            essential: "/images/atto1/yellow-side-essential.jpg",
            premium: "/images/atto1/yellow-side-premium.jpg",
          },
        },
      },
      {
        name: "Cosmos Black",
        colorCode: "black",
        images: {
          front: {
            essential: "/images/atto1/black-front-essential.jpg",
            premium: "/images/atto1/black-front-premium.jpg",
          },
          side: {
            essential: "/images/atto1/black-side-essential.jpg",
            premium: "/images/atto1/black-side-premium.jpg",
          },
        },
      },
    ],
    interiorColors: [{ name: "Black + Grey", image: "" }],
    specs: [
      { value: "9.1", unit: "s", label: "0–100km/h" },
      { value: "115", unit: "kW", label: "Power" },
      { value: "310", unit: "km", label: "WLTP range" },
    ],
    overview: {
      heading: "Built for big city",
      body: "The BYD ATTO 1 is cool, fun-loving model from world's largest new-energy vehicle brand. It mixes sharp design, a spacious interior, punchy performance and BYD's trademark in-car technologies – making it perfect choice for people who don't want to compromise on features.",
    },
    design: {
      title: "A design where function meets fun",
      features: [
        {
          title: "Floating roof",
          description: "Dot-matrix C-pillar design inspired by ice crystals",
        },
        {
          title: "LED lighting",
          description: "Full-width LED tail-lights and distinctive DRL",
        },
        {
          title: "Sporty styling",
          description: "Integrated rear spoiler for aerodynamic efficiency",
        },
      ],
    },
    technology: {
      title: "All the tech you'd expect from a BYD",
      features: [
        {
          title: "Fast charging",
          description:
            "Maximum AC charging rate of 11kW for convenient home charging",
        },
        {
          title: "10.1-inch Intelligent Infotainment Screen",
          description:
            "Includes wireless Apple CarPlay, Android Auto, and 'Hi BYD' voice control",
        },
        {
          title: "Cutting-edge features",
          description:
            "Keyless entry and start, NFC card key access, One-touch tailgate, OTA updates",
        },
        {
          title: "Charge your life with V2L",
          description:
            "Vehicle-to-Load technology allows powering external devices from car battery",
        },
      ],
    },
    styling: {
      title: "Premium styling",
      subtitle: "Inside and out",
    },
    safety: {
      features: [
        {
          title: "Digital, not daunting",
          description:
            "Features dual digital displays: 10.1-inch infotainment screen, 7-inch driver display",
        },
        {
          title: "Style meets substance",
          description:
            "Vegan leather black and grey interior with heated front seats on Premium trim",
        },
        {
          title: "e-Platform 3.0",
          description:
            "Built on BYD's e-Platform 3.0 with Blade Battery technology",
        },
        {
          title: "Safety first",
          description:
            "Includes six airbags and a full suite of safety systems",
        },
      ],
    },
    storage: {
      boot: "308L",
      expanded: "Up to 1,037L with rear seats folded",
    },
    models: [
      {
        name: "BYD ATTO 1 Essential",
        specs: [
          "65 kW power",
          "220 km WLTP range",
          "11.1s acceleration",
          "15' steel wheels",
          "10.1' touchscreen",
        ],
      },
      {
        name: "BYD ATTO 1 Premium",
        specs: [
          "115 kW power",
          "310 km WLTP range",
          "9.1s acceleration",
          "16' alloy wheels",
          "10.1' touchscreen",
        ],
      },
    ],
    moreInfo: {
      handbook:
        "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/owners-handbook.jpg",
      testDrive: "",
    },
    specifications: [
      ["Battery Capacity", "60.5 kWh"],
      ["Charging (AC)", "11 kW"],
      ["Charging (DC)", "88 kW"],
      ["Top Speed", "160 km/h"],
      ["Drive Type", "FWD"],
      ["Seats", "5"],
      ["Boot Space", "440 L"],
      ["Kerb Weight", "1,780 kg"],
    ],
    features: [
      '10.1" Intelligent Infotainment Screen',
      "Wireless Apple CarPlay",
      "Wireless Android Auto",
      "Hi BYD Voice Control",
      "Keyless Entry",
      "NFC Card Key",
      "One-touch Tailgate",
      "OTA Updates",
      "V2L Technology",
      "e-Platform 3.0",
      "Blade Battery",
      "6 Airbags",
    ],
  },
  "2": {
    name: "BYD ATTO 2",
    subtitle: "The Smart Urban Electric",
    status: "New Electric",
    heroImage: "/images/car2.png",
    bannerImage: "/images/car2.png",
    collageImages: ["/images/car2.png", "/images/car2.png"],
    showcaseImages: ["/images/car2.png", "/images/car2.png"],
    videos: [],
    showcaseFeatures: [],
    exteriorColors: [],
    interiorColors: [],
    specs: [
      { value: "7.9", unit: "s", label: "0-100Km/h" },
      { value: "130", unit: "kW", label: "Power" },
      { value: "345", unit: "km", label: "WLTP range" },
    ],
    overview: {
      heading: "Smart city driving",
      body: "The BYD ATTO 2 brings next-generation electric performance to urban commuters. With enhanced range, faster charging, and an evolved interior, it's natural upgrade for city dwellers who demand more.",
    },
    design: {
      title: "A design where function meets fun",
      features: [],
    },
    technology: {
      title: "All the tech you'd expect from a BYD",
      features: [],
    },
    styling: {
      title: "Premium styling",
      subtitle: "Inside and out",
    },
    safety: {
      features: [],
    },
    storage: {
      boot: "460L",
      expanded: "Up to 1,200L with rear seats folded",
    },
    models: [],
    moreInfo: {
      handbook: "",
      testDrive: "",
    },
    specifications: [
      ["Battery Capacity", "65.0 kWh"],
      ["Charging (AC)", "11 kW"],
      ["Charging (DC)", "100 kW"],
      ["Top Speed", "170 km/h"],
      ["Drive Type", "FWD"],
      ["Seats", "5"],
      ["Boot Space", "460 L"],
      ["Kerb Weight", "1,820 kg"],
    ],
    features: [
      '15.6" Rotating Display',
      "Wireless CarPlay",
      "360° Camera",
      "Adaptive Cruise",
      "Lane Assist",
      "V2L Technology",
      "OTA Updates",
      "BYD DiPilot",
    ],
  },
  "3": {
    name: "BYD ATTO 3",
    subtitle: "The Family Electric SUV",
    status: "New Electric",
    heroImage: "/images/car3.png",
    bannerImage: "/images/car3.png",
    collageImages: ["/images/car3.png", "/images/car3.png"],
    showcaseImages: ["/images/car3.png", "/images/car3.png"],
    videos: [],
    showcaseFeatures: [],
    exteriorColors: [],
    interiorColors: [],
    specs: [
      { value: "7.3", unit: "s", label: "0-100Km/h" },
      { value: "150", unit: "kW", label: "Power" },
      { value: "420", unit: "km", label: "WLTP range" },
    ],
    overview: {
      heading: "More space, more range",
      body: "The BYD ATTO 3 is a family-focused electric SUV that refuses to compromise. With generous boot space, class-leading range, and BYD's advanced Blade Battery technology, it's built for every journey.",
    },
    design: {
      title: "A design where function meets fun",
      features: [],
    },
    technology: {
      title: "All the tech you'd expect from a BYD",
      features: [],
    },
    styling: {
      title: "Premium styling",
      subtitle: "Inside and out",
    },
    safety: {
      features: [],
    },
    storage: {
      boot: "440L",
      expanded: "Up to 1,340L with rear seats folded",
    },
    models: [],
    moreInfo: {
      handbook: "",
      testDrive: "",
    },
    specifications: [
      ["Battery Capacity", "72.8 kWh"],
      ["Charging (AC)", "11 kW"],
      ["Charging (DC)", "88 kW"],
      ["Top Speed", "180 km/h"],
      ["Drive Type", "FWD"],
      ["Seats", "5"],
      ["Boot Space", "440 L"],
      ["Kerb Weight", "1,950 kg"],
    ],
    features: [
      '12.8" Rotating Display',
      "Wireless CarPlay",
      "360° Camera",
      "Adaptive Cruise",
      "Lane Assist",
      "V2L Technology",
      "OTA Updates",
      "BYD DiPilot",
    ],
  },
};

export const DEFAULT_CAR = CAR_DATA["1"];
