import * as React from "react";
import { IRSSItemImage } from "../interfaces/IRssProps";
import styles from "./Rss.module.scss";

export class RSSItemImage extends React.Component<IRSSItemImage, {}> {
    public render(): React.ReactElement<IRSSItemImage> {
        if (this.props.showImage) {
            return (
                <div className={styles.imageContainer}>
                    <img src={this.props.image.link} alt="" title="" className={styles.image} />
                </div>
            );
        } else {
            return (
                <div className={styles.bulletContainer}>
                    <i className="ms-Icon ms-Icon--Forward" aria-hidden="true"></i>
                </div>
            );
        }
    }
}