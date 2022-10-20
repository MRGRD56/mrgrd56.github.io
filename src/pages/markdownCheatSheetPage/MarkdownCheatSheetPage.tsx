import React, { FunctionComponent } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import AppSyntaxHighlighter from '../../components/appSyntaxHighlighter/AppSyntaxHighlighter';
import Flex from '../../components/flex/Flex';
import r from '../../utils/r';
import Text from 'antd/lib/typography/Text';

const MarkdownCheatSheetPage: FunctionComponent = () => {
    return (
        <PageContainer
            title="Markdown Cheat Sheet"
            description={<>A cheat sheet on basic markdown syntax</>}
            withComments
        >
            <Flex col maxWidth="800px">
                <h3 className="mt-1" id="bold">
                    <b>Bold</b>
                </h3>
                <AppSyntaxHighlighter
                    language="markdown"
                    children={r`
**this is a bold text**
__this is a bold text as well__  

<b>this is a bold text too</b>  
<strong>even this is a bold text</strong>
`}
                />
                <h3 className="mt-2" id="italic">
                    <i>Italic</i>
                </h3>
                <AppSyntaxHighlighter
                    language="markdown"
                    children={r`
_this is an italic text_
*this is an italic text as well*  

<i>this is an italic text too</i>  
<em>even this is an italic text</em>
`}
                />
                <h3 className="mt-2" id="strikethrough">
                    <s>Strikethrough</s>
                </h3>
                <AppSyntaxHighlighter
                    language="markdown"
                    children={r`
~~this is a strikethrough text~~

<s>this is a strikethrough text too</s>  
<del>even this is a strikethrough text</del>
`}
                />
                <h3 className="mt-2" id="underline">
                    <u>Underline</u>
                </h3>
                <AppSyntaxHighlighter
                    language="markdown"
                    children={r`
<u>It seems Markdown doesn't have its own syntax for underlined text</u>
<ins>However, we can use these HTML tags</ins>
`}
                />
                <h3 className="mt-2" id="monospace">
                    <code>Monospace</code>
                </h3>
                <AppSyntaxHighlighter
                    language="markdown"
                    children={r`
${'`'}this is a single line monospace text${'`'}
<code>you can use this HTML tag as well</code>
`}
                />
                <h3 className="mt-2" id="code-block">
                    <code>
                        <Text type="success">Code</Text>.<Text type="warning">block</Text>();
                    </code>
                </h3>
                <AppSyntaxHighlighter
                    language="markdown"
                    children={r`
${'```'}ts
const foo = () => {
    const bar = 'You can write a code block this way';
    console.log(bar, ${'`'}
it is not necessary to specify the programming language, 
though, it can highlight your code if it is supported${'`'});
};
${'```'}

${'```'}
A code block
without syntax highlighting
${'```'}

    Also, you can put 4 spaces
    at the beginning of the lines
`}
                />
                <h3 className="mt-2" id="headings">
                    Headings
                </h3>
                <AppSyntaxHighlighter
                    language="markdown"
                    children={r`
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

Heading 1 as well
==

Also heading 2
--
`}
                />
                <h3 className="mt-2" id="headings">
                    Image
                </h3>
                <AppSyntaxHighlighter
                    language="markdown"
                    children={r`
![Alt text](./path/to/image.png "Title (not required)")
`}
                />
                <h3 className="mt-2" id="headings">
                    Link
                </h3>
                <AppSyntaxHighlighter
                    language="markdown"
                    children={r`
[Link text](https://github.com/MRGRD56 "Title (still not required)")
`}
                />
                <h3 className="mt-2" id="headings">
                    Spoiler
                </h3>
                <AppSyntaxHighlighter
                    language="markdown"
                    children={r`
<details>
    <summary>Do not open</summary>
    Lorem ipsum dolor sit amet
</details>
`}
                />
            </Flex>
        </PageContainer>
    );
};

export default MarkdownCheatSheetPage;
