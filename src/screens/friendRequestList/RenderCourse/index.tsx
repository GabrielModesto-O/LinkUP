import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../styles"
import { RenderUsersOnCourses } from "../RenderUsersOnCourses"
import { Session } from "@supabase/supabase-js"

export const RenderCourse = ({item, session}:{item:any, session:Session}) => {
  return(
    <>
    {item.item.students.length > 0 &&
    <View key={item.item.course.id}>
      <View style={styles.interestsInfoContainer}>
        <Text style={styles.interestTitle}>{item.item.course.courseName}</Text>
        <View style={styles.seeAllContainer}>
          <Text style={styles.peopleYouMayKnowText}>Pessoas que você talvez conheça</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButtonText}></Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={item.item.students}
        keyExtractor={(student) => student.uid}
        renderItem={item => <RenderUsersOnCourses item={item.item} session={session} />}
      />
    </View>
    }
    </>
  )
}