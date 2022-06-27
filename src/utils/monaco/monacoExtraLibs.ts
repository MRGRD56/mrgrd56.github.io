import { Monaco } from '@monaco-editor/react';

type AddLibrary = (monaco: Monaco) => Promise<void>;

const createAddTypes = (monaco: Monaco) => {
    const add = (contents: string, typesLocation?: string): void => {
        monaco.languages.typescript.javascriptDefaults.addExtraLib(contents, typesLocation);
    };

    const addLibrary = async (importedTypes: Promise<RawLoaded>, typesLocation: string): Promise<void> => {
        add((await importedTypes).default, typesLocation);
    };

    addLibrary.custom = add;

    return addLibrary;
};

class MonacoExtraLibs {
    lodash: AddLibrary = async (monaco) => {
        const addTypes = createAddTypes(monaco);
        await addTypes(import('!raw-loader!@types/lodash/index.d.ts'), '@types/lodash/index.d.ts');
        await addTypes(import('!raw-loader!@types/lodash/common/common.d.ts'), '@types/lodash/common/common.d.ts');
        await addTypes(import('!raw-loader!@types/lodash/common/array.d.ts'), '@types/lodash/common/array.d.ts');
        await addTypes(
            import('!raw-loader!@types/lodash/common/collection.d.ts'),
            '@types/lodash/common/collection.d.ts'
        );
        await addTypes(import('!raw-loader!@types/lodash/common/date.d.ts'), '@types/lodash/common/date.d.ts');
        await addTypes(import('!raw-loader!@types/lodash/common/function.d.ts'), '@types/lodash/common/function.d.ts');
        await addTypes(import('!raw-loader!@types/lodash/common/lang.d.ts'), '@types/lodash/common/lang.d.ts');
        await addTypes(import('!raw-loader!@types/lodash/common/math.d.ts'), '@types/lodash/common/math.d.ts');
        await addTypes(import('!raw-loader!@types/lodash/common/number.d.ts'), '@types/lodash/common/number.d.ts');
        await addTypes(import('!raw-loader!@types/lodash/common/object.d.ts'), '@types/lodash/common/object.d.ts');
        await addTypes(import('!raw-loader!@types/lodash/common/seq.d.ts'), '@types/lodash/common/seq.d.ts');
        await addTypes(import('!raw-loader!@types/lodash/common/string.d.ts'), '@types/lodash/common/string.d.ts');
        await addTypes(import('!raw-loader!@types/lodash/common/util.d.ts'), '@types/lodash/common/util.d.ts');
    };
    axios: AddLibrary = async (monaco) => {
        const addTypes = createAddTypes(monaco);
        // await addTypes(import('!raw-loader!axios/index.d.ts'), 'axios/index.d.ts');
        // TODO
        addTypes.custom(`
        declare const axios: any;
        `);
    };
    pluralize: AddLibrary = async (monaco) => {
        const addTypes = createAddTypes(monaco);
        await addTypes(import('!raw-loader!@types/pluralize/index.d.ts'), '@types/pluralize/index.d.ts');
    };

    moment: AddLibrary = async (monaco) => {
        const addTypes = createAddTypes(monaco);
        // await addTypes(import('!raw-loader!moment/moment.d.ts'), 'moment/moment.d.ts');
        addTypes.custom(`
        declare const moment: any;
        `);
    };
}

const monacoExtraLibs = new MonacoExtraLibs();

export default monacoExtraLibs;
