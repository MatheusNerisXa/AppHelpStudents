import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import ChatGPT from './modules/chat/screens/Chat';
import DisciplineCreationScreen from './modules/createDiscipline';
import CreateUser from './modules/createUser';
import Discipline from './modules/discipline';
import Exams from './modules/exams';
import Home from './modules/home';
import Login from './modules/login';
import Menu from './modules/menu';
import News from './modules/news';
import NewsDetailsScreen from './modules/newsDetails';
import Profile from './modules/profile';
import Splash from './modules/splash';
import Suport from './modules/suport';
import Translation from './modules/translation';
import navigationStyle from './Navigation.style';
import { Icon } from './shared/components/icon/Icon';
import { MenuUrl } from './shared/enum/MenuUrl.enum';
import { theme } from './shared/themes/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const renderTabBarIcon = (color: string, route: RouteProp<ParamListBase, string>) => {
    let iconName: string;

    switch (route.name) {
      case 'Homee':
        iconName = 'home';
        break;
      case 'Menu':
        iconName = 'menu';
        break;
      case 'Chat':
        iconName = 'bubbles4';
        break;
      default:
        iconName = 'profile';
        break;
    }
    return <Icon name={iconName} color={color} size={16} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => renderTabBarIcon(color, route),
        tabBarActiveTintColor: theme.colors.grayTheme.gray80,
        tabBarInactiveTintColor: theme.colors.neutralTheme.white,
        tabBarLabelStyle: {
          marginBottom: 8,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.blueTheme.blue80,
          height: 80,
          padding: 8,
        },
      })}
    >
      <Tab.Screen
        name="Homee"
        component={Home}
        options={{
          title: 'Ínicio',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007AFF' },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatGPT}
        options={{
          title: 'Chat',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007AFF' },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Perfil',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007AFF' },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Exam"
        component={Exams}
        options={({ navigation }) => ({
          title: 'Vestibulares',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007AFF' },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={navigationStyle.headerLeftContainer}
            >
              <Text style={navigationStyle.headerLeftText}>
                <Icon name="arrow-left2" color="#FFF" size={23} />
              </Text>
            </TouchableOpacity>
          ),
          tabBarButton: () => null,
        })}
      />
      <Tab.Screen
        name="Suport"
        component={Suport}
        options={({ navigation }) => ({
          title: 'Suporte',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007AFF' },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={navigationStyle.headerLeftContainer}
            >
              <Text style={navigationStyle.headerLeftText}>
                <Icon name="arrow-left2" color="#FFF" size={23} />
              </Text>
            </TouchableOpacity>
          ),
          tabBarButton: () => null,
        })}
      />

      <Tab.Screen
        name="Discipline"
        component={Discipline}
        options={({ navigation }) => ({
          title: 'Matêrias',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007AFF' },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={navigationStyle.headerLeftContainer}
            >
              <Text style={navigationStyle.headerLeftText}>
                <Icon name="arrow-left2" color="#FFF" size={23} />
              </Text>
            </TouchableOpacity>
          ),
          tabBarButton: () => null,
        })}
      />

      <Tab.Screen
        name="Translation"
        component={Translation}
        options={({ navigation }) => ({
          title: 'Traduções',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007AFF' },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={navigationStyle.headerLeftContainer}
            >
              <Text style={navigationStyle.headerLeftText}>
                <Icon name="arrow-left2" color="#FFF" size={23} />
              </Text>
            </TouchableOpacity>
          ),
          tabBarButton: () => null,
        })}
      />

      <Tab.Screen
        name="News"
        component={News}
        options={({ navigation }) => ({
          title: 'Notícias',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007AFF' },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={navigationStyle.headerLeftContainer}
            >
              <Text style={navigationStyle.headerLeftText}>
                <Icon name="arrow-left2" color="#FFF" size={23} />
              </Text>
            </TouchableOpacity>
          ),
          tabBarButton: () => null,
        })}
      />

      <Tab.Screen
        name="DisciplineCreationScreen"
        component={DisciplineCreationScreen}
        options={({ navigation }) => ({
          title: 'Cadastro de matérias',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007AFF' },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={navigationStyle.headerLeftContainer}
            >
              <Text style={navigationStyle.headerLeftText}>
                <Icon name="arrow-left2" color="#FFF" size={23} />
              </Text>
            </TouchableOpacity>
          ),
          tabBarButton: () => null,
        })}
      />

      <Tab.Screen
        name="NewsDetails"
        component={NewsDetailsScreen}
        options={({ navigation }) => ({
          title: 'Notícias',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007AFF' },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={navigationStyle.headerLeftContainer}
            >
              <Text style={navigationStyle.headerLeftText}>
                <Icon name="arrow-left2" color="#FFF" size={23} />
              </Text>
            </TouchableOpacity>
          ),
          tabBarButton: () => null,
        })}
      />

      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          title: 'Menu',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007AFF' },
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={MenuUrl.SPLASH} component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name={MenuUrl.LOGIN} component={Login} options={{ headerShown: false }} />
        <Stack.Screen
          name={MenuUrl.CREATE_USER}
          component={CreateUser}
          options={{ title: 'Criar usuário' }}
        />
        <Stack.Screen
          name={MenuUrl.HOME}
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={MenuUrl.Exam} component={Exams} options={{ headerShown: false }} />
        <Stack.Screen name={MenuUrl.News} component={News} options={{ headerShown: false }} />
        <Stack.Screen
          name={MenuUrl.NewsDetails}
          component={News}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={MenuUrl.Suport} component={Suport} options={{ headerShown: false }} />
        <Stack.Screen
          name={MenuUrl.Discipline}
          component={Discipline}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={MenuUrl.DisciplineCreationScreen}
          component={DisciplineCreationScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={MenuUrl.Translation}
          component={Translation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
