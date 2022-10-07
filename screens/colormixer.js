import { View, } from "react-native";
import { LinearProgress, Text, Button, Slider, Dialog } from '@rneui/base';
import React from "react";
import style from "../assets/style";

export default class ColorMixer extends React.Component {
    batas = 255;

    constructor() {
        super();
        this.state = {
            count: this.batas,
            oneSecInterval: setInterval(() => {
                if (this.state.count != 0) {
                    this.setState(
                        this.state = {
                            count: this.state.count - 1
                        }
                    )
                }
            }, 1000),
            redVal: 255,
            greenVal: 255,
            blueVal: 255,
            hint: '',
            result: false,
            hintUsed: false,
        }
    }

    showHint() {
        this.setState(
            this.state = {
                hintUsed: true,
                count: (this.state.count / 2),
                hint: "Hint : " + 'xxx'
                //ambil salah satu colorVal dari state soal
                //disini nanti juga setskornya diminus
            }
        )
    }

    render() {

        console.log(this.state.result);
        if (this.state.count != 0) {
            return (
                //#region GAMEON
                <View style={style.container}>
                    <View style={style.linear_progress}>
                        <LinearProgress variant='determinate'
                            value={1 - (this.state.count / this.batas)}
                            color="primary"
                            //warna e mengikuti soal
                            style={style.linear_progress} />
                        <Text style={style.text_linear_progress}>{toHHMMSS(this.state.count)}</Text>
                    </View>
                    <Text style={style.text_score}>Score: (score di state)</Text>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                        marginTop: 20,
                    }}>
                        <View style={{
                            width: '50%',
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: '#265e80',
                                width: '100%',
                                textAlign: 'center',
                            }}>Guess this color!</Text>
                            <View style={{
                                width: 100,
                                height: 100,
                                margin: 10,
                                backgroundColor: "#a1346f",
                                alignSelf: 'center',
                                borderColor: '#000',
                                borderWidth: 2,
                            }}></View>
                        </View>
                        <View style={{
                            width: '50%',
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: '#265e80',
                                width: '100%',
                                textAlign: 'center',
                            }}>Your color</Text>
                            <View style={{
                                width: 100,
                                height: 100,
                                margin: 10,
                                backgroundColor: 'rgba(' + this.state.redVal + ',' + this.state.greenVal + ',' + this.state.blueVal + ',1)',
                                alignSelf: 'center',
                                borderColor: '#000',
                                borderWidth: 2,
                            }}></View>
                        </View>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 18,
                            color: '#265e80',
                            margin: 20,
                            alignSelf: 'center',
                        }}>{this.state.hint}</Text>
                        <Button
                            title="Show Hint"
                            onPress={() => { this.showHint() }}
                            buttonStyle={style.btn_style}
                            containerStyle={style.btn_container}
                            disabled={this.state.hintUsed} />
                    </View>
                    {/* ---Start Container Slider--- */}
                    <View style={style.container}>
                        {/* ---Start Red Slider--- */}
                        <View style={style.slider_container}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: 'red',
                                    margin: 20,
                                    alignSelf: 'center',
                                }}
                            >
                                Red: {this.state.redVal}
                            </Text>
                            <Slider
                                value={this.state.redVal}
                                minimumValue={0}
                                maximumValue={255}
                                step={1}
                                thumbStyle={{
                                    backgroundColor: 'red',
                                }}
                                onValueChange={(value) => {
                                    this.setState({
                                        redVal: value
                                    })
                                }}

                            ></Slider>
                        </View>
                        {/* ---End Red Slider--- */}
                        {/* ---Start Green Slider--- */}
                        <View style={style.slider_container}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: 'green',
                                    margin: 20,
                                    alignSelf: 'center',
                                }}
                            >
                                Green: {this.state.greenVal}
                            </Text>
                            <Slider
                                value={this.state.greenVal}
                                minimumValue={0}
                                maximumValue={255}
                                step={1}
                                thumbStyle={{
                                    backgroundColor: 'green',
                                }}
                                onValueChange={(value) => {
                                    this.setState({
                                        greenVal: value
                                    })
                                }}

                            ></Slider>
                        </View>
                        {/* ---End Green Slider--- */}
                        {/* ---Start Blue Slider--- */}
                        <View style={style.slider_container}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: 'blue',
                                    margin: 20,
                                    alignSelf: 'center',
                                }}
                            >
                                Blue: {this.state.blueVal}
                            </Text>
                            <Slider
                                value={this.state.blueVal}
                                minimumValue={0}
                                maximumValue={255}
                                step={1}
                                thumbStyle={{
                                    backgroundColor: 'blue',
                                }}
                                onValueChange={(value) => {
                                    this.setState({
                                        blueVal: value
                                    })
                                }}

                            ></Slider>
                        </View>
                        {/* ---End Blue Slider--- */}
                    </View>
                    {/* ---End Container Slider--- */}
                    <View style={{
                        bottom: 20,
                    }}>
                        <Button
                            title="Guess Color"
                            buttonStyle={style.btn_style}
                            containerStyle={style.btn_container} />
                    </View>
                </View>
                //#endregion
            )
        } else if (this.state.count == 0 && !this.state.result) {
            return (
                //#region GAMEOVER
                <Dialog
                    isVisible={true}
                    overlayStyle={style.dialog}
                >
                    <Dialog.Title title="GAME OVER" />
                    <Text>Good Game Great Eyes!</Text>
                    <Dialog.Actions>
                        <Dialog.Button title="SHOW RESULT" onPress={() => this.setState({
                            result: true
                        })} />
                    </Dialog.Actions>
                </Dialog>
                //#endregion
            )
        } else if (this.state.result == true) {
            this.props.navigation.setOptions({ title: 'Result' })
            return (
                <View style={style.container}>
                    <Text style={style.text_judul}>
                        Final Score : (ambil dari state)
                    </Text>
                    <Text style={style.text_body}>
                        Total time played : (ambil dari state){'\n'}{'\n'}
                        Color mixed : (ambil dari state){'\n'}{'\n'}
                        Average guesses : (ambil dari state){'\n'}{'\n'}
                        Hints used : (ambil dari state)
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-evenly',
                        marginTop: 15,
                    }}>

                        <Button title={'HIGH SCORES'}
                            buttonStyle={style.btn_style}
                            containerStyle={{ width: '42%', margin: 5 }} />

                        <Button title={'PLAY AGAIN'}
                            buttonStyle={style.btn_style}
                            containerStyle={{ width: '42%', margin: 5 }} />
                    </View>
                    <Button title={'MAIN MENU'}
                        buttonStyle={style.btn_style}
                        containerStyle={style.btn_container} />
                </View>
            )
        }

    }
}

function toHHMMSS(v) {
    var sec_num = parseInt(v, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
}