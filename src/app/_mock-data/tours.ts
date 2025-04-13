import { Tour } from "../_types";

export const tours: Tour[] = [
  {
    id: "b14fe736-dc09-4570-a562-79e7378e1be9",
    name: "Split Cinema Tour",
    type: "cinema",
    locations: [
      {
        id: 1,
        name: "Cineplexx Split",
        lat: 43.519063,
        lng: 16.466929,
        description: "Modern multiplex cinema in City Center One Split",
        type: "cinema",
      },
      {
        id: 2,
        name: "Kinoteka Zlatna Vrata",
        lat: 43.508751,
        lng: 16.440981,
        description: "Historic art house cinema in the heart of Split",
        type: "cinema",
      },
      {
        id: 3,
        name: "Kino Karaman",
        lat: 43.511374,
        lng: 16.443851,
        description: "Traditional cinema showing latest releases",
        type: "cinema",
      },
    ],
  },
  {
    id: "fc732d03-1884-44a2-aee7-44074146e7a7",
    name: "Split Restaurant Tour",
    type: "restaurant",
    locations: [
      {
        id: 4,
        name: "Zoi",
        lat: 43.508235,
        lng: 16.437797,
        description: "Fine dining with a view of the harbor",
        type: "restaurant",
      },
      {
        id: 5,
        name: "Villa Spiza",
        lat: 43.509098,
        lng: 16.439653,
        description: "Traditional Dalmatian cuisine in the old town",
        type: "restaurant",
      },
      {
        id: 6,
        name: "Bokeria",
        lat: 43.509557,
        lng: 16.43858,
        description: "Modern Mediterranean restaurant in historic setting",
        type: "restaurant",
      },
    ],
  },
  {
    id: "7c66fe59-a959-460b-bc4e-ff8993df9136",
    name: "Split Museum Tour",
    type: "museum",
    locations: [
      {
        id: 7,
        name: "Archaeological Museum Split",
        lat: 43.516374,
        lng: 16.443851,
        description: "Oldest museum institution in Croatia",
        type: "museum",
      },
      {
        id: 8,
        name: "Museum of Croatian Archaeological Monuments",
        lat: 43.517442,
        lng: 16.445456,
        description: "Medieval Croatian history and artifacts",
        type: "museum",
      },
      {
        id: 9,
        name: "Split City Museum",
        lat: 43.508751,
        lng: 16.440981,
        description: "Cultural heritage of Split through the ages",
        type: "museum",
      },
    ],
  },
];
