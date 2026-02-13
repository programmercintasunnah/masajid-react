export interface User {
  id: string;
  name: string;
  email?: string;
  photo?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  error?: string;
}
