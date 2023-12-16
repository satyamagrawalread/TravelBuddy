import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DatePicker from 'react-native-date-picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ActivityIndicator, RadioButton } from 'react-native-paper';
import BUTTON from '../components/buttons';
import Config from '../config/config.index'
import Colors from '../constants/colors';

const ProfileScreen = () => {
    const [userData, setUserData] = useState({
        name: '',
        mobile: '',
        location: '',
        occupation: '',
        date_of_birth: new Date(),
        gender: '',
        hobbies: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [dateOpen, setDateOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [maxDate, setMaxDate] = useState("2020-10-12");
    const [canEdit, setCanEdit] = useState(true);
    const [canUpdate, setCanUpdate] = useState(false);
    const navigation = useNavigation();
    useEffect(() => {
        profileCheck();
    }, [])
    useEffect(() => {
        const parts = (new Date().toLocaleDateString('en-IN').replace(/\//g, '-')).split('-')
        const rearrangedString = `${parts[2]}-${parts[1]}-${parts[0]}`;
        console.log(rearrangedString);
        setMaxDate(rearrangedString);
    }, [new Date().toLocaleDateString('en-IN')])

    const profileCheck = async () => {
        const user = await AsyncStorage.getItem('user');
        // console.log(user);
        if (user) {
            fetch(`${Config.LOCALHOST}/profileCheck`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: JSON.parse(user).email })
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.profile) {
                        console.log(data.profile);
                        setUserData({ ...userData, ...data.profile, date_of_birth: new Date(data.profile.date_of_birth), mobile: Number(data.profile.mobile) })
                        setCanUpdate(true);
                        setIsLoading(false);
                        setCanEdit(false);
                    }
                    else if (!data.error) {
                        setIsLoading(false);
                    }
                    else {
                        setErrorMsg(data.error);
                    }
                })
        }

    }

    const addProfile = async () => {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            console.log(JSON.parse(user).email);
            setIsLoading(true);
            const formData = { ...userData, email: JSON.parse(user).email };
            console.log('line75:', formData);
            fetch(`${Config.LOCALHOST}/addProfile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            })
                .then(res => res.json())
                .then((data) => {
                    if (!data.error) {
                        setCanEdit(false)
                        setIsLoading(false);
                        setCanUpdate(true);
                        alert(data.message);
                    }
                    else {
                        setErrorMsg(data.error);
                    }
                })
            setIsLoading(false);
        }
    }

    const updateProfile = async () => {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            console.log(JSON.parse(user).email);
            setIsLoading(true);
            const formData = { ...userData, email: JSON.parse(user).email };
            console.log('line107:', formData);
            fetch(`${Config.LOCALHOST}/updateProfile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            })
            .then(res => res.json())
            .then((data) => {
                if(!data.error) {
                    setCanEdit(false);
                    setIsLoading(false);
                    alert(data.message);
                }
                else {
                    setErrorMsg(data.error);
                }
            })
            setIsLoading(false);
        }
    }

    return isLoading ? (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size='large' />
        </View>
    )
        : (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                        <AntDesign name='back' size={30} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Personal Details</Text>
                    {canEdit
                        ? <TouchableOpacity style={styles.headerBtn}
                            onPress={() => {
                                canUpdate ? updateProfile() : addProfile();
                            }}>
                            <Text style={styles.headerBtnText}>Done</Text>
                        </TouchableOpacity>
                        : <TouchableOpacity style={styles.headerBtn}
                            onPress={() => { setCanEdit(true) }}>
                            <Text style={styles.headerBtnText}>Edit</Text>
                        </TouchableOpacity>}
                </View>
                {
                    errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>
                }
                <View style={styles.horizontalLine}></View>
                <ScrollView indicatorStyle='white' style={styles.mainContainer}>
                    <View style={styles.formBoxContainer}>
                        <Text style={styles.label}>
                            Name
                            <Text style={styles.requiredStar}> *</Text>
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            value={userData.name}
                            placeholder=""
                            onPressIn={() => setErrorMsg(null)}
                            onChangeText={(text) => setUserData({ ...userData, name: text })}
                            editable={canEdit}
                        />
                    </View>
                    <View style={styles.formBoxContainer}>
                        <Text style={styles.label}>
                            Mobile
                            <Text style={styles.requiredStar}> *</Text>
                        </Text>
                        <TextInput
                            keyboardType='phone-pad'
                            style={styles.textInput}
                            value={userData.mobile.toString()}
                            placeholder=""
                            onPressIn={() => setErrorMsg(null)}
                            onChangeText={(text) => setUserData({ ...userData, mobile: text })}
                            editable={canEdit}
                        />
                    </View>
                    <View style={styles.formBoxContainer}>
                        <Text style={styles.label}>
                            Location
                            <Text style={styles.requiredStar}> *</Text>
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            value={userData.location}
                            placeholder=""
                            onPressIn={() => setErrorMsg(null)}
                            onChangeText={(text) => setUserData({ ...userData, location: text })}
                            editable={canEdit}
                        />
                    </View>
                    <View style={styles.formBoxContainer}>
                        <Text style={styles.label}>
                            Occupation
                            <Text style={styles.requiredStar}> *</Text>
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            value={userData.occupation}
                            placeholder=""
                            onPressIn={() => setErrorMsg(null)}
                            onChangeText={(text) => setUserData({ ...userData, occupation: text })}
                            editable={canEdit}
                        />
                    </View>
                    <View style={styles.formBoxContainer}>
                        <Text style={styles.label}>
                            Date of Birth{' '}
                            <Fontisto name='date' size={20} onPress={() => { setDateOpen(true) }} />
                            <Text style={styles.requiredStar}> *</Text>

                        </Text>
                        {canEdit && <DatePicker modal open={dateOpen} date={userData.date_of_birth}
                            onConfirm={(date) => {
                                setDateOpen(false);
                                setUserData({ ...userData, date_of_birth: date })
                                console.log(date);
                            }}
                            onCancel={() => {
                                setDateOpen(false);
                            }}
                            style={styles.textInput}
                            textColor='#000000'
                            mode='date'
                            maximumDate={new Date(maxDate)}
                        />}
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            value={userData.date_of_birth.toLocaleDateString('en-IN')}
                            editable={false}
                        />
                    </View>
                    <View style={styles.formBoxContainer}>
                        <Text style={styles.label}>
                            Gender
                            <Text style={styles.requiredStar}> *</Text>
                        </Text>
                        {
                            canEdit
                                ? <View>
                                    <TouchableOpacity style={styles.radioBtn}
                                        onPress={() => { setUserData({ ...userData, gender: "male" }) }}
                                        onPressIn={() => setErrorMsg(null)}>
                                        <RadioButton
                                            value="male"
                                            status={userData.gender === 'male' ? 'checked' : 'unchecked'}
                                            onPress={() => { setUserData({ ...userData, gender: "male" }) }}
                                        />
                                        <Text>Male</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.radioBtn} onPress={() => { setUserData({ ...userData, gender: "female" }) }}>
                                        <RadioButton
                                            value="female"
                                            status={userData.gender === 'female' ? 'checked' : 'unchecked'}
                                            onPress={() => { setUserData({ ...userData, gender: "female" }) }}
                                        />
                                        <Text>Female</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.radioBtn} onPress={() => { setUserData({ ...userData, gender: "prefer not to say" }) }}>
                                        <RadioButton
                                            value="prefer not to say"
                                            status={userData.gender === 'prefer not to say' ? 'checked' : 'unchecked'}
                                            onPress={() => { setUserData({ ...userData, gender: "prefer not to say" }) }}
                                        />
                                        <Text>Prefer Not To Say</Text>
                                    </TouchableOpacity>
                                </View>
                                : <View>
                                    <TextInput
                                        style={styles.textInput}
                                        value={userData.gender}
                                        placeholder=""
                                        onPressIn={() => setErrorMsg(null)}
                                        onChangeText={(text) => setUserData({ ...userData, hobbies: text })}
                                        editable={false}
                                    />
                                </View>
                        }
                    </View>
                    <View style={styles.formBoxContainer}>
                        <Text style={styles.label}>
                            Hobbies
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            value={userData.hobbies}
                            placeholder=""
                            onPressIn={() => setErrorMsg(null)}
                            onChangeText={(text) => setUserData({ ...userData, hobbies: text })}
                            editable={canEdit}
                        />
                    </View>
                </ScrollView>
            </View>
        )
}

export default ProfileScreen

const styles = StyleSheet.create({
    loaderContainer: {
        height: '100%',
        justifyContent: 'center'
    },
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row'
    },
    headerTitle: {
        width: '100%',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 25,
        fontSize: 14,
        fontWeight: '700'

    },
    backBtn: {
        margin: 10,
        position: 'absolute',
        top: 0
    },
    headerBtn: {
        width: 120,
        height: 40,
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: Colors.secondary,
        borderRadius: 20, // Half of the height to make it a perfect circle
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerBtnText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '400',
        alignSelf: 'center'
    },
    errorText: {
        color: 'red',
        alignSelf: 'center',
        margin: 10,
        marginBottom: 0
    },
    horizontalLine: {
        backgroundColor: '#9e9e9e',
        height: 1,
        margin: 29,
        marginBottom: 0,
        marginTop: 10

    },
    mainContainer: {
        padding: 26,
        paddingTop: 0
    },
    formBoxContainer: {
        marginTop: 15,

    },
    label: {
        fontSize: 15
    },
    requiredStar: {
        color: 'red'
    },
    textInput: {
        borderRadius: 8,
        borderColor: '#9e9e9e',
        borderWidth: 1,
        paddingLeft: 10
    },
    radioBtn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    postBtn: {
        alignSelf: 'flex-end',
    }
})