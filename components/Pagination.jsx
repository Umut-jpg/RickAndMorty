import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export const Pagination = ({totalPages, currentPage, onPageChange}) => {
  return (
    <View style={styles.pagination}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[...Array(totalPages).keys()].map((index) => (
                <TouchableOpacity key={index} onPress={() => onPageChange(index + 1)} style={styles.pageButton}>
                    <Text style={styles.pageButtonText}>{`Sayfa ${index + 1}`}</Text>
                </TouchableOpacity>
             ))}
        </ScrollView>
    </View>   
  )
}

const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',marginTop: 10, marginBottom: 20,
         },
    pageButton: {
        marginHorizontal: 5,padding: 10,opacity:0.8,backgroundColor: 'lightblue',borderRadius: 5,
     },
    pageButtonText: {
        fontSize: 16,color: 'white',
    },
});
