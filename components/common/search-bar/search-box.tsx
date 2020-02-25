import React from "react";
import { SearchBarProps } from "./type";

class SearchBox extends React.Component<SearchBarProps> {
    textInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: SearchBarProps) {
        super(props);

        this.textInputRef = React.createRef<HTMLInputElement>();
    }

    handleFilterTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onFilterTextChange(event.target.value);
    };

    focus() {
        this.textInputRef.current?.focus();
    }

    render() {
        return (
            <div className="search-box">
                <span className="icon-search"></span>
                <input
                    ref={this.textInputRef}
                    type="text"
                    placeholder={this.props.placeHolder}
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                    className="txt-search"
                />
                {this.props.filterText.length > 0 && <span className="icon-close" onClick={this.props.onReset}></span>}
            </div>
        );
    }
}

export default SearchBox;