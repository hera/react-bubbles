import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import authAxios from '../utils/authAxios';

const BubblePage = () => {
    const [colorList, setColorList] = useState([]);

    useEffect(() => {
        authAxios().get('/api/colors')
            .then(response => {
                setColorList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <ColorList colors={colorList} updateColors={setColorList} />
            <Bubbles colors={colorList} />
        </>
    );
};

export default BubblePage;
