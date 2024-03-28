import {NavigationContainer} from '@react-navigation/native';
import TabRoutes from './stack';
import StackComponent from './stack';
import React from 'react';

export default function Routes(){
    return (
        <NavigationContainer>
            <TabRoutes/> 
        </NavigationContainer>
    )
}