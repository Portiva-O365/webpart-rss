declare interface IRssWebPartStrings {
  ppHeaderDescriptionLabel: string;
  ppCommonSettingsLabel: string;
  ppShowHeaderLabel: string;
  ppTitleLabel: string;
  ppDescriptionLabel: string;
  ppRssUrlLabel: string;
  ppRssUrlDescription: string;
  ppItemCountLabel: string;
  ppShowImageLabel: string;
  ppShowDescriptionLabel: string;
  ppItemDescriptionLengthLabel: string;
  NoItemsFoundText: string;
  LoadingText: string;
}

declare module 'RssWebPartStrings' {
  const strings: IRssWebPartStrings;
  export = strings;
}
