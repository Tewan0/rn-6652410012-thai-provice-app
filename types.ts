export type location = {
  id: string;
  name: string;
  description: string;
  category: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  image_url: string[];
};

export type events = {
  id: string;
  event_name: string;
  period: string;
  description: string;
  image_url: string;
};
