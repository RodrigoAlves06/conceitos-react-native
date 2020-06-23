import React ,  {useState , useEffect} from "react";

import api from './services/api';

//Listar os repositórios da sua API: Deve ser capaz de criar uma lista de todos os
// repositórios que estão cadastrados na sua API com os campos title,
// techs e número de curtidas seguindo o padrão ${repository.likes} curtidas,
// apenas alterando o número para ser dinâmico.

//Curtir um repositório listado da API: Deve ser capaz de curtir um item na sua API
// através de um botão com o texto Curtir e deve atualizar o número de likes na listagem no mobile.


import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {

  const [repositorios, setRepositorios] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data);
      setRepositorios(response.data);
    })
  },[]);




  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    const response = await api.post(`/repositories/${id}/like`);
    
    // const repositorio = response.data;
    // setRepositorios([...repositorios , repositorio]);

    // {repositorios.map ( repositorio => repositorio.likes)}

    const {likes} = response.data;

    setRepositorios([...repositorios.map((repositorio )=> {
      if (repositorio.id === id ){
        return {... repositorio, likes};
      }
      return repositorio;
      
    }),
  ]);
    
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        
      <FlatList
        data={repositorios}
        keyExtractor={repositories => repositories.id}
        renderItem={({item: repositories})=>(

        <View style={styles.repositoryContainer}>
          
          
            <Text style={styles.repository} 
            >
              {repositories.title}</Text>

          
          <View style={styles.techsContainer}>          
            
            {repositories.techs.map((tech)=>(
              <Text style={styles.tech} key={tech}>
                {tech}
              </Text>
            ))}
            
            {/* <Text style={styles.tech} >
              {repositories.techs}
            </Text> */}
          </View>

          <View style={styles.likesContainer}>
            
            <Text style={styles.likeText}
            key={repositories.id}

              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-${repositories.id}`}
            >
              {repositories.likes} curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repositories.id)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-${repositories.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>)}
      />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
