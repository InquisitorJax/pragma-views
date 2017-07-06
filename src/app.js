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
            {route: ['theme'], name: 'theme', moduleId: 'views/theme/theme', nav: true, title: 'Theme'}
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