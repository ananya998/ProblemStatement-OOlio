import React from 'react';
import pizzas from '../data/pizzas.json';
import Pizza from './Pizza';
import AppCSS from './App.module.css';
import Cart from './Cart';
import PizzaSVG from '../svg/pizza.svg';
import AppStateProvider from './AppState';
import InputForm from './InputForm';
import SpecialOffer from './SpecialOffer';


const App = () => {
   const SpecialOfferPizza = pizzas.find(pizza => pizza.specialOffer);
  return (
    <AppStateProvider>
    <div className={AppCSS.container}>
    <div className={AppCSS.header}>
        
          <div className={AppCSS.siteTitle}>Delicious Pizza</div>
          <Cart />
        </div>
       
    
         <h2 className={AppCSS.container}>Customer Name:</h2>
         <InputForm  />

     


    {SpecialOfferPizza && <SpecialOffer pizza={SpecialOfferPizza}/>}
      <ul className={AppCSS.pizzaList}>
        {pizzas.map((pizza) => {
          return <Pizza key={pizza.id} pizza={pizza} />;
        })}
      </ul>
    </div>
    </AppStateProvider>
    
  );
};

export default App;