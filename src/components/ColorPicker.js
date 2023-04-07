import { useState } from 'react';
import { SketchPicker } from 'react-color';

export default function ColorPicker(){

    const[textColor, setColor] = useState('black');

    function cambiarColor(color){
        setColor(color.hex);
        console.log(color);

    }
    return(
        <div>
            <SketchPicker color = {textColor} onChangeComplete={(color)=>cambiarColor(color)}/>
            <p style={{color:textColor, fontSize:'30px'}}>Texto cambioColor</p>
        </div>
    )
}