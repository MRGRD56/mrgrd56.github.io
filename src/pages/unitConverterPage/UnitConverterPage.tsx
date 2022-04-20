import React from 'react';
import PageContainer, { PageTag } from '../../components/pageContainer/PageContainer';

const tags = [PageTag.WIP];

const UnitConverterPage = () => {
    return <PageContainer title="Unit Converter" tags={tags}></PageContainer>;
};

export default UnitConverterPage;
