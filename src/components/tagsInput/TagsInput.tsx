import React, { ChangeEventHandler } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag, Tooltip } from 'antd';

interface Props {
    values: string[];
    onChange: (values: string[]) => void;
}

// const TagsInput: FunctionComponent<Props> = ({values, onChange}) => {
//     const [newTagValue, setNewTagValue] = useInputState<string>();
//
//     const handleTagRemove = useCallback((index: number) => () => {
//         onChange(remove(values, (v, i) => i === index));
//     }, [onChange, values]);
//
//     return (
//         <Space direction="horizontal">
//             {values.map((value, index) => (
//                 <Tag closable onClose={handleTagRemove(index)}>{value}</Tag>
//             ))}
//         </Space>
//     );
// };

/** source: https://ant.design/components/tag/#components-tag-demo-control */

class TagsInput extends React.Component<Props, any> {
    private input: any;
    private editInput: any;

    state = {
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: ''
    };

    handleClose = (removedTag: string) => {
        const tags = this.props.values.filter((tag) => tag !== removedTag);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        if (inputValue && this.props.values.indexOf(inputValue) === -1) {
            this.props.onChange([...this.props.values, inputValue]);
        }
        this.setState({
            inputVisible: false,
            inputValue: ''
        });
    };

    handleEditInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({ editInputValue: e.target.value });
    };

    handleEditInputConfirm = () => {
        this.setState(({ tags, editInputIndex, editInputValue }: any) => {
            const newTags = [...tags];
            newTags[editInputIndex] = editInputValue;

            this.props.onChange(newTags);

            return {
                editInputIndex: -1,
                editInputValue: ''
            };
        });
    };

    saveInputRef = (input: any) => {
        this.input = input;
    };

    saveEditInputRef = (input: any) => {
        this.editInput = input;
    };

    render() {
        const { inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
        const { values } = this.props;
        return (
            <>
                {values.map((tag, index) => {
                    if (editInputIndex === index) {
                        return (
                            <Input
                                ref={this.saveEditInputRef}
                                key={tag}
                                size="small"
                                className="tag-input"
                                value={editInputValue}
                                onChange={this.handleEditInputChange}
                                onBlur={this.handleEditInputConfirm}
                                onPressEnter={this.handleEditInputConfirm}
                            />
                        );
                    }

                    const isLongTag = tag.length > 20;

                    const tagElem = (
                        <Tag className="edit-tag" key={tag} closable onClose={() => this.handleClose(tag)}>
                            <span
                                onDoubleClick={(e) => {
                                    if (index !== 0) {
                                        this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                                            this.editInput.focus();
                                        });
                                        e.preventDefault();
                                    }
                                }}
                            >
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        className="tag-input"
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag className="site-tag-plus" onClick={this.showInput}>
                        <PlusOutlined /> New Tag
                    </Tag>
                )}
            </>
        );
    }
}

export default TagsInput;
