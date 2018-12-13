import * as React from "react";
import { IRSSItem } from "../interfaces/IRssProps";
import { RSSItemImage } from "./RssItemImage";
import styles from "./Rss.module.scss";

export class RSSItem extends React.Component<IRSSItem, {}> {
    // component to show RSS item

    public render(): React.ReactElement<IRSSItem> {
        return (
            <div className={styles.rssItemContainer}>
                <RSSItemImage showImage={this.props.showImage} image={this.props.item.enclosure} />
                <div className={styles.contentContainer}>
                    <div className={styles.title}>
                        <a href={this.props.item.link} target="_blank">
                            <div title={this._stripHTML(this.props.item.title)}>
                                {this._stripHTML(this.props.item.title)}
                            </div>
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
                        <span className={styles.title}>
                            {this.props.feedTitle}
                        </span>
                        <span className={styles.title}>
                            &nbsp;| {this.props.item.pubDate}
                        </span>
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
        return `${inputDescription.substring(0, this.props.itemLength)}...`;
    }
}
