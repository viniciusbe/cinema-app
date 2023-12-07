interface Director {
  id: string;
  name: string;
}

interface Gender {
  id: string;
  description: string;
}

interface Movie {
  id?: string;
  name: string;
  poster: string;
  duration?: number;
  synopsis: string;
  age?: number;
  director?: Director;
  genders: Gender[];
}

interface MovieOptions {
  directors: Director[];
  genders: Gender[];
}

type Language = "Dublado" | "Legendado";

interface Session {
  id?: string;
  time: string;
  language: Language;
  room?: number;
  filmId: number;
}

interface MovieDetails extends Movie {
  sessions: Session[];
}

interface Buyer {
  id?: string;
  name?: string;
  document?: string;
  email?: string;
  password?: string;
}
interface BuyerDetails extends Buyer {
  tickets: Ticket[];
}

interface Ticket {
  ID?: string;
  seat: string;
  modality: string;
  session: Session;
}
