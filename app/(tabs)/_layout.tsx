import React from 'react'
import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name='index'
        options={{
          title: "Home",
          headerShown: false}}
      />
      <Tabs.Screen 
        name='profile'
        options={{
          title: "Profile",
          headerShown: false}}
      />
    </Tabs>
  )
}

export default TabsLayout;