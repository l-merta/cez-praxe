export interface ApiObjectsProps {
  total: number;
  objectIDs: number[];
}

export interface ApiDetailsTagProps {
  term: string;
}

// Shared fields
export interface ApiDetailsProps {
  objectID: number;
  title: string;
  elementDescrition: string | null;
  objectName: string;
  medium: string;
  culture: string;
  repository: string;
  department: string;
  isHighlight: boolean;
  city: string
  state: string;
  country: string;
  objectDate: string;
  primaryImage: string;
  primaryImageSmall: string;
  additionalImages: string[];
  tags: ApiDetailsTagProps[];
  
  artistDisplayName: string;
  artistAlphaSort: string;
  artistDisplayBio: string;
  artistDisplayNationality: string;
  artistBeginDate: string;
  artistEndDate: string;
  artistWikidata_URL: string;
}