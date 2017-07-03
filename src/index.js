// dialogs
export * from './dialogs/dynamic-dialog/dynamic-dialog';

// library
export * from './lib/array-helpers';
export * from './lib/canvas-helpers';
export * from './lib/device-helper';
export * from './lib/dynamic-schema';
export * from './lib/dynamic-view-factory'
export * from './lib/dynamic-view-loader';
export * from './lib/group-worker';
export * from './lib/input-listener';
export * from './lib/template-parser';
export * from './lib/template-parser-contstants';

export function configure(config) {
    config.globalResources(
        './components/assistant/assistant',
        './components/group/group',
        './components/form-search/form-search.html',
        './components/icons/icon.html',
        './components/icons/icons.html',
        './components/input-composite/input-composite',
        './components/master-detail/master-detail',
        './components/master-list-container/master-list-container',
        './components/menu/menu',
        './components/order-group/order-group',
        './components/percentage-chart/percentage-chart',
        './components/pragma-dropdown-menu/pragma-dropdown-menu',
        './components/pragma-messages/pragma-messages',
        './components/pragma-options-toolbar/pragma-options-toolbar',
        './components/sortable-list/sortable-list',
        './components/pragma-template/pragma-template',
        './components/pragma-form/pragma-form',
        './custom-attributes/selectable'
    );
}