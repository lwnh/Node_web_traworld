import React from 'react';
import styled from "styled-components";

/*global kakao*/ 

const Maps = styled.div`
    width: 500px;
    height: 600px;
`;

const config = require('../config/key');
const mapKey = config.kakaoMapKey;

class Map extends React.Component{
    componentDidMount() {
        const script = document.createElement("script");
        script.async = true;
        script.src =
          `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${mapKey}&autoload=false`;
        document.head.appendChild(script);

      script.onload = () => {
        kakao.maps.load(() => {
          let container = document.getElementById("map");
          let options = {
                center: new kakao.maps.LatLng(37.506502, 127.053617),
                level: 7
          };
  
          const map = new kakao.maps.Map(container, options);
       
        });
      };
    }
    render(){
        return(
            <Maps id="map" />
        )
    }
}

export default Map;