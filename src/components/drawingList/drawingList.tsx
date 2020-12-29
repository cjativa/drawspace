import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/userService';

const DrawingList = () => {

    const [drawings, setDrawings] = useState<any[]>([]);

    /** On mount, retrieve all available drawings for the user */
    useEffect(() => {
        fetchDrawings();
    }, []);

    /** Fetches drawings for the user */
    const fetchDrawings = async () => {
        const fetchedDrawings = await UserService.getAllDrawings();
        setDrawings(fetchedDrawings);
    };

    /** Handles deleting the selected drawing */
    const onDeleteClick = async (event: any) => {

        // Delete this image by id
        const { id } = event.target;
        await UserService.deleteDrawing(id);

        // Reload the drawings
        await fetchDrawings();

    };

    return (
        <div className="drawing-list">
            <div className="drawing-list__cont">
                <div className="item-header top">
                    <span>Date Created</span>
                    <span>Time Elapsed</span>
                    <span>Visibility</span>
                    <span>Delete</span>
                </div>
                {drawings.length > 0 && drawings.map((drawing, index) => {

                    const visibilityVal = (drawing.public)
                        ? <Link to={`/draw/${drawing.public_url}`}>Public</Link>
                        : <span>Private</span>;

                    const timeVal = new Date(drawing.creation_time).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });

                    return (
                        <div className="drawing-list__item" key={`${drawing.id}__${index}`}>
                            <div className="item-header">
                                <span>{timeVal}</span>
                                <span>{drawing.elapsed_time} seconds</span>
                                <span>{visibilityVal}</span>
                                <button id={drawing.id} onClick={onDeleteClick}>Delete</button>
                            </div>
                            <div className="item-body">
                                <img height="50px" width="50px" src={drawing.data} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default DrawingList;