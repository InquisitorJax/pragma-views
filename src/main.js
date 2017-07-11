export function configure(aurelia) {
    return new Promise((resolve) => {
        aurelia.use
            .standardConfiguration()
            .developmentLogging()
            .globalResources(
                'pragma-menu/pragma-menu',
                'components/menu/menu',
                'components/input-composite/input-composite',
                'components/master-detail/master-detail',
                'components/assistant/assistant',
                'components/form-search/form-search.html',
                'components/icons/icons.html',
                'components/icons/icon.html',
                'components/pragma-messages/pragma-messages',
                'custom-attributes/selectable',
                'components/order-group/order-group',
                'components/percentage-chart/percentage-chart',
                'components/master-list-container/master-list-container',
                'components/pragma-options-toolbar/pragma-options-toolbar',
                'components/pragma-dropdown-menu/pragma-dropdown-menu',
                'components/pragma-template/pragma-template',
                'components/group/group',
                'components/sortable-list/sortable-list',
                'components/pragma-list/pragma-list',
                'components/pragma-form/pragma-form',
                'components/pragma-tabsheet/pragma-tabsheet'
            );

        aurelia.use.plugin('aurelia-dialog');
        aurelia.use.plugin('aurelia-ui-virtualization');

        aurelia.start().then(() => {
            aurelia.setRoot();
            resolve();
        });
    });
}