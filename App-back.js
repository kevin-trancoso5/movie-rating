import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreating: false,
      movieName: "",
      movieComment: "",
      movieRating: 0,
      movies: [
        {
          name: "Harry Potter à l'école des sorciers",
          comment: "Un film très intéressant, qui mérite d'être vu par tous",
          rating: 8,
        },
      ],
    };
  }

  handleNameInputChange = (text) => {
    if (text.length <= 50) {
      this.setState({
        movieName: text,
      });
    }
  };

  handleCommentInputChange = (text) => {
    if (text.length <= 50) {
      this.setState({
        movieComment: text,
      });
    }
  };

  handleRatingInputChange = (text) => {
    if (/^\d+$/.test(text) && text.length <= 1) {
      this.setState({
        movieRating: text,
      });
    }
  };

  handleSubmit = () => {
    if(this.state.movieName.length >= 3 && this.state.movieComment.length >= 3){

      let movie = {
        name: this.state.movieName,
        comment: this.state.movieComment,
        rating: this.state.movieRating,
      };
      let newMovies = [...this.state.movies, movie];
      this.setState((prevState) => ({
        isCreating: false,
        movies: newMovies,
      }));
    }
    else {
      alert("Erreur de saisie");
    }

  };

  showForm = () => {
    this.setState(() => ({
      isCreating: true,
    }));
  };
  showMovies = () => {
    this.setState(() => ({
      isCreating: false,
    }));
  };

  render() {
    const widget = this.state.isCreating ? (
      <View>
        <Text>Nom du film:</Text>
        <TextInput
          style={styles.input}
          value={this.state.movieName}
          onChangeText={this.handleNameInputChange}
        />
        <Text>Votre commentaire:</Text>
        <TextInput
          style={styles.input}
          value={this.state.movieComment}
          onChangeText={this.handleCommentInputChange}
        />
        <Text>Note(0-9):</Text>
        <TextInput
          style={styles.input}
          value={this.state.movieRating}
          keyboardType="numeric"
          onChangeText={this.handleRatingInputChange}
        />
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    ) : (
      <View>
        <Text style={styles.title}> Liste de films: </Text>
        <View style={styles.row}>
          <Text style={styles.item}>Nom du film</Text>
          <Text style={styles.item}>Commentaire</Text>
          <Text style={styles.item}>Note</Text>
        </View>
        <SafeAreaView>
          <FlatList
            data={this.state.movies}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.item}>{item.name}</Text>
                <Text style={styles.item}>{item.comment}</Text>
                <Text style={styles.item}>{item.rating}</Text>
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    );
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Button
            style={styles.navButton}
            onPress={this.showForm}
            title="Ajouter un avis"
          />
          <Button
            style={styles.navButton}
            onPress={this.showMovies}
            title="Voir la liste de films"
          />
        </View>
        {widget}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  navButton: {
    margin: 10,
  },
  input: {
    borderWidth: 1,
    margin: 10
  },
  title: {
    marginTop: 10,
    padding: 5,
    color: "#000000",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  item: {
    marginTop: 10,
    padding: 5,
    borderWidth: 2,
    borderColor: "#000000",
    color: "#000000",
    textAlign: "center",
    fontSize: 20,
  },
});
