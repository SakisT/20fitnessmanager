export interface IUser {
  id:          string;
  abbr:        string;
  email:       string;
  fullName:    string;
  surname:     string;
  givenName:   string | null;
  pin:         string | null;
  phoneNumber: string | null;
  userName:    string;
  roles:       string[];
  claims:      Claim[];
}

export interface Claim {
  type:           string;
  value:          string;
}
