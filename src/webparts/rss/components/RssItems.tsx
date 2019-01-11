import * as React from "react";
import { IRSSItems } from "../interfaces/IRssProps";
import { RSSItem } from "./RssItem";

export class RSSItems extends React.Component<IRSSItems, {}> {
    // return a list of RSSItem components
    public render(): React.ReactElement<IRSSItems> {
        return (
            <div>
                {
                    this.props.items.map((rssItem, idx) => {
                        if (idx < this.props.itemCount) {
                            return (
                                <RSSItem key={idx}
                                    feedTitle={this.props.feed.title}
                                    feedImage={this.props.feed.image}
                                    showImage={this.props.showImage}
                                    showDescription={this.props.showDescription}
                                    item={rssItem}
                                    itemLength={this.props.itemLength}
                                    hasMultipleSources={this.props.hasMultipleSources} />
                            );
                        } else {
                            return null;
                        }
                    })
                }
            </div>
        );
    }

    private _stripHTML = (inputHTML: string): string => {
        // remove any HTML character in the passed string, used to display rss description
        return inputHTML.replace(/<[^>]+>/g, "");
    }
}