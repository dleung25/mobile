import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as matchDetailsActions from '../actions/match_details_act';

import _ from 'lodash';

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import MatchOverview from './MatchOverview';
import MatchBenchmark from './MatchBenchmark';
import MatchPerformance from './MatchPerformance';
import MatchLaning from './MatchLaning';

import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    matchDetails: state.matchDetailsState.matchDetails,
    isLoadingMatchDetails: state.matchDetailsState.isLoadingMatchDetails,
    isEmptyMatchDetails: state.matchDetailsState.isEmptyMatchDetails,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    mod: state.settingsState.mod,
    alpha: state.settingsState.alpha,
    parent: state.navigationState.parent,
    tracker: state.navigationState.tracker,
    theme: state.settingsState.theme,
    background: state.settingsState.background,
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(matchDetailsActions, dispatch)
});

class MatchDetailsPage extends Component {

    constructor(props) {
        super(props);
        if (!this.props.isLoadingMatchDetails) {
            this.props.actions.fetchMatchDetails(this.props.data)
        }
    }

    componentDidMount() {
        this.props.tracker.trackScreenView('Match Details');
    }

    render() {
        var content = (<View />);
        if (this.props.isLoadingMatchDetails) {
            content = (
                <View style={styles.contentContainer}>
                    <ActivityIndicator size="large" color={this.props.legend} />
                </View>
            );
        } else if (this.props.isEmptyMatchDetails) {
            content = (
                <View style={styles.contentContainer}>
                    <Text style={styles.noDataText}>No data found</Text>
                </View>
            );
        } else if (!_.isEmpty(this.props.matchDetails)) {
            if (this.props.matchDetails.radiant_gold_adv) {
                content = (
                    <ScrollableTabView tabBarPosition="bottom" tabBarTextStyle={styles.tabBarText}
                        tabBarBackgroundColor={this.props.alpha} tabBarActiveTextColor={this.props.legend} tabBarInactiveTextColor={this.props.secondLegend}
                        tabBarUnderlineStyle={[styles.tabBarUnderlineStyle, { backgroundColor: this.props.legend }]}
                        renderTabBar={() => <ScrollableTabBar />} locked={true}>
                        <MatchOverview tabLabel="Overview" />
                        <MatchBenchmark tabLabel="Benchmarks" />
                        <MatchPerformance tabLabel="Performances" />
                        <MatchLaning tabLabel="Laning" />
                    </ScrollableTabView>
                );
            } else {
                content = (
                    <ScrollableTabView tabBarPosition="bottom" tabBarTextStyle={styles.tabBarText}
                        tabBarBackgroundColor={this.props.alpha} tabBarActiveTextColor={this.props.legend} tabBarInactiveTextColor={this.props.secondLegend}
                        tabBarUnderlineStyle={[styles.tabBarUnderlineStyle, { backgroundColor: this.props.legend }]}
                        renderTabBar={() => <ScrollableTabBar />} locked={true}>
                        <MatchOverview tabLabel="Overview" />
                        <MatchBenchmark tabLabel="Benchmarks" />
                    </ScrollableTabView>
                );
            }
        } else {
            return (<View />);
        }
        return (
            <View style={[styles.container, { backgroundColor: this.props.background }]}>
                {content}
            </View>
        )
    }

}

const baseStyles = _.extend(base.general, {
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    tabBarText: {
        fontFamily: Fonts.base,
        fontSize: 16,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    tabBarUnderlineStyle: {

    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(MatchDetailsPage);
