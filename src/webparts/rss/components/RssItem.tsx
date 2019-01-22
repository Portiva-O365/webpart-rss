import * as React from "react";
import { IRSSItem } from "../interfaces/IRssProps";
import { RSSItemImage } from "./RssItemImage";
import styles from "./Rss.module.scss";
import * as moment from "moment";

export class RSSItem extends React.Component<IRSSItem, {}> {

  // component to show RSS item
  public render(): React.ReactElement<IRSSItem> {
    return (
      <div className={styles.rssItemContainer}>
        <RSSItemImage
          image={this.props.item.enclosure}
          showImage={this.props.showImage} />
        
        <div className={styles.contentContainer}>
          <div className={styles.title}>
            <a href={this.props.item.link} target="_blank">
              <div title={this._stripHTML(this.props.item.title)} dangerouslySetInnerHTML={{ __html: this.props.item.title }}/>
            </a>
          </div>
          {
            !this.props.showDescription ? null :
              <div className={styles.description}>
                {this._shortenDescription(this._stripHTML(this.props.item.description))}
              </div>
          }
          <div className={styles.feedInfoContainer}>
            <span>
              <i className={`ms-Icon ms-Icon--News ${styles.feedImage}`} aria-hidden="true"></i>
            </span>
            <span className={styles.title} dangerouslySetInnerHTML={{ __html: this.props.feedTitle }} />
            {
              !this.props.showPublicationDate ? null :
                <span className={styles.title}>
                  &nbsp;| {this._getPublicationDate(this.props.item.pubDate)}
                </span>
            }
          </div>
        </div>
      </div>
    );
  }

  private _stripHTML = (inputHTML: string): string => {
    // remove any HTML character in the passed string, used to display rss description
    return inputHTML.replace(/<[^>]+>/g, "");
  }

  private _shortenDescription = (inputDescription: string): string => {
    // return a shortend description
    return `${inputDescription.substring(0, this.props.maxDescriptionLength)}...`;
  }

  private _getPublicationDate = (pubDate: string): string => {
    // format the current string as a correct date string, no time is returned
    moment.locale(this.props.localeDate);
    // return the publication date, no time
    return moment(pubDate).format("LL").toString();
  }
}