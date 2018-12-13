import * as React from "react";
import { IRSSProps, IRSSPropsState } from "../interfaces/IRssProps";
import { RSSItems } from "./RssItems";
import styles from "./Rss.module.scss";

export default class Rss extends React.Component<IRSSProps, IRSSPropsState> {

  private _rssUrl: string;
  private _hasMultipleSources: boolean;

  constructor(props: IRSSProps) {
    // call parent
    super(props);
    // set class properties
    this._rssUrl = this.props.rssUrl;
    this._hasMultipleSources = false;
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
              items={this.state.rssItems}
              itemCount={this.props.itemCount}
              showDescription={this.props.showDescription} showImage={this.props.showImage}
              itemLength={this.props.itemLength}
              hasMultipleSources={this._hasMultipleSources}/>
          </div>
        </div>
      );
    } else {
      // items loading or error
      if (this.state.rssError) {
        // there was an error, url probably incorrect
        return (
          <div>Oops, we could not load any RSS items, check the RSS url in the properties...</div>
        );
      } else {
        // rss still loading
        return (
          <div>loading...</div>
        );
      }
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

      //
      // version 2: allow multiple RSS feeds, for now: just take the first feed in line...
      //

      // add the rss url from properties
      rssUrl = rssArray[0];

      // //
      // // https://stackoverflow.com/questions/33886555/can-promise-load-multi-urls-in-order
      // //
      // rssArray.reduce((rssPromise: any, rssItemUrl) => {
      //   return rssPromise.then(() => {
      //     // process the rss items here...
      //     console.log(rssItemUrl);
      //     return fetch(rssUrl)
      //       .then((result) => {
      //         // convert result to proper JSON
      //         return result.json();
      //       });
      //   });
      // }, Promise.resolve())
      //   .then((results: any) => {
      //     // process all results here...
      //     console.log(results);
      //   })
      //   .catch((err: any) => {
      //     // something went wrong in processing the items
      //     console.log(err);
      //   });

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


