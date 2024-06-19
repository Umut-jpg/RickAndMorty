import React ,{ useState, useEffect }  from 'react'
import {StyleSheet,  Text, View,Image, TouchableOpacity,Button , ImageBackground,FlatList, SectionList} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../controller/favoritesSlice';
import image from '../assets/back8.jpg'
import { Pagination } from '../components/Pagination';
import { height, width } from '../helper/Helper';

export const Epdetail = ({ route, navigation }) => {

  const episode = route.params;
  const [characterImages, setCharacterImages] = useState([]);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.characters);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const[currentPageData, setCurrentPageData]= useState();
  const [page,setPage] = useState(1);
  const [data, setData] = useState([]);
 

  
  useEffect(() => {
    const fetchCharacterImages = async () => {
        try {
            const promises = episode.episode.characters.map(async characterUrl => {
                const response = await fetch(characterUrl);
                const data = await response.json();    
                return data; 
            });

            const charactersData = await Promise.all(promises);
            setTotalPages(Math.ceil(charactersData.length / 5));
            setData(charactersData)
            setCharacterImages(charactersData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };
    fetchCharacterImages();
}, [episode]);


useEffect(() => {
  const currentData = data.slice((page - 1) * 5, page * 5);
  setCurrentPageData(currentData);
}, [page, data]);

const handlePageChange = (pageNum) => {
  setPage(pageNum);
};  

const handleCharacterPress = (charactersData) => {
  navigation.navigate('KARAKTER DETAY', { charactersData });
};

const handleAddFavorite = (character) => {
  dispatch(addFavorite(character));
};
const renderHeader = () => (
  <View style={{ flex: 1 }}>
    
   
  
    <View style={styles.container}>
    
      <Text style={styles.headertext}>Bölüm Detayları</Text>
      <Text style={styles.info}> 
        <Text style={{ color: 'lightblue' }}>Bölüm Adı : </Text>
        <Text style={{color:'white'}}>{episode.episode.name}</Text>
      </Text>
      <Text style={styles.info}>
        <Text style={{ color: 'lightblue' }}>Bölüm : </Text>
        <Text style={{color:'white'}}>{episode.episode.episode}</Text>
      </Text>
      <Text style={styles.info}>
        <Text style={{ color: 'lightblue' }}>Tarih : </Text>
        <Text style={{color:'white'}}>{episode.episode.air_date}</Text>
      </Text>
    </View>
    
    <Text style={{color:'white', fontWeight:'bold',marginBottom:5,fontSize:20,textAlign:'center',marginTop:15}}>BÖLÜM KARAKTERLERİ</Text>
    <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
   
    </View>
);
/*
  return (
     
    <View style={{ flex: 1 }}>
    
    <ImageBackground source={image} resizeMode='cover' style={{ flex: 1, }}>
    
      <View style={styles.container}>
      
        <Text style={styles.headertext}>Bölüm Detayları</Text>
        <Text style={styles.info}> 
          <Text style={{ color: 'lightblue' }}>Bölüm Adı : </Text>
          <Text style={{color:'white'}}>{episode.episode.name}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={{ color: 'lightblue' }}>Bölüm : </Text>
          <Text style={{color:'white'}}>{episode.episode.episode}</Text>
        </Text>
        <Text style={styles.info}>
          <Text style={{ color: 'lightblue' }}>Tarih : </Text>
          <Text style={{color:'white'}}>{episode.episode.air_date}</Text>
        </Text>
      </View>
      
      <Text style={{color:'white', fontWeight:'bold',marginBottom:5,fontSize:20,textAlign:'center',marginTop:15}}>BÖLÜM KARAKTERLERİ</Text>
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
      <View style={{ flex: 1 , alignItems:'center' ,width:400}}>
       
        <FlatList
          
          data={currentPageData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCharacterPress(item)}>
              <View style={styles.characterContainerIn}>
                <Image
                  style={styles.characterImage}
                  source={{ uri: item.image }}
                />
                <Button
                  title={favorites.some(fav => fav.id === item.id) ? "Favorilerde" : "Favorilere Ekle"}
            
                  onPress={() =>
                    favorites.some(fav => fav.id === item.id)
                      ? alert("Bu Karakter Favorilerde Ekli Çıkartmak İçin Favori Sayfasını kullanabilirsiniz")
                      : handleAddFavorite(item)
                  }
                /> 
              </View>
            </TouchableOpacity>
          )}
          // contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
       
    </ImageBackground>
  </View> 
 
  ) */

  const renderButton = (item) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);

    return (
      <TouchableOpacity
        onPress={() => isFavorite ? alert("Bu Karakter Favorilerde Ekli. Çıkartmak İçin Favori Sayfasını kullanabilirsiniz") : handleAddFavorite(item)}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>{isFavorite ? "Favorilerde" : "Favorilere Ekle"}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground source={image} resizeMode='cover' style={{ flex: 1, }}> 
    <View style={{ flex: 1 ,width:width*1}}>
       
        <FlatList
          ListHeaderComponent={renderHeader}
          data={currentPageData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCharacterPress(item)}>
              <View style={styles.characterContainerIn}>
                <Image
                  style={styles.characterImage}
                  source={{ uri: item.image }}
                />
               {renderButton(item)}
              </View>
            </TouchableOpacity>
          )}
          // contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
      </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
       alignItems: 'center', justifyContent: 'center' ,marginTop:15
  },info:{
    fontSize: 18, fontWeight:'bold', marginTop: 2, marginBottom:2,width:width * 0.9, borderBottomEndRadius:20,borderWidth:1,borderColor:'lightblue',padding:15,marginTop:15
  },
  characterImage: {
    height:height *0.2, marginBottom: 10, width:width*0.8,marginLeft:width*0.15
},characterContainerIn:{
  marginRight:50,justifyContent:'center',alignItems:'center' ,marginBottom:7
},headertext:{
  fontSize: 35, fontWeight:'bold', color:'lightblue',fontStyle:'italic' ,borderWidth:1 , 
  borderRadius:200,padding:20,borderColor:'lightblue' ,margin:10, marginBottom:height * 0.3
},
buttonContainer: {
  backgroundColor: 'lightblue',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  marginLeft: width*0.15
},
buttonText: {
  color: 'white',
  fontSize: 16,
  textAlign: 'center',
},
})
