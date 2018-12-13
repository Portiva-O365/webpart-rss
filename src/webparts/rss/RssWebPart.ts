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
        allowNewsCreation: this.properties.allowNewsCreation,
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

  // protected get disableReactivePropertyChanges(): boolean {
  //   return true;
  // }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            // tslint:disable-next-line:max-line-length
            description: "The RSS web part allows you to show content from other sites internally but externally. For instance news sites. Enter the information below!"
          },
          groups: [
            {
              groupName: "Common Settings",
              groupFields: [
                PropertyPaneToggle("showHeader", {
                  label: "Show title and description"
                }),
                PropertyPaneTextField("title", {
                  label: "Enter the title for this web part",
                  disabled: !this.properties.showHeader
                }),
                PropertyPaneTextField("description", {
                  label: "Enter the description for this web part",
                  multiline: true, rows: 3, resizable: false,
                  disabled: !this.properties.showHeader
                }),
                PropertyPaneTextField("rssUrl", {
                  label: "Source RSS URL",
                  description: "Enter the source RSS url.",
                  multiline: true, rows: 3, resizable: false,
                }),
                PropertyPaneSlider("itemCount", {
                  label: "Number of items to display (per source)",
                  value: this.properties.itemCount,
                  min: 1, max: 10
                }),
                PropertyPaneToggle("showImage", {
                  label: "Show RSS images if available"
                }),
                PropertyPaneToggle("showDescription", {
                  label: "Show RSS descriptions if available"
                }),
                PropertyPaneSlider("itemLength", {
                  label: "Description length per item",
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
