import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';


const About = () => {
  const value = useContext(noteContext);

  return (
    <div>

     NAME IS {value.name} And He is Class In {value.class}      

    </div>
  )

}



export default About;