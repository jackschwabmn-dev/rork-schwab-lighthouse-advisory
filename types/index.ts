export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}