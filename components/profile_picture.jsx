// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';

import React from 'react';
import {OverlayTrigger} from 'react-bootstrap';

import Pluggable from 'plugins/pluggable';

import * as PostUtils from 'utils/post_utils.jsx';

import ProfilePopover from 'components/profile_popover_uchat';
import StatusIcon from 'components/status_icon';

export default class ProfilePicture extends React.PureComponent {
    static defaultProps = {
        width: '36',
        height: '36',
        isRHS: false,
        hasMention: false,
        disablePopover: false,
    };

    static propTypes = {
        src: PropTypes.string.isRequired,
        status: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
        user: PropTypes.object,
        isBusy: PropTypes.bool,
        isRHS: PropTypes.bool,
        hasMention: PropTypes.bool,
        post: PropTypes.object,
        disablePopover: PropTypes.bool,
    };

    hideProfilePopover = () => {
        this.refs.overlay.hide();
    }

    render() {
        let isSystemMessage = false;
        if (this.props.post) {
            isSystemMessage = PostUtils.isSystemMessage(this.props.post);
        }
        if (this.props.user && !this.props.disablePopover) {
            return (
                <OverlayTrigger
                    ref='overlay'
                    trigger='click'
                    placement='right'
                    rootClose={true}
                    overlay={
                        <Pluggable>
                            <ProfilePopover
                                user={this.props.user}
                                src={this.props.src}
                                status={this.props.status}
                                isBusy={this.props.isBusy}
                                hide={this.hideProfilePopover}
                                isRHS={this.props.isRHS}
                                hasMention={this.props.hasMention}
                            />
                        </Pluggable>
                    }
                >
                    <span className='status-wrapper'>
                        <img
                            className={`more-modal__image ${isSystemMessage ? 'icon--uchat' : ''}`}
                            alt={`${this.props.user.username || 'user'} profile image`}
                            width={this.props.width}
                            height={this.props.width}
                            src={this.props.src}
                        />
                        <StatusIcon status={this.props.status}/>
                    </span>
                </OverlayTrigger>
            );
        }
        return (
            <span className='status-wrapper'>
                <img
                    className={`more-modal__image ${isSystemMessage ? 'icon--uchat' : ''}`}
                    alt={'user profile image'}
                    width={this.props.width}
                    height={this.props.width}
                    src={this.props.src}
                />
                <StatusIcon status={this.props.status}/>
            </span>
        );
    }
}
