#Pragma Tabsheet
This control allows you to have tabs over content as a standard tabsheet.

##Usage
```html
<pragma-tabsheet id="tabsheet">
    <div id="tab0" data-tab="Tab 1">Hello World</div>
</pragma-tabsheet>
```

1. If you plan on adding tabs programatically you will need to provide the tabsheet with a id.
1. Tabs are defined as divs in the content section of the tabsheet.
1. You can have 1 to N tabs
1. The data-tab attribute on the tab represents the header that will be used
1. Provide each tab with an id
1. You can put any content you wish to show in the tab in the content section of the tab. This would be where "Hello World" is in the above example.

##Programatically

###Add
```js
this.eventAggregator.publish('addTab', {
    id: this.tabsheet.id
})
```

1. id: the id of the tabsheet

###Remove 
```js
this.eventAggregator.publish('removeTab', {
    id: this.tabsheet.id,
    tabId: "tab4"
})
```

1. id: the id of the tabsheet
1. tabId: the id of the tab to be removed

###Move
```js
this.eventAggregator.publish('moveTab', {
    fromIndex: 2,
    toIndex: 1,
})
```

1. fromIndex: index of the tab to move
1. toIndex: index where you want to tab to be