export interface League {
  Id: string;
  Name: string;
  Order: number;
  CategoryId: string;
  CountryName: string;
  CountryCode: string;
  IsInternational: boolean;
  Region: string;
  SeasonId: string;
  HasGroups: boolean;
  Abbreviation: string;
}
