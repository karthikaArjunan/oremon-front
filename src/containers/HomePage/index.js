import React from 'react'
import { Layout } from '../../components/Layout'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './style.css'
/**
* @author
* @function HomePage
**/

export const HomePage = (props) => {
  return(
    <Layout>
      <div>
      <div class="cartt" ><i>Oremon</i></div>
            <div class="carttt">Organic farming is a type of agriculture or 
              farming which avoids the use of synthetic fertilizers, pesticides, growth regulators, 
              and livestock feed additives. Organic farming systems rely on crop rotation, crop residues, 
              animal manures, legumes, green manure, off-farm organic wastes and bio-fertilizers, mechanical 
              cultivation, mineral bearing rocks. All kinds of agricultural products can be produced 
              organically, including grains, meat, dairy, eggs, fibres such as cotton, jute, flowers etc. 
              Thus organic farming creates a sustainable lifestyle for generations to come.</div>
      </div>   
    </Layout>
   )
 }