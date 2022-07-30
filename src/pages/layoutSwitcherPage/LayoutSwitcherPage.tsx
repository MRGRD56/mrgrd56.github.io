import React, { FunctionComponent } from 'react';
import TextBiConverterPageContainer, {
    EditorType,
    TextBiConvert
} from '../../layouts/pages/textBiConverterPageContainer/TextBiConverterPageContainer';
import getLocalStorageKey from '../../utils/getLocalStorageKey';

const EN_LAYOUT = '`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?';
const RU_LAYOUT = 'ё1234567890-=йцукенгшщзхъ\\фывапролджэячсмитьбю.Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,';

const mapLayouts = (sourceLayout: string, targetLayout: string): Record<string, string> => {
    if (sourceLayout.length !== targetLayout.length) {
        throw new Error('Different length of layouts');
    }

    const result: Record<string, string> = {};

    for (let i = 0; i < sourceLayout.length; i++) {
        result[sourceLayout[i]] = targetLayout[i];
    }

    return result;
};

const EN_RU_MAP = mapLayouts(EN_LAYOUT, RU_LAYOUT);
const RU_EN_MAP = mapLayouts(RU_LAYOUT, EN_LAYOUT);

const switchLayout = (source: string, layoutMap: Record<string, string>): string => {
    return Array.from(source)
        .map((char) => layoutMap[char] ?? char)
        .join('');
};

const switchEnToRu: TextBiConvert = (source) => switchLayout(source, EN_RU_MAP);

const switchRuToEn: TextBiConvert = (source) => switchLayout(source, RU_EN_MAP);

const LayoutSwitcherPage: FunctionComponent = () => {
    return (
        <TextBiConverterPageContainer
            source1={{ title: 'QWERTY', editorType: EditorType.PLAIN }}
            source2={{ title: 'ЙЦУКЕН', editorType: EditorType.PLAIN }}
            convert1to2={switchEnToRu}
            convert2to1={switchRuToEn}
            swapStateStorageKey={getLocalStorageKey('layout-switcher', 'isSwapped')}
        />
    );
};

export default LayoutSwitcherPage;
