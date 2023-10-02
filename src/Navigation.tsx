import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import AbsencesScreen from './modules/absences/screens/Absences';
import AbsencesDetails from './modules/absences/screens/AbsencesDetails';
import AbsencesMenu from './modules/absences/screens/MenuAbsences';
import ActivitiesScreen from './modules/activities/screens/Activities';
import ActivitiesCreation from './modules/activities/screens/ActivitiesCreation';
import ChatGPT from './modules/chat/screens/Chat';
import CreateUser from './modules/createUser';
import Dashboard from './modules/dashboards';
import { Discipline, DisciplineCreation, DisciplineMenu } from './modules/discipline';
import DisciplineDetails from './modules/discipline/screens/DisciplineDetails';
import { ExamDetails, Exams } from './modules/exams';
import FilesAndPhotos from './modules/filesphotos';
import Home from './modules/home';
import Login from './modules/login';
import PasswordRecoveryScreen from './modules/login/screens/PasswordRecoveryScreen';
import Menu from './modules/menu';
import { News, NewsDetails } from './modules/news';
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
      case 'HelpGPT':
        iconName = 'bubbles4';
        break;
      case 'Dashboards':
        iconName = 'stats-bars2';
        break;
      case 'Activities':
        iconName = 'checkbox-checked';
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
        tabBarActiveTintColor: theme.colors.mainTheme.tab,
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
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
        }}
      />
      <Tab.Screen
        name="Dashboards"
        component={Dashboard}
        options={{
          title: 'Dash',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
        }}
      />

      <Tab.Screen
        name="HelpGPT"
        component={ChatGPT}
        options={{
          title: 'HelpGPT',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
        }}
      />
      <Tab.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{
          title: 'Tarefas',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
        }}
      />
      {/* <Tab.Screen
        name="Event"
        component={EventScreen}
        options={{
          title: 'Calendário',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          title: 'Perfil',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Menu')}
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
        name="Exam"
        component={Exams}
        options={({ navigation }) => ({
          title: 'Vestibulares',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Menu')}
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
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Menu')}
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
        options={({ navigation }) => {
          return {
            title: 'Matérias',
            headerTintColor: '#FFF',
            headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('DisciplineMenu')}
                style={navigationStyle.headerLeftContainer}
              >
                <Text style={navigationStyle.headerLeftText}>
                  <Icon name="arrow-left2" color="#FFF" size={23} />
                </Text>
              </TouchableOpacity>
            ),
            tabBarButton: () => null,
          };
        }}
      />
      <Tab.Screen
        name="FilePhotos"
        component={FilesAndPhotos}
        options={({ navigation }) => {
          return {
            title: 'Arquivos',
            headerTintColor: '#FFF',
            headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('DisciplineMenu')}
                style={navigationStyle.headerLeftContainer}
              >
                <Text style={navigationStyle.headerLeftText}>
                  <Icon name="arrow-left2" color="#FFF" size={23} />
                </Text>
              </TouchableOpacity>
            ),
            tabBarButton: () => null,
          };
        }}
      />
      <Tab.Screen
        name="Translation"
        component={Translation}
        options={({ navigation }) => ({
          title: 'Help Tradutor',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Menu')}
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
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Menu')}
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
        name="DisciplineMenu"
        component={DisciplineMenu}
        options={({ navigation }) => ({
          title: 'Matérias',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Menu')}
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
        name="AbsencesMenu"
        component={AbsencesMenu}
        options={({ navigation }) => ({
          title: 'Faltas',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Menu')}
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
        name="ActivitiesCreation"
        component={ActivitiesCreation}
        options={({ navigation }) => ({
          title: 'Cadastrar Tarefa',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Activities')}
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
        name="Absences"
        component={AbsencesScreen}
        options={({ navigation, route }) => ({
          title: 'Cadastro de Faltas',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DisciplineDetails', {
                  disciplineId: route.params.disciplineId,
                });
              }}
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
        name="ExamDetails"
        component={ExamDetails}
        options={({ navigation }) => ({
          title: 'Vestibulares',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Exam')}
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
        component={DisciplineCreation}
        options={({ navigation }) => ({
          title: 'Cadastrar matéria',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DisciplineMenu')}
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
        component={NewsDetails}
        options={({ navigation }) => ({
          title: 'Notícias',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('News')}
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
        name="DisciplineDetails"
        component={DisciplineDetails}
        options={({ navigation }) => ({
          title: 'Detalhes da matéria',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Discipline')}
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
        name="AbsencesDetails"
        component={AbsencesDetails}
        options={({ navigation }) => ({
          title: 'Detalhes das faltas',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Discipline')}
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
          headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
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
          options={({ navigation }) => ({
            title: 'Criar usuário',
            headerTintColor: '#FFF',
            headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
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
          })}
        />
        <Stack.Screen
          name={MenuUrl.PasswordRecovery}
          component={PasswordRecoveryScreen}
          options={({ navigation }) => ({
            title: 'Recuperação de Senha',
            headerTintColor: '#FFF',
            headerStyle: { backgroundColor: theme.colors.blueTheme.blue80 },
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
          })}
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
        <Stack.Screen
          name={MenuUrl.ExamDetails}
          component={ExamDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={MenuUrl.Dashboard}
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={MenuUrl.Suport} component={Suport} options={{ headerShown: false }} />
        <Stack.Screen
          name={MenuUrl.DisciplineMenu}
          component={DisciplineMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={MenuUrl.AbsencesMenu}
          component={AbsencesMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={MenuUrl.Absences}
          component={AbsencesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={MenuUrl.AbsencesDetails}
          component={AbsencesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={MenuUrl.Activities}
          component={ActivitiesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={MenuUrl.FilesAndPhotos}
          component={FilesAndPhotos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={MenuUrl.Discipline}
          component={Discipline}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={MenuUrl.DisciplineCreation}
          component={DisciplineCreation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={MenuUrl.ActivitiesCreation}
          component={ActivitiesCreation}
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
