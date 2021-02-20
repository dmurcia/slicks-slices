import React from 'react';
import { graphql } from 'gatsby';
import PizzasList from '../components/PizzasList';
import ToppingFilter from '../components/ToppingFilter';
import SEO from '../components/SEO';


export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <SEO 
        title={ 
          pageContext.topping
            ? `Pizzas With ${pageContext.topping}`
            : `All Pizzas`
        }
      />
      <ToppingFilter activeTopping={ pageContext.topping } />
      <PizzasList pizzas={pizzas} />
    </>
  )
}

export const query = graphql`
  query($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex }}}}
      ) {
      nodes {
        id
        name
        price
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
