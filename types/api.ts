export interface ApiObjectsProps {
  total: number;
  objectIDs: number[];
}

export interface ApiDetailsTagProps {
  term: string;
}

// Shared fields
export interface ApiDetailsBaseProps {
  objectID: number;
  title: string;
  elementDescrition: string | null;
  repository: string;
  primaryImage: string;
  primaryImageSmall: string;
  objectDate: string;
  tags: ApiDetailsTagProps[];
}

// Details type
export interface ApiDetailsProps extends ApiDetailsBaseProps {}

export interface ApiArtistProps extends ApiDetailsBaseProps {
  artistDisplayName: string;
  artistAlphaSort: string;
  artistDisplayBio: string;
  artistDisplayNationality: string;
  artistBeginDate: string;
  artistEndDate: string;
  artistWikidata_URL: string;
}