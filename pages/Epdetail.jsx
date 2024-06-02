import React ,{ useState, useEffect }  from 'react'
import {StyleSheet,  Text, View,Image, TouchableOpacity,Button , ImageBackground,FlatList} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../controller/favoritesSlice';
import image from '../assets/back.jpg'
import { Pagination } from '../components/Pagination';

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

  
  return (
    
    <View style={{ flex: 1 }}>
    <ImageBackground source={image} resizeMode="cover" style={{ flex: 1 }}>
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
           contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </ImageBackground>
  </View>     
  )
}


const styles = StyleSheet.create({
  container: {
       alignItems: 'center', justifyContent: 'center' ,
  },info:{
    fontSize: 18, fontWeight:'bold', marginTop: 2, marginBottom:2, borderBottomEndRadius:20
  },
  characterImage: {
    width: 250, height: 150, marginBottom: 10,marginRight:1
},characterContainerIn:{
  margin:10
},headertext:{
  fontSize: 35, fontWeight:'bold', color:'lightblue',fontStyle:'italic' ,borderWidth:1 , 
  borderRadius:200,padding:20,borderColor:'lightblue' ,margin:10
}
})
