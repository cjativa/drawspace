import React, { useEffect, useState } from 'react';
import Draw from './draw';
import UserService from '../../services/userService';
import { useParams, useHistory } from 'react-router-dom';

const DrawContainer = () => {

    // Attempt to grab the drawing id from the path
    const { id } = useParams<any>();

    const [fetchedDrawing, setFetchedDrawing] = useState<any>({});

    /** On component mount, let's check if we there's an id in the URL */
    useEffect(() => {

        const fetchDrawing = async () => {
            const drawing = await UserService.geDrawing(id);
            setFetchedDrawing(drawing);
        };

        if (id) {
            fetchDrawing();
        }

    }, []);

    return (
        <Draw 
            wasFetched={(id) ? true : false}
            drawingData={fetchedDrawing['data']}
            isPublic={fetchedDrawing['public']}
        />
    )
};

export default DrawContainer;