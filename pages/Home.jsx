import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity,  ImageBackground, SafeAreaView,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pagination } from '../components/Pagination';
import image from '../assets/back.jpg'
import { height ,width } from '../helper/Helper';
const Home = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPageData , setCurrentPageData] = useState([]);
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [searchdata, setsearchData] = useState(data);


    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        const currentData = searchdata.slice((page - 1) * 5, page * 5);
        setCurrentPageData(currentData);
    }, [page, searchdata]);

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://rickandmortyapi.com/api/episode');
            const json = await response.json();
            setData(json.results);
            setsearchData(json.results);
            setTotalPages(Math.ceil(json.results.length / 5));
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handlePageChange = (pageNum) => {
        setPage(pageNum);
    };

    const handleEpisodePress = (item) => {
        navigation.navigate( 'BÖLÜM DETAY', { episode: item });    
    };

    const searchFilter = (text) => {
        if (text) {
            const newData = data.filter(item => {
                const itemData = `${item.name.toUpperCase()} ${item.episode.toUpperCase()} ${item.air_date.toUpperCase()}`;
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setsearchData(newData);
            setTotalPages(Math.ceil(newData.length / 5));
            setPage(1); 
        } else {
            setsearchData(data);
            setTotalPages(Math.ceil(data.length / 5));
            setPage(1);  
        }
        setSearch(text);
    };


    return (
    <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={{justifyContent:'center' , flex:1}}>
           <Text style={styles.headertext}>RICK AND MORTY</Text>
           <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
           <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(text) => searchFilter(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Arama..."
            />
          <FlatList
              data={currentPageData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleEpisodePress(item)}>
                    <View style ={styles.liststyle}>
                        <Text style={{color:'red'}} >{item.episode}</Text>
                        <Text  style = {{fontSize:20}}>{item.name}</Text>
                        <Text style= {{fontSize:15 , fontWeight:'bold'}}>{item.air_date}</Text>           
                    </View>       
                  </TouchableOpacity>
              )}
            />
        </ImageBackground>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,paddingTop: 22,
      },
    liststyle:{
        alignItems:'center',padding: 5,borderRadius: 10,borderColor: 'lightblue',backgroundColor:'lightblue',
        opacity:0.8,marginTop: 20,borderWidth: 1,width: width*1,fontSize: 18,height:height*0.15,
    },
    headertext: {
        textAlign: 'center',color:'lightblue',fontWeight:'bold',fontStyle:'italic',borderWidth:1,borderRadius:200,
        padding:20,borderColor:'lightblue',marginTop: 50,fontSize: 35,
    },
    footer: {
        padding: 10,justifyContent: 'center',alignItems: 'center',
    },
    textInputStyle: {
        height: height*0.05,borderWidth: 1,paddingLeft: 20,margin: 5,borderRadius:150,borderColor: 'lightblue',backgroundColor: 'lightblue',
    },
});

export default Home;


