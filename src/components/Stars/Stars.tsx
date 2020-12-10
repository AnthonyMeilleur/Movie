import React, { FC, useContext } from "react";
import { Image, StyleSheet, View } from "react-native";

import configurationContext from "../../contexts/configuration/configuration";

import { IConfiguration } from "../../services/configuration/configuration";

// @ts-ignore
import starsEmptyIcon from "../../../assets/images/stars_empty.png";
// @ts-ignore
import starsFullIcon from "../../../assets/images/stars_full.png";

interface Props {
  rating: number;
}

const Stars: FC<Props> = (props) => {
  const { rating } = props;
  const configuration = useContext(configurationContext) as IConfiguration;

  if (!configuration.images) {
    return null;
  }

  const width = `${Math.max(Math.min(rating, 1), 0) * 100}%`;

  return (
    <View style={styles.stars}>
      <View>
        <Image source={starsEmptyIcon} style={styles.starsEmpty} />
        <View style={[styles.container, { width }]}>
          <Image source={starsFullIcon} style={styles.starsFullIcon} />
        </View>
      </View>
    </View>
  );
};

export default Stars;

const styles = StyleSheet.create({
  container: {
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row'
  },
  starsEmpty: {
    height: 14,
    width: 52,
  },
  starsFullIcon: {
    height: 14,
    width: 52,
  }
});
