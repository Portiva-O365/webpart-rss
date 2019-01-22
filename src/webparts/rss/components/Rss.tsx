import * as React from "react";
import { IRSSProps, IRSSPropsState } from "../interfaces/IRssProps";
import { RSSItems } from "./RssItems";
import styles from "./Rss.module.scss";
import * as strings from "RssWebPartStrings";

export default class Rss extends React.Component<IRSSProps, IRSSPropsState> {

  private _rssUrl: string;
  private _hasMultipleSources: boolean;

  constructor(props: IRSSProps) {

    // call parent
    super(props);

    // set class properties
    this._rssUrl = this.props.rssUrl;
    this._hasMultipleSources = false; // future update

    // initialize component
    this.state = { rssItemsLoaded: false, rssError: false, rssFeedInformation: null, rssItems: [] };
  }

  public componentDidMount(): void {

    // component mounted, load the rss items from the source
    this._loadRSSFeed();
  }

  public componentWillReceiveProps(nextProps: IRSSProps, nextState: IRSSPropsState): void {

    // component update, only load data again when RSS url has changed
    if (this.props.rssUrl !== nextProps.rssUrl) {

      // set new url
      this._rssUrl = nextProps.rssUrl;

      // reload the RSS feed
      this._loadRSSFeed();
    }
  }

  public render(): React.ReactElement<IRSSProps> {

    if (this.state.rssItemsLoaded) {

      // items loaded, show the web part
      return (
        <div className={styles.rss}>
          <div className={styles.container}>
            {
              !this.props.showHeader ? null :
                <div className={styles.headerContainer}>
                  <div className={styles.title}>
                    {this.props.title}
                  </div>
                  <div className={styles.description}>
                    {this.props.description}
                  </div>
                </div>
            }
            <RSSItems
              feed={this.state.rssFeedInformation}
              hasMultipleSources={this._hasMultipleSources}
              items={this.state.rssItems}
              maxItemCount={this.props.maxItemCount}
              showImage={this.props.showImage}
              showDescription={this.props.showDescription}
              maxDescriptionLength={this.props.maxDescriptionLength}
              showPublicationDate={this.props.showPublicationDate}
              localeDate={this.props.localeDate}/>
          </div>
        </div>
      );
    } else {

      // show status
      return (
        <div>{this.state.rssError ? strings.NoItemsFoundText : strings.LoadingText}</div>
      );
    }
  }

  private _loadRSSFeed = (): void => {
    const rssBaseUrl: string = "https://api.rss2json.com/v1/api.json?rss_url=";

    let rssUrl: string = "";
    let rssArray: string[] = [];  // version 2: multiple RSS sources

    if (this._rssUrl === "") {
      // no url, set error
      this.setState({ rssItemsLoaded: false, rssError: true, rssItems: [] });
    } else {
      // set array of rss urls
      rssArray = this._rssUrl.split(";");
      // add base url to each rss url in the array
      rssArray = rssArray.map((itemUrl: string, idx: number) => {
        return `${rssBaseUrl}${itemUrl.trim()}`;
      });

      // set sources property
      if (rssArray.length > 1) {
        // multiple RSS sources, used for printing the RSS source
        this._hasMultipleSources = true;
      }

      // add the rss url from properties
      rssUrl = rssArray[0];

      // load the contents from the rss url
      try {
        fetch(rssUrl)
          .then((result) => {
            // convert result to proper JSON
            return result.json();
          })
          .then((result) => {
            if (result.status === "ok") {
              // save rss items in state = trigger update component
              this.setState({
                rssItems: result.items,
                rssFeedInformation: result.feed,
                rssItemsLoaded: true, rssError: false
              });
            }
          })
          .catch((error: any) => {
            // error while fetching data
            this.setState({ rssItemsLoaded: false, rssError: true, rssFeedInformation: null, rssItems: [] });
          });
      } catch (error) {
        // something went wrong
        this.setState({ rssItemsLoaded: false, rssError: true, rssFeedInformation: null, rssItems: [] });
      }
    }
  }
}