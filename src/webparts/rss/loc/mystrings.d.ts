declare interface IRssWebPartStrings {
  ppHeaderDescriptionLabel: string;
  ppCommonSettingsLabel: string;
  ppItemSettingsLabel: string;
  ppShowHeaderLabel: string;
  ppTitleLabel: string;
  ppDescriptionLabel: string;
  ppRssUrlLabel: string;
  ppRssUrlDescription: string;
  ppItemCountLabel: string;
  ppShowImageLabel: string;
  ppShowDescriptionLabel: string;
  ppItemDescriptionLengthLabel: string;
  ppShowPublicationDateLabel: string;
  ppLocaleDateDescription: string;
  ppLocaleDateLabel: string;
  NoItemsFoundText: string;
  LoadingText: string;
}

declare module 'RssWebPartStrings' {
  const strings: IRssWebPartStrings;
  export = strings;
}
