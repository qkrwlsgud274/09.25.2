import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration(
  nickName,
  email,
  password,
  language,
  navigation
) {
  try {
    console.log(nickName, email, password, language);
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      nickName: nickName,
      language: language,
    });
    Alert.alert("회원가입 성공!");
    navigation.push("TabNavigator");
  } catch (err) {
    Alert.alert("무슨 문제가 있는 것 같아요! => ", err.message);
  }
}

export async function signIn(email, password, navigation) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    navigation.push("TabNavigator");
  } catch (err) {
    Alert.alert("로그인에 문제가 있습니다! ", err.message);
  }
}

export async function logout(navigation) {
  try {
    console.log("로그아웃!!");
    const currentUser = firebase.auth().currentUser;
    console.log(currentUser);
    await firebase.auth().signOut();
    navigation.push("SignInPage");
  } catch (err) {
    Alert.alert("로그 아웃에 문제가 있습니다! ", err.message);
  }
}
