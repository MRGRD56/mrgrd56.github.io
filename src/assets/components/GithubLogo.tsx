import React from 'react';
import { createThemedComponent } from '../../components/ThemedComponent';
import { ReactComponent as GithubLogoLight } from '../img/github-logo.svg';
import { ReactComponent as GithubLogoDark } from '../img/github-logo-dark.svg';

const GithubLogo = createThemedComponent(GithubLogoLight, GithubLogoDark);

export default GithubLogo;
