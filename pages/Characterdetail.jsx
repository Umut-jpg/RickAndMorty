import React  from 'react'
import {StyleSheet,  Text, View,Image, ScrollView,ImageBackground} from 'react-native';
import image from '../assets/back10.jpg'
import { height ,width } from '../helper/Helper';
export const Characterdetail = ({route}) => {
    const characterDetail = route.params;
    const episodeNumbers = characterDetail.charactersData.episode.map(url => {
        const parts = url.split('/');
        return parts.pop();
    });
    return (
            <ScrollView>
                <ImageBackground source={image} resizeMode="cover" style={{justifyContent:'center' , flex:1}}>
                    <View style={styles.container}>
                    
                        <Text style={{ fontSize: 35, fontWeight:'bold', color:'lightblue', borderWidth:1,borderColor:'lightblue',borderRadius:200,padding:20, marginBottom:50 }}>Karakter Detay</Text>
                        <Image style={styles.characterImage} source={{ uri: characterDetail.charactersData.image }}
                            />
                            <Text style={styles.info}>
                                <Text style={{color:'lightblue'}}>Karakter Adı : </Text>
                                <Text style= {{color:'white'}}>{characterDetail.charactersData.name}</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text style={{color:'lightblue'}}>Durum : </Text>
                                <Text style= {{color:'white'}}>{characterDetail.charactersData.status}</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text style={{color:'lightblue'}}>Tür : </Text>
                                <Text style= {{color:'white'}}>{characterDetail.charactersData.species}</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text style={{color:'lightblue'}}>Cinsiyet : </Text>
                                <Text style= {{color:'white'}}>{characterDetail.charactersData.gender}</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text style={{color:'lightblue'}}>Gezegen : </Text>
                                <Text style= {{color:'white'}}>{characterDetail.charactersData.origin.name}</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text style={{color:'lightblue'}}>Lokasyon : </Text>
                                <Text style= {{color:'white'}}>{characterDetail.charactersData.location.name}</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text style={{color:'lightblue'}}>Bölümler : </Text>
                                <Text style= {{color:'blue'}}>{episodeNumbers + ','}</Text>
                            </Text>
                             
                    </View>
                </ImageBackground>
            </ScrollView>
    );
}


const styles = StyleSheet.create (
    {
        container:{
            alignItems: 'center', justifyContent: 'center',marginTop:50, flex: 1, 
    },
        characterImage:{
            width:width*0.7,height:height*0.3,marginTop:20,marginBottom:50,
        },
        info:{
            fontSize: 18,fontWeight:'bold',borderBottomEndRadius:20,borderWidth:1,borderColor:'lightblue',padding:15,marginTop:15 ,width:width*0.9
          }
    }
)