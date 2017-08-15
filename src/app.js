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
            {route: ['input-tests'], name: 'input-tests', moduleId: 'views/input-tests/input-tests', nav: true, title: 'Input Tests'},
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
            {route: ['binding-test'], name: 'binding-test', moduleId: 'views/binding-test/binding-test', nav: true, title: 'Binding Tests'}

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