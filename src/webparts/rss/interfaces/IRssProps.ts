export interface IRSSProps {
  showHeader: boolean;        // show title and description above list of items
  title: string;
  description: string;
  showDescription: boolean;   // properties per item
  showImage: boolean;
  allowNewsCreation: boolean;
  rssUrl: string;
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
  allowNewsCreation?: boolean;
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
  allowNewsCreation?: boolean;
  itemLength: number;
}

export interface IRSSItemImage {
  showImage: boolean;
  image: any;
}