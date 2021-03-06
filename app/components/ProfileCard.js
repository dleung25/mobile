import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import Slider from 'react-native-slider';

import { IconCheese, IconContributor, RankIcon, ShadowHelper } from './Icons'

import _ from 'lodash';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend
});

class ProfileCard extends Component {

    constructor(props) {
        super(props);
        this.onURLPressed = this.onURLPressed.bind(this);
    }

    onURLPressed(url) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                return Linking.openURL(url);
            }
        }).catch();
    }

    render() {
        const { info, wl } = this.props;
        const { profile, rank_tier: rankTier, leaderboard_rank: leaderboardRank } = info;
        if (profile) {
            var name;
            var winrate = 0;
            var url;
            if (info.profile.loccountrycode) {
                name = <Text style={[styles.name, { color: this.props.secondLegend }]}>{info.profile.personaname} ({info.profile.loccountrycode})</Text>;
            } else {
                name = <Text style={[styles.name, { color: this.props.secondLegend }]}>{info.profile.personaname}</Text>;
            }
            if (wl.win && wl.lose) {
                winrate = wl.win / (wl.win + wl.lose);
            }
            let winPercentage = Math.round(winrate * 10000) / 100;

            if (info.profile.profileurl) {
                url = (
                    <TouchableOpacity style={styles.urlContainer} onPress={() => this.onURLPressed(info.profile.profileurl)}>
                        <Text style={{ color: this.props.secondLegend, textDecorationLine: 'underline', fontFamily: Fonts.base }}>{info.profile.profileurl}</Text>
                    </TouchableOpacity>
                )
            } else {
                url = <View />
            }

            return (
                <View style={[styles.profileCardContainer, { backgroundColor: this.props.mod }]}>

                    <View style={{ flexDirection: 'column' }}>
                        <View style={[styles.profileAvatarContainer]}>
                            <Image style={[styles.bigImageAvatar, { marginTop: 4 }]} source={{ uri: info.profile.avatarfull }} />
                            <View style={styles.nameContainer}>
                                {name}
                            </View>
                            <View style={baseStyles.profileIcons}>
                                {profile.is_contributor && <ShadowHelper style={baseStyles.contributorIcon}><IconContributor style={baseStyles.contributorIcon}/></ShadowHelper>}
                                {profile.cheese > 0 && <ShadowHelper style={baseStyles.cheeseIcon}><IconCheese style={baseStyles.cheeseIcon}/></ShadowHelper>}
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                <View style={{ alignItems: 'center', flex: 1 }}>
                                    <Text style={[styles.captionText, { color: this.props.legend }]}>WINS</Text>
                                    <Text style={[styles.contentText, { color: this.props.secondLegend }]}>{wl.win}</Text>
                                </View>
                                <View style={{ alignItems: 'center', flex: 1 }}>
                                    <Text style={[styles.captionText, { color: this.props.legend }]}>LOSSES</Text>
                                    <Text style={[styles.contentText, { color: this.props.secondLegend }]}>{wl.lose}</Text>
                                </View>
                                <View style={{ alignItems: 'center', flex: 1 }}>
                                    <Text style={[styles.captionText, { color: this.props.legend }]}>WINRATE</Text>
                                    <Text style={[styles.contentText, { color: this.props.secondLegend }]}>{winPercentage}%</Text>
                                </View>
                            </View>
                                <RankIcon rankTier={rankTier} leaderboardRank={leaderboardRank} />

                        </View>
                    </View>

                    <Slider disabled={true}
                        value={winrate}
                        minimumTrackTintColor={Colors.win}
                        maximumTrackTintColor={Colors.lose}
                        thumbStyle={styles.hiddenThumb} />
                    <View style={{ marginHorizontal: 15, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                        {url}
                    </View>
                </View>
            )
        } else {
            return (
                <View />
            )
        }

    }
}

const baseStyles = _.extend(base.general, {
    profileCardContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 3
    },
    topContainer: {
        flexDirection: 'row'
    },
    profileAvatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    profileInfoContainer: {
        flex: 1,
    },
    dataContainer: {
        flex: 4,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center'
    },
    name: {
        fontFamily: Fonts.base,
        fontSize: 20
    },
    country: {
        fontFamily: Fonts.base,
        fontSize: 14,
        flex: 1,
        alignSelf: 'center'
    },
    countryWrapper: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    nameContainer: {
    },
    soloContainer: {
        flex: 1,
        alignItems: 'center'
    },
    estimateContainer: {
        flex: 1,
        alignItems: 'center'
    },
    winRateContainer: {
        flex: 1,
        alignItems: 'center'
    },
    teamContainer: {
        flex: 1,
        alignItems: 'center'
    },
    mmrContainer: {
        flexDirection: 'row',
        marginTop: 60,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    winRateTextContainer: {
        flexDirection: 'row'
    },
    mmrText: {
        fontFamily: Fonts.base,
        fontSize: 14
    },
    urlContainer: {
        marginRight: 10,
        marginTop: 5
    },
    separator: {
        height: 2,
    },
    captionText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: Fonts.base
    },
    contentText: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: Fonts.base
    },
    profileIcons: {
        flexDirection: 'row'
    },
    contributorIcon: {
        width: 24,
        height: 24,
        marginLeft: 5,
        marginRight:5,
        shadowColor: "rgb(102,187,255)",
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 8,
        shadowOpacity: 1
    },
    cheeseIcon: {
        width: 24,
        height: 24,
        marginLeft: 5,
        marginRight:5,
        shadowColor: "rgb(255,255,0)",
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 6,
        shadowOpacity: 0.6,
    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps)(ProfileCard);
