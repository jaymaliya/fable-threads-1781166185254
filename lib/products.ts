export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  tag?: string;
}

export const PRODUCTS: Product[] = [
  {
    "id": "p1",
    "name": "Daydreamer Tee",
    "price": 400,
    "description": "Ecru heavyweight with a hand-drawn mountain scene and a figure flat on the grass. The back says everything you've wanted to tell someone on a Monday morning.",
    "image": "/product-1.jpg",
    "tag": "Back graphic"
  },
  {
    "id": "p2",
    "name": "Grow Through Tee",
    "price": 100,
    "description": "White with a botanical etching arched in forest green. One daisy, one sentence, no further explanation required.",
    "image": "/product-2.jpg",
    "tag": "Botanical print"
  },
  {
    "id": "p3",
    "name": "Midnight Drive Tee",
    "price": 200,
    "description": "Washed black with a full-chest city-night photo print — rain on asphalt, a dark car, condensed caps. Closest a tee gets to an album cover.",
    "image": "/product-3.jpg",
    "tag": "Photo print"
  },
  {
    "id": "p4",
    "name": "Focus Stamp Tee",
    "price": 300,
    "description": "Navy with a left-chest block-text hit. No art, no noise. Just four words where a pocket would be.",
    "image": "/product-4.jpg",
    "tag": "Chest stamp"
  }
];

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");
