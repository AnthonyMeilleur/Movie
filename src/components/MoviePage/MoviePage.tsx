import React, { FC, useContext } from "react";
import { Button, Image, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";

import configurationContext from "../../contexts/configuration/configuration";

import useMovie from '../../hooks/useMovie/useMovie';

import {
  getBackdrop,
  getPoster,
  IConfiguration,
} from "../../services/configuration/configuration";

import { StackParamList } from "../../types/StackParamList";

import Stars from '../Stars/Stars';

// @ts-ignore
import playIcon from "../../../assets/images/button_play.png";

type ProfileScreenRouteProp = RouteProp<StackParamList, "Movie">;

interface Props {
  route: ProfileScreenRouteProp;
}

const MoviePage: FC<Props> = (props) => {
  const { route } = props;
  const { id } = route.params;
  const movie = useMovie(id);
  const configuration = useContext(configurationContext) as IConfiguration;

  function handlePress() {
    if (movie) {
      Linking.canOpenURL(movie.homepage).then((supported) => {
        if (supported) {
          Linking.openURL(movie.homepage);
        } else {
          console.log("Don't know how to open URI: " + movie.homepage);
        }
      });
    }
  }

  if (!movie) {
    return null;
  }

  return (
    <View style={styles.page}>
      <ScrollView>
        {configuration.images && (
          <Image
            source={{ uri: getBackdrop(configuration, movie, 6) }}
            style={styles.imageBg}
          />
        )}
        <View style={styles.movie}>
          <View style={styles.header}>
            {configuration.images && (
              <Image
                source={{ uri: getPoster(configuration, movie, 1) }}
                style={styles.image}
              />
            )}
            <View style={styles.headerInfo}>
              {configuration.images && (
                <Image source={playIcon} style={styles.imagePlay} />
              )}
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.director}>Francis Ford Coppola</Text>
              <Stars rating={movie.vote_average / 10} />
            </View>
          </View>
          <Text style={styles.overviewTitle}>Synopsis</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>
      </ScrollView>
      {movie.homepage && (
          <View style={styles.footer}>
            <Button color="#fc6e58" onPress={handlePress} title="Visit website" />
          </View>
        )}
    </View>
  );
};

export default MoviePage;

const styles = StyleSheet.create({
  director: {
    fontSize: 13,
    fontWeight: "100",
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#ffffff",
    bottom: 0,
    left: 0,
    paddingBottom: 46,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 12,
    position: "absolute",
    right: 0,
    zIndex: 2
  },
  image: {
    borderColor: "#ffffff",
    borderRadius: 15,
    borderWidth: 4,
    height: 134,
    marginRight: 15,
    width: 84,
  },
  imageBg: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 350,
    resizeMode: "cover",
    width: "100%",
  },
  imagePlay: {
    alignSelf: "flex-end",
    height: 58,
    width: 58,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 36,
  },
  headerInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  movie: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 120,
    paddingLeft: 18,
    paddingRight: 18,
    top: -35,
    zIndex: 1,
  },
  overview: {
    lineHeight: 24,
  },
  overviewTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  page: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  starsEmpty: {
    height: 14,
    width: 52,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
    marginBottom: 5,
  },
});
