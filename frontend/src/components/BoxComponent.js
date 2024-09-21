/**
 * This component is a template for displaying all items in different categories.
 * It handles which category to display.
 * @module BoxComponent
 */

import React, {useState} from 'react'
import Drinks from './Drinks';
import Starters from './Starters';
import Mains from './Mains';
import Desserts from './Desserts';


/** This function renders the box component. 
 * 
 * Box component acts as a template to display the four different categories.
 * The default state is "StartersPressed" which displays the starters upon startup. 
 * Whenever one of the other buttons corresponding to mains/drinks/dessers are pressed, 
 * the state is changed through onClick and the relevant data for the category is displayed instead.
 * 
 * @returns {JSX.Element} - The box component.
 */
const BoxComponent = () => {

    const[active, SetActive] = useState("StartersPressed");

    return(
        <div>
            <button class = "menu_button" onClick = {() => SetActive("StartersPressed")}>Starters</button>
            <button class = "menu_button" onClick = {() => SetActive("MainsPressed")}>Mains</button>
            <button class = "menu_button" onClick = {() => SetActive("DrinksPressed")}>Drinks</button>
            <button class = "menu_button" onClick = {() => SetActive("DessertsPressed")}>Desserts</button>

            {active === "DrinksPressed" && <header className="Container"><Drinks/></header>}
            {active === "StartersPressed" && <header className = "Container"><Starters/></header>}
            {active === "MainsPressed" && <header classname = "Container"><Mains /></header>}
            {active === "DessertsPressed" && <header classname = "Container"><Desserts /></header>}
        </div>


    );
}


export default BoxComponent