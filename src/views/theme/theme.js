import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Theme {
    decliration;

    @bindable primaryDarkBackground;
    @bindable primaryAssistantBackground;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    attached() {
        this.eventAggregator.publish("show-assistant", true);
        this.findRootStyle();

        this.primaryAssistantBackground = this.rootStyle.getPropertyValue("--primary-background");
        this.primaryDarkBackground = this.primaryAssistantBackground;
    }

    primaryDarkBackgroundChanged(newValue) {
        this.rootStyle.setProperty("--primary-background", newValue);
    }

    primaryAssistantBackgroundChanged(newValue) {
        const assistant = document.querySelector("assistant");
        assistant.style.setProperty("--primary-background", newValue);
    }

    findRootStyle() {
        const keys = Object.keys(document.styleSheets[1].rules);

        for (let key of keys) {
            const style = document.styleSheets[1].rules[key];

            if (style.selectorText == ":root") {
                this.rootStyle = style.style;
                break;
            }
        }
    }
}