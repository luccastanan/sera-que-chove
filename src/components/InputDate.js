import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Keyboard } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Input } from 'react-native-elements';

import baseStyles from '../style/Base'
import { PRIMARY_COLOR } from '../constants';
import {dateFormat} from '../util';

export default class InputDate extends Component {

    constructor(props){
        super(props)
        this.state = {
            isDateTimePickerVisible: false,
            date: props.value ? dateFormat(props.value, props.mode == 'date' ? 0 : 1) : ''
        };
    }

    _showDateTimePicker = () => {
        Keyboard.dismiss()
        this.setState({ isDateTimePickerVisible: true })};

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({date: dateFormat(date, this.props.mode == 'date' ? 0 : 1)})
        this.props.onSelected(date)
        this._hideDateTimePicker();
    };

    render() {
        return (
            <View>
                <Input
                    value={this.state.date}
                    leftIcon={{ type: 'material-icons', name: 'date-range', color: PRIMARY_COLOR }}
                    containerStyle={baseStyles.input}
                    placeholder={this.props.placeholder}
                    onFocus={() => this._showDateTimePicker()}
                />
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    minimumDate={this.props.minimumDate}
                    maximumDate={this.props.maximumDate}
                    mode={this.props.mode}
                    date={this.props.value ? this.props.value : new Date()}
                />
            </View>
        );
    }

}