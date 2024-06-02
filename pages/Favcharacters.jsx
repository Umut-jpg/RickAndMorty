import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, ImageBackground ,TouchableOpacity,Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {  removeFavorite } from '../controller/favoritesSlice';
import image from '../assets/back4.jpg'
import { height ,width } from '../helper/Helper';

export const Favcharacters = () => {
  const myFavChar = useSelector((state) => state.favorites.characters);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <View style={styles.characterContainer}>
      <Image source={{ uri: item.image }} style={styles.characterImage} />
      <Text style={styles.characterName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => {Alert.alert("Karakteri Sil","Bu karakteri silmek istediğinize emin misiniz?",
        [{
        text: "İptal",
        style: "cancel"
        },{
        text: "Sil",
        onPress: () => dispatch(removeFavorite(item.id))}
        ])}}>
        <Text style={styles.buttonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground source={image} resizeMode="cover" style={{justifyContent:'center' , flex:1}}>
      <View style={styles.container}>

        <Text style={styles.headertext}>FAVORİLERİM</Text>
          <FlatList
            data={myFavChar}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.emptyText}>FAVORİ KARAKTER HENÜZ BULUNMAMAKTA </Text>}
            
          />
      </View>
    </ImageBackground>  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,justifyContent: 'center',alignItems: 'center',marginTop: 50,
  },
  headertext:{
    fontSize:35,fontWeight:'bold',color:'lightblue',borderWidth:1,borderColor:'lightblue',borderRadius:200,padding:20,
    textAlign:'center',margin:20,
  },
  characterContainer: {
    flexDirection: 'row',width:width*0.8,marginVertical: 10,marginLeft:30
  },
  characterImage: {
    width: width*0.3,height: height*0.14,marginRight: 10,
  },
  characterName: {
    fontSize: 18,fontWeight: 'bold',marginRight:10,color:'white'
  },
  emptyText: {
    fontSize: 18,color: 'gray',
  },removeButton: {
    backgroundColor: 'lightblue',paddingVertical: 5,paddingHorizontal: 10,borderRadius: 5,height:height*0.05,width:width*0.12,
  },buttonText:{textAlign:'center',justifyContent:'center'
  }
});
