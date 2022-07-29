import React, { FunctionComponent } from 'react';
import TextBiConverterPageContainer, {
    TextBiConvert
} from '../../layouts/pages/textBiConverterPageContainer/TextBiConverterPageContainer';
import getLocalStorageKey from '../../utils/getLocalStorageKey';

const EN_LAYOUT = '`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?';
const RU_LAYOUT = 'ё1234567890-=йцукенгшщзхъ\\фывапролджэячсмитьбю.Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,';

const convertEnToRu: TextBiConvert = (source) => {
    return convertInternal(source, EN_LAYOUT, RU_LAYOUT);
};

const convertRuToEn: TextBiConvert = (source) => {
    return convertInternal(source, RU_LAYOUT, EN_LAYOUT);
};

const convertInternal = (source: string, sourceLayout: string, resultLayout: string) => {
    if (sourceLayout.length !== resultLayout.length) {
        throw new Error('Different length of layouts');
    }

    return Array.from(source)
        .map((char) => {
            const index = sourceLayout.indexOf(char);
            if (index !== -1) {
                return resultLayout[index];
            }

            return char;
        })
        .join('');
};

const LayoutSwitcherPage: FunctionComponent = () => {
    return (
        <TextBiConverterPageContainer
            source1={{ title: 'QWERTY' }}
            source2={{ title: 'ЙЦУКЕН' }}
            convert1to2={convertEnToRu}
            convert2to1={convertRuToEn}
            swapStateStorageKey={getLocalStorageKey('layout-switcher', 'isSwapped')}
        />
    );
};

export default LayoutSwitcherPage;
