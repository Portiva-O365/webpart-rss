export interface IRSSProps {
  // header configuration
  showHeader: boolean;
  title: string;
  description: string;
  // main configuration
  rssUrl: string;
  // properties per item
  showDescription: boolean;
  showImage: boolean;
  showPublicationDate: boolean;
  localeDate: string;
  itemCount: number;
  itemLength: number;
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
  hasMultipleSources: boolean;
  items: any;
  itemCount?: number;
  showDescription?: boolean;
  showImage?: boolean;
  showPublicationDate?: boolean;
  localeDate: string;
  itemLength: number;
}

export interface IRSSItem {
  feedTitle: string;
  feedImage: string;
  feedDescription?: string;
  hasMultipleSources: boolean;
  item: any;
  showDescription?: boolean;
  showImage?: boolean;
  showPublicationDate?: boolean;
  localeDate: string;
  itemLength: number;
}

export interface IRSSItemImage {
  showImage: boolean;
  image: any;
}
