import { ServiceProps } from "@/typings/service";

// hair styling services
export const sampleServices: ServiceProps[] = [
  {
    name: "Haircut",
    price: 30,
    duration: 60,
    id: "haircut",
  },
  {
    name: "Hair Color",
    description: "Full hair color treatment",
    price: 80,
    duration: 120,
    id: "hair-color",
  },
  {
    name: "Blowout",
    description: "Professional styling and blow-dry",
    price: 40,
    duration: 45,
    id: "blowout",
  },
  {
    name: "Highlights",
    description: "Partial or full highlights",
    price: 70,
    duration: 90,
    id: "highlights",
  },
  {
    name: "Balayage",
    description: "Hand-painted highlights for a natural look",
    price: 90,
    duration: 150,
    id: "balayage",
  },
];
