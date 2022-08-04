import { isSubMenuItem, MenuItem, MenuRouteItem } from '../../layouts/appLayout/utils/routeMenuItems';
import {
    BookFilled,
    DeleteFilled,
    ExclamationCircleFilled,
    GithubFilled,
    HomeFilled,
    PlayCircleFilled,
    QuestionCircleFilled,
    SettingFilled,
    StarFilled,
    ToolFilled
} from '@ant-design/icons';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { routes } from './routes';

const menuItems: MenuItem[] = [
    {
        route: routes.root,
        icon: HomeFilled,
        title: 'Home page',
        searchText: 'home page, root page, homepage, index page'
    },
    {
        route: routes.githubPagesList,
        icon: GithubFilled
    },
    {
        title: 'Tools',
        icon: ToolFilled,
        routes: [
            {
                route: routes.jsonToTypescript,
                searchText: 'typescript generator'
            },
            {
                route: routes.jsEvaluator,
                searchText: 'js evaluator, execute js, execute javascript'
            },
            {
                route: routes.diffEditor,
                searchText: 'git diff editor, compare files, compare texts, compare two texts, difference between texts'
            },
            {
                route: routes.codeFormatter,
                searchText: 'format code'
            },
            {
                route: routes.uuidGenerator,
                searchText: 'guid generator'
            },
            {
                route: routes.passwordGenerator
            },
            {
                route: routes.jsonStringifier
            },
            {
                route: routes.qrScanner,
                searchText: 'qr code scanner, scan qr code'
            },
            {
                route: routes.qrGenerator,
                searchText: 'qr code generator, generate qr code'
            },
            {
                route: routes.bgGenerator,
                title: 'BG Generator',
                searchText: 'simple background generator, simple bg generator, one color background generator'
            },
            {
                route: routes.userInfo,
                searchText: 'client info, user ip address, my ip address, my screen resolution, my screen size'
            },
            {
                route: routes.notificationsTest,
                searchText: 'browser notifications text, notifications api test'
            },
            {
                route: routes.htmlEditor,
                searchText: 'html css js javascript'
            },
            {
                route: routes.dataUrl,
                searchText: 'generate data url'
            },
            {
                route: routes.dataUrlViewer,
                searchText: 'view data url online'
            },
            {
                route: routes.dateUtils,
                searchText: 'difference between dates, two dates'
            },
            {
                route: routes.counter
            },
            {
                route: routes.jsEventTester,
                searchText: 'test javascript event tester'
            },
            {
                route: routes.clock,
                searchText: 'clock with seconds online'
            },
            {
                route: routes.jsonToYaml,
                searchText: 'convert json to yaml converter online, convert yaml to json converter online'
            },
            {
                route: routes.base64,
                searchText: 'encode base64, decode base64, base64 converter'
            },
            {
                route: routes.urlEncoder,
                searchText: 'encode url encode uri encoder'
            },
            {
                route: routes.layoutSwitcher,
                searchText:
                    'switch keyboard layout russian to english qwerty йцукен сменить раскладку клавиатуры смена раскладки клавиатуры раскладка клавиатуры поменять'
            },
            {
                route: routes.htmlEntities,
                searchText: 'decode html text decode html entities decode xml entities decoder'
            },
            {
                route: routes.prettyBytes,
                searchText: 'pretty bytes to human readable format bytes'
            },
            {
                route: routes.imageCompressor,
                isHidden: true
            },
            {
                route: routes.templateTextGenerator,
                isHidden: true
            },
            {
                route: routes.unitConverter,
                isHidden: true
            }
        ]
    },
    {
        title: 'Games',
        icon: PlayCircleFilled,
        routes: [
            {
                route: routes.snakeGame,
                title: 'Snake'
            }
        ]
    },
    {
        title: 'Articles',
        icon: BookFilled,
        routes: [
            {
                route: routes.markdownCheatSheet
            }
        ]
    },
    {
        title: 'Other',
        icon: StarFilled,
        routes: [
            {
                route: routes.longContent,
                icon: DeleteFilled
            },
            {
                route: routes.notFound,
                icon: QuestionCircleFilled,
                searchText: '404 not found page'
            },
            {
                route: routes.rooksDemo,
                icon: ElectricBoltIcon
            }
        ]
    },
    {
        route: routes.settings,
        icon: SettingFilled
    },
    {
        route: routes.about,
        icon: ExclamationCircleFilled,
        searchText: 'info'
    }
];

export default menuItems;

const getMenuItemRouteItems = (menuItem: MenuItem): MenuRouteItem[] => {
    if (isSubMenuItem(menuItem)) {
        return menuItem.routes.flatMap(getMenuItemRouteItems);
    }

    return [menuItem];
};

export const menuRouteItems: MenuRouteItem[] = menuItems.flatMap(getMenuItemRouteItems);
