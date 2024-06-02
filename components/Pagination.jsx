import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <View style={styles.pagContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentStyle={styles.pagination}>
        {[...Array(totalPages).keys()].map((index) => (
          <TouchableOpacity key={index}
            onPress={() => onPageChange(index + 1)}
            style={[styles.pageButton,currentPage === index + 1 && styles.activePage]}>
            <Text style={styles.pageButtonText}>{`Sayfa ${index + 1}`}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pagContainer: {
    alignItems: 'center',marginTop: 10,marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',justifyContent: 'center',
  },
  pageButton: {
    marginHorizontal: 5,padding: 10,backgroundColor: 'lightblue',borderRadius: 5,
  },
  activePage: {
    backgroundColor: 'blue',
  },
  pageButtonText: {
    fontSize: 16,color: 'white',
  },
});

export default Pagination;
