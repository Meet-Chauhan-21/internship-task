
export interface UserForHome {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
  course: string;
  hobbies: string[];
  image?: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  hobbies: string[];
  course: string;
  image?: string;
}

