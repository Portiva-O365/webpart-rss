export interface IRSSProps {
  // header configuration
  showHeader: boolean;
  title: string;
  description: string;
  // main configuration
  rssUrl: string;
  maxItemCount: number;
  // properties per item
  showDescription: boolean;
  maxDescriptionLength: number;
  showImage: boolean;
  showPublicationDate: boolean;
  localeDate: string;
}

export interface IRSSWebPartProps extends IRSSProps { }

export interface IRSSPropsState {
  rssItemsLoaded: boolean;
  rssError: boolean;
  rssFeedInformation: any;
  rssItems: any[];
}

export interface IRSSItems {
  feed: any;
  items: any;
  maxItemCount?: number;
  hasMultipleSources: boolean;
  showDescription?: boolean;
  maxDescriptionLength: number;
  showImage?: boolean;
  showPublicationDate?: boolean;
  localeDate: string;
}

export interface IRSSItem {
  item: any;
  hasMultipleSources: boolean;
  feedTitle: string;
  feedImage: string;
  feedDescription?: string;
  showDescription?: boolean;
  maxDescriptionLength: number;
  showImage?: boolean;
  showPublicationDate?: boolean;
  localeDate: string;
}

export interface IRSSItemImage {
  showImage: boolean;
  image: any;
}
