export type Property = {
  id: string;
  title_address: string;
  url: string;
  images: string[];
  state_address: string;
  price: number;
  property_type: string;
  listed_in: string;
  bedNumber: number;
  bathNumber: number;
  description: string;
};

export interface Paragraph {
  title: string;
  paragraph: string;
}

export interface Article {
  id: number;
  url: string;
  title: string;
  image: string;
  category: string[];
  date: string; // ISO format date string (can be parsed to Date or timestamptz)
  author: string;
  tags: string[];
  paragraphs: Paragraph[];
}
