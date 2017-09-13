import {menuItems, quickItems} from './menu-items';
import {isMobile} from './lib/device-helper';

export class App {
    router = null;

    constructor() {
        this.menuItems = menuItems;
        this.quickItems = quickItems;
    }

    configureRouter(config, router) {
        config.title = 'Pragma Products';
        config.map([
            {route: ['', 'welcome'], name: 'welcome', moduleId: 'views/welcome/welcome', nav: true, title: 'Welcome'},
            {route: ['master-view'], name: 'master-view', moduleId: 'views/master-view/master-view', nav: true, title: 'Master View'},
            {route: ['sortable'], name: 'sortable', moduleId: 'views/sortable/sortable', nav: true, title: 'Sortable'},
            {route: ['longlist'], name: 'longlist', moduleId: 'views/longlist/longlist', nav: true, title: 'Long List'},
            {route: ['formtest'], name: 'formtest', moduleId: 'views/form-test/form-test', nav: true, title: 'Form Test'},
            {route: ['details'], name: 'details', moduleId: 'views/details-test/details-test', nav: true, title: 'Details'},
            {route: ['theme'], name: 'theme', moduleId: 'views/theme/theme', nav: true, title: 'Theme'},
            {route: ['tabsheet-test'], name: 'tabsheet-test', moduleId: 'views/tabsheet-test/tabsheet-test', nav: true, title: 'Tabsheet Test'},
            {route: ['master-list'], name: 'master-list-container', moduleId: 'views/master-list-container/master-list-container', nav: true, title: 'Master List Container'},
            {route: ['assistant'], name: 'assist-test', moduleId: 'views/assist-test/assist-test', nav: true, title: 'Assistant'},
            {route: ['schema-details'], name: 'schema-details', moduleId: 'views/schema-details/schema-details', nav: true, title: 'Schema Details'},
            {route: ['schema-templates'], name: 'schema-templates', moduleId: 'views/schema-templates/schema-templates', nav: true, title: 'Schema Templates'},
            {route: ['binding-test'], name: 'binding-test', moduleId: 'views/binding-test/binding-test', nav: true, title: 'Binding Tests'},
            {route: ['runtime-schema'], name: 'runtime-schema', moduleId: 'views/runtime-schema/runtime-schema', nav: true, title: 'Runtime Schema'},
            {route: ['schema-master-detail'], name: 'schema-master-detail', moduleId: 'views/schema-master-detail/schema-master-detail', nav: true, title: 'Schema Master Detail'},
            {route: ['dataset-factory'], name: 'dataset-factory', moduleId: 'views/dataset-factory/dataset-factory', nav: true, title: 'Dataset Factory'},
            {route: ['templates-and-dataset'], name: 'templates-and-dataset', moduleId: 'views/templates-and-dataset/templates-and-dataset', nav: true, title: 'templates-and-dataset'},
            {route: ['validation'], name: 'validation', moduleId: 'views/validation/validation', nav: true, title: 'Validation'},
        ]);

        this.router = router;
    }

    attached() {
        if (isMobile()) {
            this.closeAssistant();
        }
    }

    closeAssistant() {
        this.assistant.au["assistant"].viewModel.isOpen = false;
    }
}