import React from "react";
import MobileSearchBar from "../../common/search-bar/mobile";
import { SoccerSortOptions } from '../../../common/enums/soccer-sort-option';
import Modal from 'react-modal';
import LeaguesFilteringTable from '../leagues-filtering';
import { League } from '../filter-table/type';
import { WithTranslation } from "next-i18next";
import { withTranslation } from "../../../common/helpers/Localizer";
import { ResourceType, CommonResourceKey } from "../../../common/resources";

type State = {
    openSearch: boolean;
    openSortMenu: boolean;
};

type Props = {
    filterText: string;
    onFilterTextChange: (filterText: string) => void;
    onReset: () => void;
    placeHolder: string;
    sortByValue: number;
    onSortChange: (sortValue: number) => void;
    leagues: League[];
    selectedLeagues: string[];
    onSubmitFilterLeagues: (selectedLeagues: string[]) => void;
    onTogglePopup: () => void;
    isLeaguesFilteringPopupOpen: boolean;
} & WithTranslation;

class MobileFilterBar extends React.Component<Props, State> {
    private readonly filterBar = React.createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);
        this.state = {
            openSearch: false,
            openSortMenu: false,
        };
    }

    handleSearchClick = () => {
        const { openSearch } = this.state;
        this.setState({ openSearch: !openSearch, openSortMenu: false });
        if (openSearch) {
            this.props.onReset();
        }
    }

    handleCancelClick = () => {
        this.setState({ openSearch: false });
        this.props.onReset();
    }

    handleSortMenuClick = () => {
        this.setState({ openSortMenu: !this.state.openSortMenu });
    }

    handleClickSortOption = (option: number) => {
        this.handleSortMenuClick();
        this.props.onSortChange(option);
    }

    renderSortOption = (sortByValue: number) => {
        if (sortByValue === SoccerSortOptions.KICK_OFF_TIME) {
            return (<div onClick={() => this.handleClickSortOption(SoccerSortOptions.LEAGUE)} className="action-item">Sort by Leagues</div>);
        }

        return (<div onClick={() => this.handleClickSortOption(SoccerSortOptions.KICK_OFF_TIME)} className="action-item">Sort by Kick off time</div>);
    }

    handleClickOpenLeaguesFilteringPopup = () => {
        this.props.onTogglePopup();
        this.setState({
            openSortMenu: !this.state.openSortMenu
        });
    }

    componentDidMount () {
        ['click', 'touchend'].forEach(id => document.addEventListener(id, this.handleClickOutside));
    }

    componentWillUnmount() {
        ['click', 'touchend'].forEach(id => document.removeEventListener(id, this.handleClickOutside));
    }

    handleClickOutside = (event: MouseEvent | Event) => {
        if (!this.filterBar?.current?.contains(event.target as HTMLElement)) {
            this.setState({ openSortMenu: false });
        }
    }

    render() {
        return (
            <div ref={this.filterBar}>
                <div className="search-filter">
                    <span className="icon-search" onClick={this.handleSearchClick}></span>
                    <span className="icon-more" onClick={this.handleSortMenuClick}></span>
                </div>
                {this.state.openSearch && <MobileSearchBar {...this.props} onCancel={this.handleCancelClick} />}
                {this.state.openSortMenu && (
                    <div className="mobile-sort-menu">
                        {this.renderSortOption(this.props.sortByValue)}
                        <div className="action-item" onClick={this.handleClickOpenLeaguesFilteringPopup}>{this.props.t(CommonResourceKey.FILTER_BY_LEAGUE)}</div>
                    </div>
                )}
                <Modal
                    isOpen={this.props.isLeaguesFilteringPopupOpen}
                    ariaHideApp={false}
                    className="mobile"
                >
                    <LeaguesFilteringTable
                        leagues={this.props.leagues}
                        selectedLeagues={this.props.selectedLeagues}
                        onSubmitFilterLeagues={this.props.onSubmitFilterLeagues}
                        onCancel={this.props.onTogglePopup} />
                </Modal>
            </div>
        );
    }
}

export default withTranslation(ResourceType.COMMON)(MobileFilterBar);