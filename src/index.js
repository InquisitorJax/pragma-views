import {PLATFORM} from 'aurelia-pal';

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
export * from './lib/schema';

export function configure(aurelia, configCallback) {
    const builder = aurelia.container.get(ConfigBuilder);

    if (configCallback !== undefined && typeof(configCallback) === 'function') {
        configCallback(builder);
    }

    aurelia.globalResources(builder.globalResources);
}

class ConfigBuilder {
    globalResources = [];

    useAll() {
        return this
            .useAssistant()
            .useGroup()
            .useIcons()
            .useInput()
            .useMasterList()
            .useDynamicScreens()
            .useMenu()
            .useMasterDetail()
            .useCollections()
            .useToolItems()
            .useNotifications()
            .useTabsheet()
    }

    useAssistant() {
        this.globalResources.push(PLATFORM.moduleName('./components/assistant/assistant'));
        return this;
    }

    useGroup() {
        this.globalResources.push(PLATFORM.moduleName('./components/group/group'));
        return this;
    }

    useIcons() {
        this.globalResources.push(PLATFORM.moduleName('./components/icons/icon.html'));
        this.globalResources.push(PLATFORM.moduleName('./components/icons/icons.html'));
        return this;
    }

    useInput() {
        this.globalResources.push(PLATFORM.moduleName('./components/form-search/form-search.html'));
        this.globalResources.push(PLATFORM.moduleName('./components/input-composite/input-composite'));
        return this;
    }

    useMasterList() {
        this.globalResources.push(PLATFORM.moduleName('./components/master-list-container/master-list-container'));
        this.globalResources.push(PLATFORM.moduleName('./components/order-group/order-group'));
        this.globalResources.push(PLATFORM.moduleName('./components/percentage-chart/percentage-chart'));
        return this;
    }

    useDynamicScreens() {
        this.globalResources.push(PLATFORM.moduleName('./components/pragma-template/pragma-template'));
        this.globalResources.push(PLATFORM.moduleName('./components/pragma-form/pragma-form'));
        this.globalResources.push(PLATFORM.moduleName('./components/pragma-details/pragma-details'));
        return this;
    }

    useMenu() {
        this.globalResources.push(PLATFORM.moduleName('./components/menu/menu'));
        return this;
    }

    useMasterDetail() {
        this.globalResources.push(PLATFORM.moduleName('./components/master-detail/master-detail'));
        return this;
    }

    useCollections() {
        this.globalResources.push(PLATFORM.moduleName('./custom-attributes/selectable'));
        this.globalResources.push(PLATFORM.moduleName('./components/sortable-list/sortable-list'));
        return this;
    }

    useToolItems() {
        this.globalResources.push(PLATFORM.moduleName('./components/pragma-dropdown-menu/pragma-dropdown-menu'));
        this.globalResources.push(PLATFORM.moduleName('./components/pragma-options-toolbar/pragma-options-toolbar'));
        return this;
    }

    useNotifications() {
        this.globalResources.push(PLATFORM.moduleName('./components/pragma-messages/pragma-messages'));
        return this;
    }

    useTabsheet() {
        this.globalResources.push(PLATFORM.moduleName('./components/pragma-tabsheet/pragma-tabsheet'));
        return this;
    }
}