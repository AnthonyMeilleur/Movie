import React, { FC, useContext, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import configurationContext from '../../contexts/configuration/configuration';

import useSearch from '../../hooks/useSearch/useSearch';

import { getPoster, IConfiguration } from '../../services/configuration/configuration';
import { formatDate } from '../../services/format/format';

import { StackParamList } from '../../types/StackParamList';

// @ts-ignore
import searchIcon from '../../../assets/images/ico_search_off.png';
// @ts-ignore
import smileyIcon from '../../../assets/images/ico_smiley.png';

type ProfileScreenNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

interface Props {
  navigation: ProfileScreenNavigationProp
}

const Homepage: FC<Props> = (props) => {
  const { navigation } = props;
  const [search, setSearch] = useState<string>('');
  const result = useSearch(search);
  const configuration = useContext(configurationContext) as IConfiguration;

  function handlePress(id: string) {
    return () => navigation.navigate('Movie', { id });
  }

  function handleSearch(text: string) {
    setSearch(text);
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        {!result && (<Text style={styles.title}>Search</Text>)}
        <View style={styles.field}>
          <Image source={searchIcon} style={styles.searchIcon} />
          <TextInput
            onChangeText={handleSearch}
            placeholder="Search"
            style={styles.input}
            value={search}
          />
        </View>
      </View>
      <View style={styles.content}>
        {result && (
          <ScrollView>
            {result.results.map(movie => (
              <Pressable key={movie.id} onPress={handlePress(movie.id)}>
                <View style={styles.movie}>
                  {configuration.images && (
                    <Image
                      source={{ uri: getPoster(configuration, movie) }}
                      style={styles.image}
                    />
                  )}
                  <View style={styles.movieContent}>
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    <Text>{formatDate(movie.release_date)}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        )}
        {!result && (
          <View style={styles.noResults}>
            <Image source={smileyIcon} style={styles.smiley} />
            <Text>You have no recent searches.</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default Homepage;

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    backgroundColor: '#fc6e58',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden',
    paddingBottom: 33,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 33,
  },
  field: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    display: 'flex',
    height: 45,
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  input: {
    flex: 1,
    height: 30
  },
  image: {
    height: 43,
    marginRight: 20,
    width: 30
  },
  movie: {
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
  },
  movieContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2
  },
  noResults: {
    alignItems: 'center',
    display: 'flex',
    paddingBottom: 60
  },
  page: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  searchIcon: {
    height: 22,
    marginRight: 10,
    width: 22
  },
  smiley: {
    height: 50,
    marginBottom: 20,
    width: 50
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '600'
  }
});
