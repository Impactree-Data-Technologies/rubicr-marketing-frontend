import React from "react";

interface ButtonProps {
     background: string;
    color :string;
    margintop : string;
    marginleft : string ;
}

const Button: React.FC<ButtonProps> = ({ background ,color ,margintop ,marginleft }) => {
    return (
        <button style={{ background: background , color:color  , marginTop : margintop ,marginLeft :marginleft ,borderRadius : "20px", padding : "9px"}}>Schedule a Demo</button>
    );
}

export default Button;