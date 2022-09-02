import React from 'react';
import { ReactComponent as LightLogo } from '../img/typescript-logo-light.svg';
import { ReactComponent as DarkLogo } from '../img/typescript-logo-dark.svg';
import { createThemedComponent } from '../../components/ThemedComponent';

const TypescriptLogo = createThemedComponent(LightLogo, DarkLogo);

export default React.memo(TypescriptLogo);
