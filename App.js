/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  ChatClient,
  ChatOptions,
  ChatMessageChatType,
  ChatMessage,
} from 'react-native-chat-sdk';

const App = () => {
  const title = 'AgoraChatQuickstart';
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [content, setContent] = React.useState('');
  const [logText, setWarnText] = React.useState('Show log area');

  const login = () => {
    setWarnText(`username:${username},password:${password}`);
    let listener = {
      onTokenWillExpire() {
        console.log('ClientScreen.onTokenWillExpire');
      },
      onTokenDidExpire() {
        console.log('ClientScreen.onTokenDidExpire');
      },
      onConnected() {
        console.log('ClientScreen.onConnected');
      },
      onDisconnected(errorCode) {
        console.log('ClientScreen.onDisconnected: ', errorCode);
      },
    };
    ChatClient.getInstance().removeAllConnectionListener();
    ChatClient.getInstance().addConnectionListener(listener);
    ChatClient.getInstance()
      .login('asteriskhx1', 'qwer')
      .then(() => {
        console.log('ClientScreen.login: success');
      })
      .catch(reason => {
        console.log('ClientScreen.login: fail', reason);
      });
  };

  const logout = () => {
    ChatClient.getInstance()
      .logout()
      .then(() => {
        console.log('ClientScreen.logout: success');
      })
      .catch(reason => {
        console.log('ClientScreen.logout: fail', reason);
      });
  };

  const sendmsg = () => {
    let msg = ChatMessage.createTextMessage(
      userId,
      content,
      ChatMessageChatType.PeerChat,
    );
    const callback = new (class {
      onProgress(locaMsgId, progress) {
        console.log(
          'ConnectScreen.sendMessage.onProgress ',
          locaMsgId,
          progress,
        );
      }
      onError(locaMsgId, error) {
        console.log('ConnectScreen.sendMessage.onError ', locaMsgId, error);
      }
      onSuccess(message) {
        console.log('ConnectScreen.sendMessage.onSuccess', message.localMsgId);
      }
    })();
    ChatClient.getInstance()
      .chatManager.sendMessage(msg, callback)
      .then(() => console.log('send success'))
      .catch(() => console.log('send failed'));
  };

  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <ScrollView>
        <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter username"
            onChangeText={text => setUsername(text)}
            value={username}
          />
        </View>
        <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter password"
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
        <View style={styles.buttonCon}>
          <Text style={styles.eachBtn} onPress={login}>
            SIGN IN
          </Text>
          <Text style={styles.eachBtn} onPress={logout}>
            SIGN OUT
          </Text>
        </View>
        <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter the username you want to send"
            onChangeText={text => setUserId(text)}
            value={userId}
          />
        </View>
        <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter content"
            onChangeText={text => setContent(text)}
            value={content}
          />
        </View>
        <View style={styles.buttonCon}>
          <Text style={styles.btn2} onPress={sendmsg}>
            SEND TEXT
          </Text>
        </View>
        <View>
          <Text style={styles.logText}>{logText}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    height: 60,
    backgroundColor: '#6200ED',
  },
  title: {
    lineHeight: 60,
    paddingLeft: 15,
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  inputCon: {
    marginLeft: '5%',
    width: '90%',
    height: 60,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputBox: {
    marginTop: 30,
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonCon: {
    marginLeft: '2%',
    width: '96%',
    flexDirection: 'row',
    marginTop: 20,
    height: 26,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  eachBtn: {
    height: 40,
    width: '28%',
    lineHeight: 40,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#6200ED',
  },
  btn2: {
    height: 40,
    width: '45%',
    lineHeight: 40,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#6200ED',
  },
  logText: {
    padding: 10,
    marginTop: 10,
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
});

(function init() {
  let o = new ChatOptions({
    autoLogin: false,
    appKey: 'easemob-demo#easeim',
  });
  ChatClient.getInstance()
    .init(o)
    .then(() => {
      console.log('success');
    })
    .catch(() => {
      console.log('error');
    });
})();

export default App;

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// // import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   Button,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import {ChatClient, ChatOptions} from '@asteriskzuo/react-native-chat-sdk';

// const Section = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <Button
//             title="login"
//             onPress={() => {
//               let o = new ChatOptions({
//                 autoLogin: false,
//                 appKey: 'easemob-demo#easeim',
//               });
//               ChatClient.getInstance()
//                 .init(o)
//                 .then(() => {
//                   console.log('success');
//                   let listener = {
//                     onTokenWillExpire() {
//                       console.log('ClientScreen.onTokenWillExpire');
//                     },
//                     onTokenDidExpire() {
//                       console.log('ClientScreen.onTokenDidExpire');
//                     },
//                     onConnected() {
//                       console.log('ClientScreen.onConnected');
//                     },
//                     onDisconnected(errorCode) {
//                       console.log('ClientScreen.onDisconnected: ', errorCode);
//                     },
//                   };
//                   ChatClient.getInstance().removeAllConnectionListener();
//                   ChatClient.getInstance().addConnectionListener(listener);
//                   ChatClient.getInstance()
//                     .login('asteriskhx1', 'qwer')
//                     .then(() => {
//                       console.log('ClientScreen.login: success');
//                     })
//                     .catch(reason => {
//                       console.log('ClientScreen.login: fail', reason);
//                     });
//                 })
//                 .catch(() => {
//                   console.log('error');
//                 });
//             }}
//           />
//           <Button
//             title="logout"
//             onPress={() => {
//               ChatClient.getInstance()
//                 .logout()
//                 .then(() => {
//                   console.log('ClientScreen.logout: success');
//                 })
//                 .catch(reason => {
//                   console.log('ClientScreen.logout: fail: ', reason);
//                 });
//             }}
//           />
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
