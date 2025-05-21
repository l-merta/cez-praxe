export interface ApiObjectsProps {
  total: number;
  objectIDs: number[];
}
export interface ApiDetailsProps {
  objectID: number;
  title: string;
  elementDescrition: string | null;
  repository: string;
  primaryImage: string;
  primaryImageSmall: string;
  objectDate: string;
}