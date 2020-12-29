import React, { useEffect, useState, useRef } from 'react';

import DrawCanvas from './drawCanvas';
import DrawStrokeActions, { FILL_COLORS, STROKE_WIDTHS } from './drawStrokeActions';
import DrawGeneralActions from './drawGeneralActions';
import UserService from '../../services/userService';

const Draw = () => {

    const [saveOccurred, setSaveOccurred] = useState<boolean>(false);
    const [resetOccurred, setResetOccurred] = useState<boolean>(false);
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);

    // Stroke color, width, and usage of erased are toggled via 
    // DrawStrokeActions component and passed from here to DrawCanvas
    const [fillColor, setFillColor] = useState<FILL_COLORS>('red');
    const [strokeWidth, setStrokeWidth] = useState<STROKE_WIDTHS>(10);
    const [eraserOn, setEraserOn] = useState<boolean>(false);

    const elapsedDrawingTime = useRef<number>(0);
    const drawingData = useRef<string>('');

    /** On component mount, start the timer */
    useEffect(() => {

        setInterval(() => {
            elapsedDrawingTime.current += 1;
        }, 1000);
    }, []);

    /** When reset occurs, set it back to initial state afterward */
    useEffect(() => {
        if (resetOccurred) {
            setResetOccurred(false);

            // Reset some of the state
            elapsedDrawingTime.current = 0;
            drawingData.current = '';
            setFillColor('red');
            setStrokeWidth(10);
        }

    }, [resetOccurred]);

    /** Perform actions when the save occurs */
    useEffect(() => {

        const handleSave = async () => {
            // Save the drawing and update the state
            const drawingSave = await UserService.performDrawingSave(drawingData.current, elapsedDrawingTime.current, isPublic);
            setSaveSuccess(drawingSave.success);

            // After 2 seconds, reset the save success
            setTimeout(() => {
                setSaveSuccess(null);
                setSaveOccurred(false);
            }, 2000);
        };

        if (saveOccurred) {
            handleSave();
        }

    }, [saveOccurred, drawingData, elapsedDrawingTime]);

    /** Performs drawing saving workflow */
    const onSaveClick = async () => {
        setSaveOccurred(true);
    };

    /** Performs drawing reset workflow */
    const onResetClick = () => {
        setResetOccurred(true);
    };

    /** Toggles the usage of the eraser */
    const toggleEraser = () => {
        setEraserOn(!eraserOn);
    };

    /** Updates the fill color */
    const updateFillColor = (color: FILL_COLORS) => {

        // Set the color and toggle off eraser
        setFillColor(color);

        if (eraserOn) {
            setEraserOn(false);
        }
    };

    return (
        <div className="draw">
            <p className="draw__subtitle">
                Draw to your hearts content ✏️
                {saveSuccess &&
                    <span>
                        Save was successful
                    </span>
                }
            </p>

            {/** Canvas for drawing */}
            <DrawCanvas
                saveOccurred={saveOccurred}
                resetOccurred={resetOccurred}
                fillColor={fillColor}
                strokeWidth={strokeWidth}
                eraserOn={eraserOn}
                drawingData={drawingData}
            />

            {/** Action buttons */}
            <div className="draw__actions">
                <DrawStrokeActions
                    setFillColor={updateFillColor}
                    setStrokeWidth={setStrokeWidth}
                    toggleEraser={toggleEraser}
                />

                <DrawGeneralActions
                    onResetClick={onResetClick}
                    onSaveClick={onSaveClick}
                    setIsPublic={setIsPublic}
                    isPublic={isPublic}
                />
            </div>
        </div>
    )
};

export default Draw;