import React, { useEffect, useState } from 'react';
import UserService from '../../services/userService';

const DrawingList = () => {

    const [drawings, setDrawings] = useState<any[]>([]);

    /** On mount, retrieve all available drawings for the user */
    useEffect(() => {

        const fetchDrawings = async () => {
            const fetchedDrawings = await UserService.getAllDrawings();
            setDrawings(fetchedDrawings);
        };

        fetchDrawings();

    }, []);

    return (
        <div className="drawing-list">
            {drawings.length > 0 && drawings.map((drawing) => {
                return (
                    <div className="drawing-list__item">
                        {drawing.elapsed_time}
                        {drawing.creation_time}
                        {drawing.public}
                    </div>
                )
            })}
        </div>
    )
};

export default DrawingList;