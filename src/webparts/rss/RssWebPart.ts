import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider
} from "@microsoft/sp-webpart-base";

import * as strings from "RssWebPartStrings";
import Rss from "./components/Rss";
import { IRSSProps, IRSSWebPartProps } from "./interfaces/IRssProps";

export default class RssWebPart extends BaseClientSideWebPart<IRSSWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRSSProps> = React.createElement(
      Rss, {
        showHeader: this.properties.showHeader,
        title: this.properties.title,
        description: this.properties.description,
        showDescription: this.properties.showDescription,
        showImage: this.properties.showImage,
        rssUrl: this.properties.rssUrl,
        itemCount: this.properties.itemCount,
        itemLength: this.properties.itemLength
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.ppHeaderDescriptionLabel
          },
          groups: [
            {
              groupName: strings.ppCommonSettingsLabel,
              groupFields: [
                PropertyPaneToggle("showHeader", {
                  label: strings.ppShowHeaderLabel
                }),
                PropertyPaneTextField("title", {
                  label: strings.ppTitleLabel,
                  disabled: !this.properties.showHeader
                }),
                PropertyPaneTextField("description", {
                  label: strings.ppDescriptionLabel,
                  multiline: true, rows: 3, resizable: false,
                  disabled: !this.properties.showHeader
                }),
                PropertyPaneTextField("rssUrl", {
                  label: strings.ppRssUrlLabel,
                  description: strings.ppRssUrlDescription,
                  multiline: true, rows: 3, resizable: false,
                }),
                PropertyPaneSlider("itemCount", {
                  label: strings.ppItemCountLabel,
                  value: this.properties.itemCount,
                  min: 1, max: 10
                }),
                PropertyPaneToggle("showImage", {
                  label: strings.ppShowImageLabel
                }),
                PropertyPaneToggle("showDescription", {
                  label: strings.ppShowDescriptionLabel
                }),
                PropertyPaneSlider("itemLength", {
                  label: strings.ppItemDescriptionLengthLabel,
                  value: this.properties.itemLength,
                  min: 100, max: 500, step: 10, showValue: false, disabled: !this.properties.showDescription
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
