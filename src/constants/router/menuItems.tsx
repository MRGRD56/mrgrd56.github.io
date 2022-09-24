import { isSubMenuItem, MenuItem, SingleMenuItem } from '../../layouts/appLayout/utils/routeMenuItems';
import {
    BookFilled,
    DeleteFilled,
    ExclamationCircleFilled,
    GithubFilled,
    HomeFilled,
    PictureFilled,
    PlayCircleFilled,
    QuestionCircleFilled,
    SettingFilled,
    StarFilled,
    ToolFilled
} from '@ant-design/icons';
import { routes } from './routes';
import {
    AccessTime,
    AccountBox,
    Code,
    DataObject,
    DateRange,
    Difference,
    ElectricBolt,
    Filter3,
    FormatAlignLeft,
    Http,
    ImageNotSupported,
    InsertDriveFile,
    Javascript,
    Keyboard,
    NotificationsActive,
    Palette,
    Password,
    PlusOne,
    QrCode,
    QrCodeScanner,
    Subject,
    SwapHoriz,
    Wallpaper
} from '@mui/icons-material';
import TypescriptLogo from '../../assets/components/TypescriptLogo';

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
        items: [
            {
                route: routes.jsonToTypescript,
                searchText: 'typescript generator json to ts generator, json to ts converter',
                largeIcon: <TypescriptLogo width={24} height={24} />,
                description: 'Generate TypeScript types from JSON object'
            },
            {
                url: 'https://mrgrd56.github.io/online-color-picker',
                title: 'Color Picker',
                searchText: 'online color picker of colors pick a color pick colors',
                largeIcon: <Palette />,
                description: 'Pick colors from image'
            },
            {
                route: routes.jsEvaluator,
                searchText:
                    'js evaluator, execute js, run js, run javascript, execute javascript, javascript executor, js executor',
                largeIcon: <Javascript fontSize="large" />,
                description: 'Execute JavaScript online with useful features'
            },
            {
                route: routes.diffEditor,
                searchText:
                    'git diff editor, compare files, compare texts, compare two texts, difference between texts',
                largeIcon: <Difference />,
                description: 'Find difference between two texts'
            },
            {
                route: routes.codeFormatter,
                searchText: 'format code',
                largeIcon: <FormatAlignLeft />,
                description: 'Format code in any language'
            },
            {
                route: routes.uuidGenerator,
                searchText: 'guid generator',
                description: 'Generate unique identifier - UUID / GUID'
            },
            {
                route: routes.passwordGenerator,
                largeIcon: <Password />,
                description: 'Generate password with different options'
            },
            {
                route: routes.jsonStringifier,
                largeIcon: <DataObject />,
                description: 'Convert text to JSON escaped string'
            },
            {
                route: routes.qrScanner,
                searchText: 'qr code scanner, scan qr code',
                largeIcon: <QrCodeScanner />,
                description: 'Scan QR code from image'
            },
            {
                route: routes.qrGenerator,
                searchText: 'qr code generator, generate qr code',
                largeIcon: <QrCode />,
                description: 'Generate QR code in PNG or SVG format with different options'
            },
            {
                route: routes.bgGenerator,
                title: 'BG Generator',
                searchText: 'simple background generator, simple bg generator, one color background generator',
                largeIcon: <Wallpaper />,
                description: 'Generate single color background with specified size'
            },
            {
                route: routes.userInfo,
                searchText: 'client info, user ip address, my ip address, my screen resolution, my screen size',
                largeIcon: <AccountBox />,
                description: 'Get different information about yourself: IP address, user agent, browser languages, etc'
            },
            {
                route: routes.notificationsTest,
                searchText: 'browser notifications text, notifications api test',
                largeIcon: <NotificationsActive />,
                description: 'Send browser notifications for testing'
            },
            {
                route: routes.htmlEditor,
                searchText: 'html css js javascript',
                largeIcon: <Code />,
                description: 'Edit & view HTML CSS JS online'
            },
            {
                route: routes.dataUrl,
                searchText: 'generate data url',
                description: 'Generate data URL from text or file'
            },
            {
                route: routes.dataUrlViewer,
                searchText: 'view data url online',
                description: 'View data URL online'
            },
            {
                route: routes.dateUtils,
                searchText: 'difference between dates, two dates',
                largeIcon: <DateRange />,
                description: 'Different utilities on dates'
            },
            {
                route: routes.counter,
                largeIcon: <PlusOne />,
                description: 'Count something online'
            },
            {
                route: routes.jsEventTester,
                searchText: 'test javascript event tester',
                description: 'Check how different JS events work'
            },
            {
                route: routes.clock,
                searchText: 'clock with seconds online',
                largeIcon: <AccessTime />,
                description: 'Real time clock with seconds'
            },
            {
                route: routes.jsonToYaml,
                searchText:
                    'convert json to yaml converter online, convert yaml to json converter online, convert json to yml to json converter',
                largeIcon: <DataObject />,
                description: 'Convert JSON to YAML and back'
            },
            {
                route: routes.base64,
                searchText: 'encode base64, decode base64, base64 converter',
                largeIcon: <Subject />,
                description: 'Encode / decode base64'
            },
            {
                route: routes.urlEncoder,
                searchText: 'encode url encode uri encoder',
                largeIcon: <SwapHoriz />,
                description: 'Encode / decode URL'
            },
            {
                route: routes.layoutSwitcher,
                searchText:
                    'switch keyboard layout russian to english qwerty йцукен сменить раскладку клавиатуры смена раскладки клавиатуры раскладка клавиатуры поменять',
                largeIcon: <Keyboard />,
                description: 'Switch keyboard layout of text'
            },
            {
                route: routes.htmlEntities,
                searchText: 'decode html text decode html entities decode xml entities decoder online',
                description: 'Encode / decode HTML/XML entities like &#x41c;'
            },
            {
                route: routes.prettyBytes,
                searchText: 'pretty bytes to human readable format bytes',
                largeIcon: <InsertDriveFile />,
                description: 'Convert bytes to human readable unit like kbytes or mbytes'
            },
            {
                route: routes.numberGuesser,
                searchText: 'guess the number in range limits less greater',
                largeIcon: <Filter3 />,
                description: "Guess the number in the specified range, telling if it's higher or lower"
            },
            {
                route: routes.hhDictionaries,
                searchText: 'hh dictionaries headhunter dictionaries explorer viewer browser',
                description: 'View the dictionaries on hh.ru API'
            },
            {
                route: routes.imageCompressor,
                searchText:
                    'compress image compressor convert png to jpg to png to jpeg to png to webp to jpg to webp to jpeg to webp',
                largeIcon: <ImageNotSupported />,
                description: 'Compress an image or convert it to another format'
            },
            {
                route: routes.httpClient,
                searchText: 'http client postman online send http request axios fetch',
                largeIcon: <Http />,
                description: 'Send HTTP request in your browser (no backend)',
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
        items: [
            {
                route: routes.snakeGame,
                title: 'Snake'
            }
        ]
    },
    {
        title: 'Articles',
        icon: BookFilled,
        items: [
            {
                route: routes.markdownCheatSheet
            }
        ]
    },
    {
        title: 'Other',
        icon: StarFilled,
        items: [
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
                icon: ElectricBolt
            },
            {
                route: routes.jetBrainsUI,
                icon: PictureFilled
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

const getMenuItemRouteItems = (menuItem: MenuItem): SingleMenuItem[] => {
    if (isSubMenuItem(menuItem)) {
        return menuItem.items.flatMap(getMenuItemRouteItems);
    }

    return [menuItem];
};

export const menuRouteItems: SingleMenuItem[] = menuItems.flatMap(getMenuItemRouteItems);
